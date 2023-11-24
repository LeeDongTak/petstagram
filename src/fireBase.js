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
    console.log('제목,내용 저장',docRef.id);
    
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
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const dataUrl = await readFileAsDataURL(file);
    await uploadString(storageRef, dataUrl, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Image uploaded successfully. Download URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
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