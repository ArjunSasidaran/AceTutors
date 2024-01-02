// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmGnT2SYGMHy3AUY30RLRX_f7AjJQ6D2I",
  authDomain: "acetutors-fa7da.firebaseapp.com",
  projectId: "acetutors-fa7da",
  storageBucket: "acetutors-fa7da.appspot.com",
  messagingSenderId: "853593852214",
  appId: "1:853593852214:web:c720debdad2fc941d40b97",
  measurementId: "G-CQW9782HZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);


