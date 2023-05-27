import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import {
  CollectionReference,
  Timestamp,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import '@/firebase';
import type { UserEntity } from '@/types';
export const firestoreDb = getFirestore();

const auth = getAuth();

signInAnonymously(auth)
  .then(() => {
    console.log('Signed in as anonymous');
  })
  .catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error code: ${errorCode}, error message: ${errorMessage}`);
  });

const collRef = collection(
  firestoreDb,
  'users'
) as CollectionReference<UserEntity>;

export const useAuthStore = defineStore('currentUser', () => {
  const currentAuthUser = ref<User>();
  const currentUser = ref<UserEntity>();
  const ready = ref(false);

  onAuthStateChanged(auth, async user => {
    if (user) {
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      currentAuthUser.value = user;
      console.log(
        `User is signed in as ${
          isAnonymous ? 'anonymous' : 'not anonymous'
        }, uid: ${uid}`
      );
      await setUser(uid, isAnonymous);
    } else {
      currentAuthUser.value = undefined;
      currentUser.value = undefined;
      console.log('User is signed out');
    }

    ready.value = true;
  });

  async function setUser(uid: string, isAnonymous: boolean) {
    const docRef = doc<UserEntity>(collRef, uid);
    await setDoc(
      docRef,
      {
        isAnonymous,
        lastVisitTime: Timestamp.now()
      },
      { merge: true }
    );

    onSnapshot<UserEntity>(docRef, doc => {
      currentUser.value = doc.data();
    });
  }

  return { currentAuthUser, currentUser, ready };
});
