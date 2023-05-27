import { afterEach, test, vi, type Mock } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLinksStore } from '../links';
import { onSnapshot } from 'firebase/firestore';
import type { Link } from '@/types';

const testLinks = [
  { id: '1', url: 'http://example.com/1' },
  { id: '2', url: 'http://example.com/2' },
  { id: '3', url: 'http://example.com/3' }
] as any as Link[];

vi.mock('firebase/firestore', async () => {
  const actual = (await vi.importActual('firebase/firestore')) as {
    Link: Link;
  };
  return {
    doc: vi.fn(),
    getFirestore: vi.fn(),
    collection: vi.fn(),
    onSnapshot: vi.fn(),
    Link: actual.Link
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('Initial ready status should be false', ({ expect }) => {
  setActivePinia(createPinia());
  const store = useLinksStore();
  expect(store.ready).toBe(false);
});

test('Should populate links on snapshot', async ({ expect }) => {
  (onSnapshot as Mock).mockImplementationOnce((_, callback) => {
    const res = { docs: testLinks.map(link => ({ data: () => link })) };
    callback(res);
  });
  setActivePinia(createPinia());
  const store = useLinksStore();
  await Promise.resolve();
  expect(onSnapshot).toHaveBeenCalledTimes(1);
  expect(store.links).toStrictEqual(testLinks);
});

test('Ready status should be true after snapshot', async ({ expect }) => {
  (onSnapshot as Mock).mockImplementationOnce((_, callback) => {
    const res = { docs: testLinks.map(link => ({ data: () => link })) };
    callback(res);
  });
  setActivePinia(createPinia());
  const store = useLinksStore();
  // Wait for all promises to resolve
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(store.ready).toBe(true);
});
