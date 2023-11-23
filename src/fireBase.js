import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyA1IGCoNcZ1MH6GnPHp07vruAwxNdo4Deg",
  authDomain: "sparta-73421.firebaseapp.com",
  projectId: "sparta-73421",
  storageBucket: "sparta-73421.appspot.com",
  messagingSenderId: "546114751229",
  appId: "1:546114751229:web:3c99e0a698f9d716d2cc94",
  measurementId: "G-C9118BEXJ6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);


export const saveData= async (title,content)=>{
  try{
    const docRef =await addDoc(collection(db,"posts"),{
      title,
      content
    });
    console.log('id',docRef.id)
  }catch(e){
    console.log('실패')
    return null;
  }
};

export const fetchData = async()=>{
  const snapshot =await getDocs(collection(db,"post"));
  const posts=[];
  snapshot.forEach((doc)=>{
    posts.push({id:doc.id,...doc.data()});
  });
  return posts;
};

const storage = getStorage(app);

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadString(storageRef, file, 'data_url');
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};