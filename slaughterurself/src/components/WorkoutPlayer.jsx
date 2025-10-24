import React, { useEffect, useState } from 'react'

export default function WorkoutPlayer({ workout, onQuit }) {
  const [round, setRound] = useState(1)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    const beep = new Audio('/beep.mp3')
    beep.play()

    let duration = isBreak ? workout.breakTime : workout.exerciseTime
    const timer = setTimeout(() => {
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
          alert('Workout Complete!')
          onQuit()
        }
      }
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [exerciseIndex, isBreak, round])

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>
        {isBreak ? 'Break' : workout.exercises[exerciseIndex]}
      </h1>
      <p>Round {round} of {workout.rounds}</p>
      <button onClick={onQuit}>Quit</button>
    </div>
  )
}
