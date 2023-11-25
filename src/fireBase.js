// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { config } from './config';

// Your web app's Firebase configuration
const firebaseConfig = config.db.dbConfig;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize FireStore
export const db = getFirestore(app);

export const storage = getStorage(app);

// Create a storage reference from our storage service
