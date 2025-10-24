import React, { useState } from 'react'

function PlayButton({ workout, onPlay }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [showWorkoutList, setShowWorkoutList] = useState(false)

  const handlePlay = () => {
    onPlay(workout, { showTimer, showWorkoutList })
    setShowDropdown(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: 'black',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        Play ▼
      </button>
      
      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          minWidth: '200px',
          marginTop: '4px'
        }}>
          <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
            Options:
          </div>
          
          <label style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={showTimer}
              onChange={(e) => setShowTimer(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Show Timer
          </label>
          
          <label style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={showWorkoutList}
              onChange={(e) => setShowWorkoutList(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Show Workout List
          </label>
          
          <button
            onClick={handlePlay}
            style={{
              background: 'black',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              cursor: 'pointer',
              borderRadius: '4px',
              width: '100%',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            ▶ Start Workout
          </button>
        </div>
      )}
    </div>
  )
}

export default function WorkoutList({ workouts, onPlay, onEdit, onDelete }) {
  if (workouts.length === 0) {
    return <p style={{textAlign: 'center', fontSize: '18px', color: '#666'}}>No workouts yet. Create one!</p>
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTotalWorkoutTime = (workout) => {
    const totalExerciseTime = workout.exercises.length * workout.exerciseTime * workout.rounds
    const totalBreakTime = (workout.exercises.length - 1) * workout.breakTime * workout.rounds
    return totalExerciseTime + totalBreakTime
  }

  return (
    <div>
      <h3 style={{marginBottom: '20px'}}>Your Workouts</h3>
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {workouts.map((workout) => (
          <div 
            key={workout.id} 
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              background: '#f9f9f9'
            }}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
              <div>
                <h4 style={{margin: '0 0 8px 0', fontSize: '18px'}}>{workout.name}</h4>
                <p style={{margin: '4px 0', color: '#666', fontSize: '14px'}}>
                  {workout.exercises.length} exercises × {workout.rounds} rounds
                </p>
                <p style={{margin: '4px 0', color: '#666', fontSize: '14px'}}>
                  Exercise: {formatTime(workout.exerciseTime)} | Break: {formatTime(workout.breakTime)}
                </p>
                <p style={{margin: '4px 0', color: '#666', fontSize: '14px'}}>
                  Total time: ~{formatTime(getTotalWorkoutTime(workout))}
                </p>
                <p style={{margin: '8px 0 0 0', fontSize: '14px'}}>
                  <strong>Exercises:</strong> {workout.exercises.join(', ')}
                </p>
              </div>
            </div>
            <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
              <PlayButton 
                workout={workout}
                onPlay={onPlay}
              />
              <button 
                onClick={() => onEdit(workout)}
                style={{
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(workout.id)}
                style={{
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
