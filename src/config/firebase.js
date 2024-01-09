// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG1xSuisjBedRoixeV4IK8UHnwKZ4NH5w",
  authDomain: "vite-contact-6d3d6.firebaseapp.com",
  projectId: "vite-contact-6d3d6",
  storageBucket: "vite-contact-6d3d6.appspot.com",
  messagingSenderId: "648170873604",
  appId: "1:648170873604:web:2d94a4ad2ff43cd3c62651"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)