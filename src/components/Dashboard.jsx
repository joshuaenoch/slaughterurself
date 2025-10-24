import React, { useState, useEffect } from "react";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function Dashboard({ user, onPlay }) {
  const [workouts, setWorkouts] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);

  // Load workouts from Firestore
  useEffect(() => {
    const fetchWorkouts = async () => {
      const q = query(collection(db, "workouts"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      setWorkouts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchWorkouts();
  }, [user]);

  const addWorkout = async (workout) => {
    const docRef = await addDoc(collection(db, "workouts"), {
      ...workout,
      uid: user.uid
    });
    setWorkouts([...workouts, { id: docRef.id, ...workout }]);
    setCreating(false);
  };

  const updateWorkout = async (updatedWorkout) => {
    const workoutRef = doc(db, "workouts", editing.id);
    await updateDoc(workoutRef, updatedWorkout);
    setWorkouts(workouts.map(w => w.id === editing.id ? { ...w, ...updatedWorkout } : w));
    setEditing(null);
  };

  const deleteWorkout = async (workoutId) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      await deleteDoc(doc(db, "workouts", workoutId));
      setWorkouts(workouts.filter(w => w.id !== workoutId));
    }
  };

  const handleEdit = (workout) => {
    setEditing(workout);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {creating ? (
        <WorkoutForm onSave={addWorkout} onCancel={() => setCreating(false)} />
      ) : editing ? (
        <WorkoutForm 
          initialWorkout={editing} 
          onSave={updateWorkout} 
          onCancel={() => setEditing(null)} 
        />
      ) : (
        <>
          <button 
            onClick={() => setCreating(true)}
            style={{
              background: 'black',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              borderRadius: '4px',
              fontSize: '16px',
              marginBottom: '20px'
            }}
          >
            Create Workout
          </button>
          <WorkoutList 
            workouts={workouts} 
            onPlay={onPlay} 
            onEdit={handleEdit}
            onDelete={deleteWorkout}
          />
        </>
      )}
    </div>
  );
}
