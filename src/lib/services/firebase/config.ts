// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth
} from 'firebase/auth';

// import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configurationP0O
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FR_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FR_AUTH_DOMAIN,
  projectId: "coffe-fit",
  storageBucket: process.env.NEXT_PUBLIC_FR_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FR_MESSAG,
  appId: process.env.NEXT_PUBLIC_FR_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FR_MESURMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// const db = getFirestore(app);

export { 
  auth,
  // db
};

