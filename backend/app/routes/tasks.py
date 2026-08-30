from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.auth import get_current_user
from app.database import get_connection

router = APIRouter()


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: str = "pending"


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: str | None = None


@router.post("/")
def create_task(payload: TaskCreate, user_id: int = Depends(get_current_user)):
    if not payload.title:
        raise HTTPException(status_code=400, detail="Title is required")

    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO tasks (user_id, title, description, status) VALUES (%s, %s, %s, %s) RETURNING *",
                    (user_id, payload.title, payload.description, payload.status),
                )
                task = cur.fetchone()
                conn.commit()
                return dict(task)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Task creation failed: {exc!s}")


@router.get("/")
def get_tasks(user_id: int = Depends(get_current_user)):
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM tasks WHERE user_id = %s ORDER BY created_at DESC", (user_id,))
                tasks = cur.fetchall()
                return [dict(task) for task in tasks]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Task fetch failed: {exc!s}")


@router.put("/{task_id}")
def update_task(task_id: int, payload: TaskUpdate, user_id: int = Depends(get_current_user)):
    try:
        with get_connection() as conn, conn.cursor() as cur:
            cur.execute(
                """
                    UPDATE tasks
                    SET title = COALESCE(%s, title),
                        description = COALESCE(%s, description),
                        status = COALESCE(%s, status),
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s AND user_id = %s
                    RETURNING *
                    """,
                (payload.title, payload.description, payload.status, task_id, user_id),
            )
            task = cur.fetchone()
            conn.commit()
            if not task:
                raise HTTPException(status_code=404, detail="Task not found")
            return dict(task)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Task update failed: {exc!s}")


@router.delete("/{task_id}")
def delete_task(task_id: int, user_id: int = Depends(get_current_user)):
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM tasks WHERE id = %s AND user_id = %s RETURNING *", (task_id, user_id))
                task = cur.fetchone()
                conn.commit()
                if not task:
                    raise HTTPException(status_code=404, detail="Task not found")
                return {"message": "Task deleted successfully"}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Task delete failed: {exc!s}")
