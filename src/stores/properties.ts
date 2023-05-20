import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CollectionReference, collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import "@/firebase";
import type { Properties } from '@/types';
export const firestoreDb = getFirestore();

const collRef = collection(firestoreDb, "main") as CollectionReference<Properties>;
const docRef = doc<Properties>(collRef, "properties");

export const usePropertyStore = defineStore('properties', () => {
  const properties = ref<Properties>();
  onSnapshot<Properties>(docRef, (doc) => {
    properties.value = doc.data();    
  });

  return { properties }
})
