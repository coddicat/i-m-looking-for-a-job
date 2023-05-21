import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CollectionReference, collection, getFirestore, onSnapshot } from "firebase/firestore";
import "@/firebase";
import type { Link } from '@/types';
export const firestoreDb = getFirestore();

const collRef = collection(firestoreDb, "links") as CollectionReference<Link>;

export const useLinksStore = defineStore('links', () => {
  const links = ref<Link[]>();
  const ready = ref(false);

  onSnapshot<Link>(collRef, (snapshot) => {
    const docs = snapshot.docs.map(x => x.data());
    links.value = docs;    
    if (!ready.value) {
      ready.value = true;
    }
  });

  return { links, ready }
})
