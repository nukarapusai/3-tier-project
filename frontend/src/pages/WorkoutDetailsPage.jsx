import { useNavigate, useParams } from 'react-router-dom';
import { workoutPlans, workoutCategories } from '../data/workoutPlans';
import '../styles/workout-details.css';

function WorkoutDetailsPage() {
  const { workoutType } = useParams();
  const navigate = useNavigate();

  const selectedWorkout = workoutPlans[workoutType] || workoutPlans['chest-workout'];
  const categoryMeta = workoutCategories.find((item) => item.slug === workoutType) || workoutCategories[0];

  return (
    <div className="workout-details-page">
      <header className="workout-details-topbar">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <h1>{selectedWorkout.category}</h1>
      </header>

      <div className="workout-details-hero" style={{ borderColor: categoryMeta.color }}>
        <div
          className="workout-details-hero-image"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(2,6,23,0.3), rgba(2,6,23,0.55)), url(${categoryMeta.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="hero-emoji">{categoryMeta.emoji}</span>
            <h2>{selectedWorkout.category}</h2>
          </div>
        </div>
      </div>

      <section className="exercise-list-section">
        <div className="exercise-list-header">
          <h3>Workout Plan</h3>
          <button className="primary-session-btn">Start Session</button>
        </div>

        <div className="exercise-list">
          {selectedWorkout.exercises.map((exercise, index) => (
            <div key={`${exercise.name}-${index}`} className="exercise-card" style={{ borderColor: categoryMeta.color }}>
              <div className="exercise-image" style={{ backgroundImage: `url(${exercise.image})` }}></div>
              <div className="exercise-info">
                <div className="exercise-header-row">
                  <span className="exercise-number">0{index + 1}</span>
                  <h4>{exercise.name}</h4>
                </div>
                <div className="exercise-metrics">
                  <span>{exercise.sets}</span>
                  <span>{exercise.reps}</span>
                </div>
                <button className="exercise-start-btn" style={{ backgroundColor: categoryMeta.color }}>
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default WorkoutDetailsPage;
