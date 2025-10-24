import React, { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import WorkoutPlayer from './components/WorkoutPlayer'
import WorkoutComplete from './components/WorkoutComplete'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function App() {
  const [user, setUser] = useState(null)
  const [currentWorkout, setCurrentWorkout] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [playOptions, setPlayOptions] = useState({ showTimer: false, showWorkoutList: false })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handlePlay = (workout, options = {}) => {
    setCurrentWorkout(workout)
    setPlayOptions(options)
    setPlaying(true)
    setCompleted(false)
  }

  const handleWorkoutComplete = () => {
    setPlaying(false)
    setCompleted(true)
  }

  const handleQuit = () => {
    setPlaying(false)
    setCompleted(false)
    setCurrentWorkout(null)
  }

  const handleRestart = () => {
    setCompleted(false)
    setPlaying(true)
  }

  const handleBackToDashboard = () => {
    setCompleted(false)
    setCurrentWorkout(null)
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  if (completed && currentWorkout) {
    return (
      <WorkoutComplete
        workout={currentWorkout}
        onRestart={handleRestart}
        onBackToDashboard={handleBackToDashboard}
      />
    )
  }

  if (playing && currentWorkout) {
    return (
      <WorkoutPlayer
        workout={currentWorkout}
        onQuit={handleQuit}
        onComplete={handleWorkoutComplete}
        showTimer={playOptions.showTimer}
        showWorkoutList={playOptions.showWorkoutList}
      />
    )
  }

  return (
    <Dashboard
      user={user}
      onPlay={handlePlay}
    />
  )
}
