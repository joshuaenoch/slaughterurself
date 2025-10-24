import React from 'react'

export default function WorkoutComplete({ workout, onRestart, onBackToDashboard }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTotalWorkoutTime = () => {
    const totalExerciseTime = workout.exercises.length * workout.exerciseTime * workout.rounds
    const totalBreakTime = (workout.exercises.length - 1) * workout.breakTime * workout.rounds
    return totalExerciseTime + totalBreakTime
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #333, #666)',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '72px',
          marginBottom: '20px'
        }}>
          🎉
        </div>
        
        <h1 style={{
          fontSize: '48px',
          margin: '0 0 20px 0',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Workout Complete!
        </h1>
        
        <div style={{
          fontSize: '24px',
          marginBottom: '30px',
          opacity: 0.9
        }}>
          Great job finishing "{workout.name}"!
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          <div style={{marginBottom: '8px'}}>
            <strong>Total Time:</strong> ~{formatTime(getTotalWorkoutTime())}
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Exercises:</strong> {workout.exercises.length}
          </div>
          <div style={{marginBottom: '8px'}}>
            <strong>Rounds:</strong> {workout.rounds}
          </div>
          <div>
            <strong>Calories Burned:</strong> ~{Math.round(getTotalWorkoutTime() / 60 * 8)} cal*
          </div>
          <div style={{fontSize: '12px', opacity: 0.7, marginTop: '8px'}}>
            *Estimated based on moderate intensity
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onRestart}
            style={{
              background: '#6b7280',
              color: 'white',
              border: '2px solid #9ca3af',
              padding: '12px 24px',
              cursor: 'pointer',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#4b5563'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#6b7280'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            🔄 Do It Again
          </button>
          
          <button
            onClick={onBackToDashboard}
            style={{
              background: 'white',
              color: 'black',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            🏠 Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}