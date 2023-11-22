// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { config } from "./config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = config.db.dbConfig

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize FireStore
export const db = getFirestore(app);