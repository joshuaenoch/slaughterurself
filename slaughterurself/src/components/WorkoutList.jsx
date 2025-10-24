import React from 'react'

export default function WorkoutList({ workouts, onPlay }) {
  if (workouts.length === 0) {
    return <p>No workouts yet. Create one!</p>
  }

  return (
    <div>
      <h3>Your Workouts</h3>
      <ul>
        {workouts.map((w, i) => (
          <li key={i}>
            {w.name}{' '}
            <button onClick={() => onPlay(w)}>Play</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
