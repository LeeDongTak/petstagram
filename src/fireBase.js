import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { config } from "./config";


// Your we b app's Firebase configuration
// Initialize Firebase

export const saveData = async (id, title, content) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      id,
      title,
      content
    });
    console.log('제목,내용 저장', docRef.id);

  } catch (e) {
    console.log('실패')
    console.log(e.code);
    return null;
  }
};

export const fetchData = async () => {
  const snapshot = await getDocs(collection(db, "posts"));
  const posts = [];
  snapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return posts;
};


export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const dataUrl = await readFileAsDataURL(file);
    await uploadString(storageRef, dataUrl, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Image URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('에러', error);
    return null;
  }
};

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const fetchSinglePost = async (postId) => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDocs(docRef);

    if (docSnap.exists()) {
      return docSnap.data();

    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error('에러실패', error);
    return null;
  }
};


// const firebaseConfig = config.db.dbConfig;

const firebaseConfig = {
  apiKey: "AIzaSyDDTtTT1QXmWLAQn4wZbhFs5lSWqrnHwXU",
  authDomain: "petstagram-c9f48.firebaseapp.com",
  projectId: "petstagram-c9f48",
  storageBucket: "petstagram-c9f48.appspot.com",
  messagingSenderId: "799071390409",
  appId: "1:799071390409:web:6d67483fad8f0a290cdb18"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


// Create a storage reference from our storage service
