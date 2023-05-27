import { initializeApp } from 'firebase/app';
import firebaseConfig from './config.env.json';
export const app = initializeApp(firebaseConfig);
