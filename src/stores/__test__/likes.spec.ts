import { beforeEach, afterEach, test, vi, type Mock } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLikesStore } from '../likes';
import { updateDoc, getCountFromServer } from 'firebase/firestore';

vi.mock('firebase/firestore', async () => {
  return {
    doc: vi.fn(),
    getFirestore: vi.fn(),
    collection: vi.fn(),
    updateDoc: vi.fn(),
    getCountFromServer: vi.fn(),
    where: vi.fn(),
    query: vi.fn()
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});
beforeEach(() => {
  vi.useFakeTimers();
  (getCountFromServer as Mock).mockResolvedValue({
    data: () => ({ count: 5 })
  });
});

test('Initial ready status should be false', ({ expect }) => {
  setActivePinia(createPinia());
  const store = useLikesStore();
  expect(store.ready).toBe(false);
});

test('Verify likes count from server', async ({ expect }) => {
  setActivePinia(createPinia());
  const store = useLikesStore();
  // Wait for nextTick to resolve
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  expect(store.likesCount).toBe(5);
});

test('Update likes with setLiked function', async ({ expect }) => {
  (updateDoc as Mock).mockResolvedValueOnce({});
  setActivePinia(createPinia());
  const store = useLikesStore();
  // Wait for nextTick to resolve
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  await store.setLiked('1234567890', true);
  expect(updateDoc).toHaveBeenCalledTimes(1);
  expect(store.likesCount).toBe(6); // One added to the initial count
});
