export const workoutCategories = [
  {
    id: 1,
    slug: 'chest-workout',
    name: 'Chest Workout',
    emoji: '💪',
    color: '#FF6B6B',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    slug: 'back-workout',
    name: 'Back Workout',
    emoji: '🦾',
    color: '#4ECDC4',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    slug: 'shoulder-workout',
    name: 'Shoulder Workout',
    emoji: '💓',
    color: '#45B7D1',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    slug: 'legs-workout',
    name: 'Legs Workout',
    emoji: '🦵',
    color: '#FFA07A',
    image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    slug: 'arms-workout',
    name: 'Arms Workout',
    emoji: '💪',
    color: '#DDA0DD',
    image: 'https://images.unsplash.com/photo-1596357905330-d21ecad1e8f2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    slug: 'mobility',
    name: 'Mobility',
    emoji: '🧘',
    color: '#90EE90',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    slug: 'cardio',
    name: 'Cardio',
    emoji: '🏃',
    color: '#FFD700',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80'
  }
];

export const workoutPlans = {
  'chest-workout': {
    category: 'Chest Workout',
    exercises: [
      { name: 'Barbell Bench Press', sets: '4 sets', reps: '8–12 reps', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
      { name: 'Incline Dumbbell Press', sets: '3 sets', reps: '10–12 reps', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=800&q=80' },
      { name: 'Dumbbell Fly', sets: '3 sets', reps: '12 reps', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Push-Ups', sets: '3 sets', reps: '15 reps', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' },
      { name: 'Cable Chest Fly', sets: '3 sets', reps: '12 reps', image: 'https://images.unsplash.com/photo-1596357905330-d21ecad1e8f2?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  'back-workout': {
    category: 'Back Workout',
    exercises: [
      { name: 'Deadlift', sets: '4 sets', reps: '6–8 reps', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80' },
      { name: 'Lat Pulldown', sets: '3 sets', reps: '10–12 reps', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80' },
      { name: 'Seated Cable Row', sets: '3 sets', reps: '10–12 reps', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' },
      { name: 'Barbell Row', sets: '3 sets', reps: '8–10 reps', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
      { name: 'One-Arm Dumbbell Row', sets: '3 sets', reps: '10 reps', image: 'https://images.unsplash.com/photo-1596357905330-d21ecad1e8f2?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  'shoulder-workout': {
    category: 'Shoulder Workout',
    exercises: [
      { name: 'Dumbbell Shoulder Press', sets: '4 sets', reps: '8–12 reps', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Lateral Raises', sets: '3 sets', reps: '12–15 reps', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=800&q=80' },
      { name: 'Front Raises', sets: '3 sets', reps: '12 reps', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
      { name: 'Rear Delt Fly', sets: '3 sets', reps: '12 reps', image: 'https://images.unsplash.com/photo-1596357905330-d21ecad1e8f2?auto=format&fit=crop&w=800&q=80' },
      { name: 'Arnold Press', sets: '3 sets', reps: '10 reps', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  'legs-workout': {
    category: 'Legs Workout',
    exercises: [
      { name: 'Barbell Squat', sets: '4 sets', reps: '8–12 reps', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=800&q=80' },
      { name: 'Leg Press', sets: '3 sets', reps: '10–12 reps', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
      { name: 'Romanian Deadlift', sets: '3 sets', reps: '10 reps', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80' },
      { name: 'Walking Lunges', sets: '3 sets', reps: '12 reps per leg', image: 'https://images.unsplash.com/photo-1596357905330-d21ecad1e8f2?auto=format&fit=crop&w=800&q=80' },
      { name: 'Leg Extensions', sets: '3 sets', reps: '12 reps', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80' },
      { name: 'Hamstring Curls', sets: '3 sets', reps: '12 reps', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Standing Calf Raises', sets: '4 sets', reps: '15 reps', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  'arms-workout': {
    category: 'Arms Workout',
    exercises: [
      { name: 'Dumbbell Bicep Curls', sets: '3 sets', reps: '10–12 reps', image: 'https://images.unsplash.com/photo-1596357905330-d21ecad1e8f2?auto=format&fit=crop&w=800&q=80' },
      { name: 'Hammer Curls', sets: '3 sets', reps: '10–12 reps', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' },
      { name: 'Barbell Curls', sets: '3 sets', reps: '10 reps', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
      { name: 'Tricep Pushdowns', sets: '3 sets', reps: '12 reps', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Skull Crushers', sets: '3 sets', reps: '10 reps', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=800&q=80' },
      { name: 'Overhead Tricep Extension', sets: '3 sets', reps: '12 reps', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  cardio: {
    category: 'Cardio',
    exercises: [
      { name: 'Treadmill Running', sets: '1 session', reps: '15–30 minutes', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80' },
      { name: 'Cycling', sets: '1 session', reps: '15–30 minutes', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?auto=format&fit=crop&w=800&q=80' },
      { name: 'Rowing Machine', sets: '1 session', reps: '10–20 minutes', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Jump Rope', sets: '1 session', reps: '10 minutes', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
      { name: 'HIIT', sets: '1 session', reps: '15–20 minutes', image: 'https://images.unsplash.com/photo-1596357905330-d21ecad1e8f2?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  mobility: {
    category: 'Mobility',
    exercises: [
      { name: 'Cat-Cow Stretch', sets: '2–3 minutes', reps: 'Slow breathing', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
      { name: 'Hip Flexor Stretch', sets: '30 seconds', reps: 'Each side', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' },
      { name: "World's Greatest Stretch", sets: '5 reps', reps: 'Each side', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
      { name: 'Shoulder Mobility Circles', sets: '10 reps', reps: 'Controlled motion', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Deep Squat Hold', sets: '30–60 seconds', reps: 'Static hold', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80' },
      { name: 'Thoracic Rotation', sets: '10 reps', reps: 'Each side', image: 'https://images.unsplash.com/photo-1596357905330-d21ecad1e8f2?auto=format&fit=crop&w=800&q=80' }
    ]
  }
};
