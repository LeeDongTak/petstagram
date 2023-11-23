// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTO_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// REACT_APP_FIREBASE_API_KEY="AIzaSyAuaSJda88E6A1q4Dg2p1tHUttOzZD8PjM"
// REACT_APP_AUTO_DOMAIN="petlogin-ce0f2.firebaseapp.com"
// REACT_APP_PROJECT_ID="petlogin-ce0f2"
// REACT_APP_STORAGE_BUCKET="petlogin-ce0f2.appspot.com"
// REACT_APP_MESSAGING_SENDER_ID="223184423440"
// REACT_APP_APP_ID="1:223184423440:web:9346538a1c405b84d0d895"
