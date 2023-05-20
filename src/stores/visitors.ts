import "@/firebase";
import { collection, getCountFromServer, getFirestore } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
export const firestoreDb = getFirestore();

const countCollRef = collection(firestoreDb, "users");

export const useVisitorsStore = defineStore('visitors', () => {
    const visitorsCount = ref(0);
    
    async function nextTick() {
        const snapshot = await getCountFromServer(countCollRef);
        visitorsCount.value = snapshot.data().count;
        window.setTimeout(nextTick, 3000);
    }
    
    nextTick();
    return { visitorsCount }
});  
