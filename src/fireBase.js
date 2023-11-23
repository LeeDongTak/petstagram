// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { config } from "./config";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = config.db.dbConfig

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize FireStore
export const db = getFirestore(app);
export const auth = getAuth(app);
