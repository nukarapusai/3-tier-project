import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workoutCategories } from '../data/workoutPlans';
import api from '../services/api';
import '../styles/dashboard.css';

function DashboardPage() {
  const navigate = useNavigate();
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

  const handleWorkoutSelect = (slug) => {
    navigate(`/workout/${slug}`);
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
        <h1>FitTechCoach Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      {/* Workout Categories Section */}
      <section className="workout-section">
        <h2>Choose Your Workout</h2>
        <div className="workout-grid">
          {workoutCategories.map((category) => (
            <div 
              key={category.id} 
              className="workout-card" 
              onClick={() => handleWorkoutSelect(category.slug)}
              style={{ 
                borderColor: category.color,
                backgroundImage: `linear-gradient(135deg, rgba(3, 6, 18, 0.18), rgba(3, 6, 18, 0.42)), url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="workout-overlay"></div>
              <div className="workout-content">
                <div className="workout-emoji">{category.emoji}</div>
                <h3>{category.name}</h3>
                <button 
                  type="button"
                  className="start-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorkoutSelect(category.slug);
                  }}
                  style={{ backgroundColor: category.color }}
                >
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
