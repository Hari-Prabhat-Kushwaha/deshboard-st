import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAfR0elwPHIB-Qsyjj99vd8GoFfBCRaiLU",
    authDomain: "student-deshboard.firebaseapp.com",
    projectId: "student-deshboard",
    storageBucket: "student-deshboard.appspot.com",
    messagingSenderId: "572777745728",
    appId: "1:572777745728:web:7407d3c31b2c62cf4fbea5",
    measurementId: "G-SZ6H1KDQJ7"
  };

  const app=initializeApp(firebaseConfig);


  export const db=getFirestore(app);