import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYAIMynipTwHJW3UJgOBT5Fyh1lPK9EZM",
  authDomain: "slaughterurself-c1905.firebaseapp.com",
  projectId: "slaughterurself-c1905",
  storageBucket: "slaughterurself-c1905.firebasestorage.app",
  messagingSenderId: "359538485855",
  appId: "1:359538485855:web:41c7acf218ebaebd1709ea",
  measurementId: "G-Z5G3XQE28P"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
