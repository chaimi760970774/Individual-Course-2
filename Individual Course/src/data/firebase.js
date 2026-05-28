import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs5c-DJqOjHWc9qOBTapFe4bvmqmVaMQE",
  authDomain: "individual-course.firebaseapp.com",
  projectId: "individual-course",
  storageBucket: "individual-course.firebasestorage.app",
  messagingSenderId: "361426731645",
  appId: "1:361426731645:web:f19cc9990906685ba7e714",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);