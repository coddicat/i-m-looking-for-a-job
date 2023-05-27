import { afterEach, test, vi, type Mock, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useVisitorsStore } from '../visitors';
import { getCountFromServer } from 'firebase/firestore';

vi.mock('firebase/firestore', async () => {
  return {
    doc: vi.fn(),
    getFirestore: vi.fn(),
    collection: vi.fn(),
    getCountFromServer: vi.fn()
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});
beforeEach(() => {
  vi.useFakeTimers();
  (getCountFromServer as Mock).mockResolvedValue({
    data: () => ({ count: 10 })
  });
});

test('Initial ready status should be false', ({ expect }) => {
  setActivePinia(createPinia());
  const store = useVisitorsStore();
  expect(store.ready).toBe(false);
});

test('Verify visitors count from server', async ({ expect }) => {
  setActivePinia(createPinia());
  const store = useVisitorsStore();
  // Wait for nextTick to resolve
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  expect(store.visitorsCount).toBe(10);
});

test('Ready status should be true after first server update', async ({
  expect
}) => {
  setActivePinia(createPinia());
  const store = useVisitorsStore();
  // Wait for nextTick to resolve
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  expect(store.ready).toBe(true);
});
