// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyADM_jwcwi_krUB9BNCnvimzbsyJRTo9O4",
  authDomain: "crud-fddf8.firebaseapp.com",
  projectId: "crud-fddf8",
  storageBucket: "crud-fddf8.appspot.com",
  messagingSenderId: "106618544780",
  appId: "1:106618544780:web:0dbefa1c543fb9d92b91a9",
  measurementId: "G-16224FBNS7"
};

initializeApp(firebaseConfig);
const auth=getAuth()
const db=getFirestore();

export {auth,db};
