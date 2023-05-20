// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD1Hkq2AmQsGO7h8l0wwx5kENo0u0tvXw",
  authDomain: "i-m-looking-for-a-job.firebaseapp.com",
  projectId: "i-m-looking-for-a-job",
  storageBucket: "i-m-looking-for-a-job.appspot.com",
  messagingSenderId: "719819100882",
  appId: "1:719819100882:web:bc730d5ce511e5f84d930b",
  measurementId: "G-P7T8MDGENB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);