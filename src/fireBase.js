import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc,getDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { config } from "./config";

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

// Your we b app's Firebase configuration
// Initialize Firebase

const firebaseConfig = {      apiKey: "AIzaSyCJfp-HkLbo96_nrh8NN9y-o_BDeFRy4fA",
      authDomain: "website-6fb45.firebaseapp.com",
      projectId: "website-6fb45",
      storageBucket: "website-6fb45.appspot.com",
      messagingSenderId: "995582214512",
      appId: "1:995582214512:web:e8ba24e0c4ca4ffb948fb5"}

export const app = initializeApp(firebaseConfig);
// Your web app's Firebase configuration



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase


// Initialize FireStore
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
