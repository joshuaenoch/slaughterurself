import React, { useState, useEffect } from "react";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function Dashboard({ user, onPlay }) {
  const [workouts, setWorkouts] = useState([]);
  const [creating, setCreating] = useState(false);

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

  return (
    <div style={{ padding: "2rem" }}>
      {creating ? (
        <WorkoutForm onSave={addWorkout} onCancel={() => setCreating(false)} />
      ) : (
        <>
          <button onClick={() => setCreating(true)}>Create Workout</button>
          <WorkoutList workouts={workouts} onPlay={onPlay} />
        </>
      )}
    </div>
  );
}
