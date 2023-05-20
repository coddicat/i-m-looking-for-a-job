import "@/firebase";
import type { UserEntity } from "@/types";
import { CollectionReference, collection, doc, getCountFromServer, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
export const firestoreDb = getFirestore();

const userCollRef = collection(firestoreDb, "users") as CollectionReference<UserEntity>;
const countCollRef = collection(firestoreDb, "users");
const countQuery = query(countCollRef, where("liked", "==", true));

export const useLikesStore = defineStore('likes', () => {
    const likesCount = ref(0);
    
    async function nextTick() {
        const snapshot = await getCountFromServer(countQuery);
        likesCount.value = snapshot.data().count;
        window.setTimeout(nextTick, 3000);
    }

    async function setLiked(uid: string, liked: boolean) {        
        const docRef = doc<UserEntity>(userCollRef, uid);
        likesCount.value += liked ? 1 : -1;
        await updateDoc(docRef, {
            liked
        });
    }

    nextTick();
    return { likesCount, setLiked }
});  
