import React, { useEffect, useState, useRef } from 'react'

export default function WorkoutPlayer({ workout, onQuit, onComplete, showTimer, showWorkoutList }) {
  const [round, setRound] = useState(1)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInitialCountdown, setIsInitialCountdown] = useState(true)
  const [initialCountdownTime, setInitialCountdownTime] = useState(5)
  const [showTimerToggle, setShowTimerToggle] = useState(showTimer || false)
  const [showWorkoutListToggle, setShowWorkoutListToggle] = useState(showWorkoutList || false)
  
  const timerRef = useRef(null)
  const initialCountdownRef = useRef(null)

  // Initialize timer
  useEffect(() => {
    if (isInitialCountdown) {
      setInitialCountdownTime(5)
    } else {
      setTimeLeft(isBreak ? workout.breakTime : workout.exerciseTime)
    }
  }, [isBreak, exerciseIndex, round, isInitialCountdown, workout])

  // Initial countdown logic (only at the very start)
  useEffect(() => {
    if (isInitialCountdown && !isPaused) {
      initialCountdownRef.current = setInterval(() => {
        setInitialCountdownTime(prev => {
          if (prev <= 1) {
            setIsInitialCountdown(false)
            const beep = new Audio('/beep.mp3')
            beep.play().catch(() => {})
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      clearInterval(initialCountdownRef.current)
    }
  }, [isInitialCountdown, isPaused])

  // Main timer logic
  useEffect(() => {
    if (isPaused || isInitialCountdown) return

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (!isBreak) {
            setIsBreak(true)
          } else {
            setIsBreak(false)
            if (exerciseIndex < workout.exercises.length - 1) {
              setExerciseIndex(exerciseIndex + 1)
            } else if (round < workout.rounds) {
              setExerciseIndex(0)
              setRound(round + 1)
            } else {
              onComplete?.()
              return 0
            }
          }
          // Beep for transitions during workout
          const beep = new Audio('/beep.mp3')
          beep.play().catch(() => {})
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [isPaused, isInitialCountdown, isBreak, exerciseIndex, round, workout, onComplete])

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

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

  const getCurrentWorkoutIndex = () => {
    return (round - 1) * workout.exercises.length + exerciseIndex
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'white' }}>
      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        position: 'relative'
      }}>
        {/* Initial Countdown Overlay (full screen for workout start) */}
        {isInitialCountdown && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              color: 'white',
              fontSize: '120px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              {initialCountdownTime > 0 ? initialCountdownTime : 'GO!'}
            </div>
          </div>
        )}

        {/* Transition Countdown (small red number in center, only when timer is hidden) */}
        {!isInitialCountdown && !showTimerToggle && timeLeft <= 5 && timeLeft > 0 && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'red',
            fontSize: '48px',
            fontWeight: 'bold',
            zIndex: 500,
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            {timeLeft}
          </div>
        )}

        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: 'black'
        }}>
          {isBreak ? 'Break' : workout.exercises[exerciseIndex]}
        </div>

        <div style={{
          fontSize: '24px',
          color: '#666',
          marginBottom: '40px'
        }}>
          Round {round} of {workout.rounds}
        </div>

        <div style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center'
        }}>
          <button 
            onClick={togglePause}
            style={{
              background: isPaused ? 'black' : '#666',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          
          <button 
            onClick={onQuit}
            style={{
              background: '#333',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Quit
          </button>
        </div>
      </div>

      {/* Right Sidebar for Timer and Workout List */}
      <div style={{
        width: '300px',
        background: '#f5f5f5',
        borderLeft: '1px solid #ddd',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Timer Section */}
        <div>
          {showTimerToggle && (
            <div style={{
              background: 'white',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}>
              <div style={{fontSize: '24px', fontWeight: 'bold', color: 'black'}}>
                {formatTime(timeLeft)}
              </div>
              <div style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>
                {isBreak ? 'Break Time' : 'Exercise Time'}
              </div>
            </div>
          )}
          <button
            onClick={() => setShowTimerToggle(!showTimerToggle)}
            style={{
              background: showTimerToggle ? 'black' : '#666',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px',
              fontSize: '12px',
              width: '100%'
            }}
          >
            {showTimerToggle ? 'Hide Timer' : 'Show Timer'}
          </button>
        </div>

        {/* Workout List Section */}
        <div>
          {showWorkoutListToggle && (
            <div style={{
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                <h3 style={{margin: '0 0 8px 0', color: 'black'}}>Workout: {workout.name}</h3>
                <p style={{color: '#666', fontSize: '14px', margin: 0}}>
                  Total time: ~{formatTime(getTotalWorkoutTime())}
                </p>
              </div>
              <div style={{padding: '15px', maxHeight: '200px', overflowY: 'auto'}}>
                {workout.exercises.map((exercise, idx) => (
                  <div key={idx} style={{
                    padding: '8px',
                    margin: '4px 0',
                    background: getCurrentWorkoutIndex() === idx ? 'black' : '#f9f9f9',
                    color: getCurrentWorkoutIndex() === idx ? 'white' : 'black',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>
                    {exercise} ({formatTime(workout.exerciseTime)})
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => setShowWorkoutListToggle(!showWorkoutListToggle)}
            style={{
              background: showWorkoutListToggle ? 'black' : '#666',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px',
              fontSize: '12px',
              width: '100%'
            }}
          >
            {showWorkoutListToggle ? 'Hide Workout List' : 'Show Workout List'}
          </button>
        </div>
      </div>
    </div>
  )
}
