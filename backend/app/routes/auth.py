from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.auth import create_access_token, hash_password, verify_password
from app.database import get_connection

router = APIRouter()


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    new_password: str


@router.post("/signup")
def signup(payload: SignupRequest):
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT id FROM users WHERE email = %s", (str(payload.email),))
                if cur.fetchone():
                    raise HTTPException(status_code=409, detail="User already exists")

                password_hash = hash_password(payload.password)
                cur.execute(
                    "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s) RETURNING id, name, email",
                    (payload.name, str(payload.email), password_hash),
                )
                user = cur.fetchone()
                conn.commit()
                return {"message": "User created successfully", "user": dict(user)}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Signup failed: {exc!s}")


@router.post("/login")
def login(payload: LoginRequest):
    try:
        with get_connection() as conn, conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE email = %s", (str(payload.email),))
            user = cur.fetchone()
            if not user or not verify_password(payload.password, user["password_hash"]):
                raise HTTPException(status_code=401, detail="Invalid credentials")

            token = create_access_token({"sub": str(user["id"])})
            return {"token": token}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Login failed: {exc!s}")


@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest):
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT id FROM users WHERE email = %s", (str(payload.email),))
                user = cur.fetchone()
                if not user:
                    raise HTTPException(status_code=404, detail="User with this email does not exist")

                password_hash = hash_password(payload.new_password)
                cur.execute("UPDATE users SET password_hash = %s WHERE email = %s", (password_hash, str(payload.email)))
                conn.commit()
                return {"message": "Password updated successfully"}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Password reset failed: {exc!s}")
