import {
  getAuth,
  type Auth,
  type User,
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';
import { afterEach, test, vi, type Mock } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../current-user';
import { onSnapshot, setDoc, type Timestamp } from 'firebase/firestore';

const testUser = {
  isAnonymous: true,
  uid: 1234567890
} as any as User;

vi.mock('firebase/auth', () => ({
  getAuth: () => ({} as Auth),
  signInAnonymously: () => Promise.resolve(),
  onAuthStateChanged: (_: Auth, callback: (user: User) => void) =>
    callback(testUser)
}));

vi.mock('firebase/firestore', async () => {
  const actual = (await vi.importActual('firebase/firestore')) as {
    Timestamp: Timestamp;
  };
  return {
    doc: vi.fn(),
    getFirestore: vi.fn(),
    collection: vi.fn(),
    setDoc: vi.fn(),
    onSnapshot: vi.fn(),
    Timestamp: actual.Timestamp
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('Validate Firebase Authentication Mocking', async ({ expect }) => {
  const auth = getAuth();
  await signInAnonymously(auth);
  const user = await new Promise<User | null>(resolve => {
    onAuthStateChanged(auth, async user => {
      resolve(user);
    });
  });
  expect(user).toBe(testUser);
});

test('Initial Ready Status Should be False', ({ expect }) => {
  setActivePinia(createPinia());
  const store = useAuthStore();
  expect(store.ready).toBe(false);
});

test('Verify CurrentAuthUser Assignment', async ({ expect }) => {
  setActivePinia(createPinia());
  const store = useAuthStore();
  expect(store.currentAuthUser).toStrictEqual(testUser);
});

test('Validate Invocation of setDoc and onSnapshot', async ({ expect }) => {
  (onSnapshot as Mock).mockImplementationOnce((_, callback) => {
    const res = { data: () => testUser };
    callback(res);
  });
  setActivePinia(createPinia());
  const store = useAuthStore();
  expect(setDoc).toHaveBeenCalledTimes(1);
  await Promise.resolve();
  expect(onSnapshot).toHaveBeenCalledTimes(1);
  expect(store.currentUser).toStrictEqual(testUser);
});

test('Verify Ready Status as True After All Operations', async ({ expect }) => {
  setActivePinia(createPinia());
  const store = useAuthStore();
  // Wait for all promises to resolve
  await new Promise(resolve => setTimeout(resolve, 0));

  expect(store.ready).toBe(true);
});
