import React, { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import WorkoutPlayer from './components/WorkoutPlayer'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function App() {
  const [user, setUser] = useState(null)
  const [currentWorkout, setCurrentWorkout] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  if (playing && currentWorkout) {
    return (
      <WorkoutPlayer
        workout={currentWorkout}
        onQuit={() => setPlaying(false)}
      />
    )
  }

  return (
    <Dashboard
      user={user}
      onPlay={(workout) => {
        setCurrentWorkout(workout)
        setPlaying(true)
      }}
    />
  )
}
