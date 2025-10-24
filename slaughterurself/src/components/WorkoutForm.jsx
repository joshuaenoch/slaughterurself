import React, { useState } from 'react'

export default function WorkoutForm({ onSave, onCancel }) {
  const [name, setName] = useState('')
  const [exercises, setExercises] = useState('')
  const [exerciseTime, setExerciseTime] = useState(120)
  const [breakTime, setBreakTime] = useState(30)
  const [rounds, setRounds] = useState(3)

  const handleSubmit = (e) => {
    e.preventDefault()
    const workout = {
      name,
      exercises: exercises.split(',').map((ex) => ex.trim()),
      exerciseTime,
      breakTime,
      rounds,
    }
    onSave(workout)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Workout</h3>
      <input
        type="text"
        placeholder="Workout name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Exercises (comma separated)"
        value={exercises}
        onChange={(e) => setExercises(e.target.value)}
      />
      <input
        type="number"
        placeholder="Exercise time (sec)"
        value={exerciseTime}
        onChange={(e) => setExerciseTime(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Break time (sec)"
        value={breakTime}
        onChange={(e) => setBreakTime(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Rounds"
        value={rounds}
        onChange={(e) => setRounds(Number(e.target.value))}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}
