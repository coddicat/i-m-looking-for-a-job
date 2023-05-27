import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyDD1Hkq2AmQsGO7h8l0wwx5kENo0u0tvXw',
  authDomain: 'i-m-looking-for-a-job.firebaseapp.com',
  projectId: 'i-m-looking-for-a-job',
  storageBucket: 'i-m-looking-for-a-job.appspot.com',
  messagingSenderId: '719819100882',
  appId: '1:719819100882:web:bc730d5ce511e5f84d930b',
  measurementId: 'G-P7T8MDGENB'
};

export const app = initializeApp(firebaseConfig);
