import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { config } from "./config";
// Your we b app's Firebase configuration
// Initialize Firebase



// Your web app's Firebase configuration
const firebaseConfig = config.db.dbConfig
export const app = initializeApp(firebaseConfig);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase


// Initialize FireStore
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);