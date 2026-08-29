import { useEffect, useState } from 'react';
import api from '../services/api';

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/tasks/', { title, description, status });
      setTitle('');
      setDescription('');
      setStatus('pending');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not create task');
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: 'completed' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <h1>TaskHub</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-grid">
        <div className="task-form-card">
          <h3>Create Task</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Task'}</button>
          </form>
        </div>

        <div className="task-list-card">
          <h3>Your Tasks</h3>
          {tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className="task-item">
                  <div>
                    <h4>{task.title}</h4>
                    <p>{task.description || 'No description'}</p>
                    <span className="task-status">{task.status}</span>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => markComplete(task.id)}>Complete</button>
                    <button className="danger" onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
