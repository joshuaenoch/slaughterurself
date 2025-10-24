import React, { useState } from 'react'

export default function WorkoutForm({ onSave, onCancel, initialWorkout = null }) {
  const [name, setName] = useState(initialWorkout?.name || '')
  const [exercises, setExercises] = useState(initialWorkout?.exercises || [''])
  const [exerciseTime, setExerciseTime] = useState(initialWorkout?.exerciseTime || 120)
  const [breakTime, setBreakTime] = useState(initialWorkout?.breakTime || 30)
  const [rounds, setRounds] = useState(initialWorkout?.rounds || 3)

  const handleSubmit = (e) => {
    e.preventDefault()
    const filteredExercises = exercises.filter(ex => ex.trim() !== '')
    if (filteredExercises.length === 0) {
      alert('Please add at least one exercise')
      return
    }
    const workout = {
      name,
      exercises: filteredExercises,
      exerciseTime,
      breakTime,
      rounds,
    }
    onSave(workout)
  }

  const addExercise = () => {
    setExercises([...exercises, ''])
  }

  const removeExercise = (index) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index))
    }
  }

  const updateExercise = (index, value) => {
    const newExercises = [...exercises]
    newExercises[index] = value
    setExercises(newExercises)
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: '500px', margin: '0 auto', padding: '20px'}}>
      <h3>{initialWorkout ? 'Edit Workout' : 'Create Workout'}</h3>
      
      <div style={{marginBottom: '15px'}}>
        <input
          type="text"
          placeholder="Workout name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{width: '100%', padding: '8px', marginBottom: '10px'}}
          required
        />
      </div>

      <div style={{marginBottom: '15px'}}>
        <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Exercises:</label>
        {exercises.map((exercise, index) => (
          <div key={index} style={{display: 'flex', marginBottom: '8px', alignItems: 'center'}}>
            <input
              type="text"
              placeholder={`Exercise ${index + 1}`}
              value={exercise}
              onChange={(e) => updateExercise(index, e.target.value)}
              style={{flex: 1, padding: '8px', marginRight: '8px'}}
            />
            {exercises.length > 1 && (
              <button
                type="button"
                onClick={() => removeExercise(index)}
                style={{
                  background: '#666',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addExercise}
          style={{
            background: 'black',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '4px',
            marginTop: '8px'
          }}
        >
          + Add Exercise
        </button>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px'}}>
        <div>
          <label style={{display: 'block', marginBottom: '5px'}}>Exercise Time (seconds):</label>
          <input
            type="number"
            value={exerciseTime}
            onChange={(e) => setExerciseTime(Number(e.target.value))}
            style={{width: '100%', padding: '8px'}}
            min="1"
            required
          />
        </div>
        <div>
          <label style={{display: 'block', marginBottom: '5px'}}>Break Time (seconds):</label>
          <input
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
            style={{width: '100%', padding: '8px'}}
            min="1"
            required
          />
        </div>
      </div>

      <div style={{marginBottom: '20px'}}>
        <label style={{display: 'block', marginBottom: '5px'}}>Rounds:</label>
        <input
          type="number"
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          style={{width: '100%', padding: '8px'}}
          min="1"
          required
        />
      </div>

      <div style={{display: 'flex', gap: '10px'}}>
        <button 
          type="submit"
          style={{
            flex: 1,
            background: 'black',
            color: 'white',
            border: 'none',
            padding: '12px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          {initialWorkout ? 'Update' : 'Save'}
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          style={{
            flex: 1,
            background: '#666',
            color: 'white',
            border: 'none',
            padding: '12px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
