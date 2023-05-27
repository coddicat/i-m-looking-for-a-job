import { afterEach, test, vi, type Mock } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePropertyStore } from '../properties';
import { onSnapshot } from 'firebase/firestore';
import type { Properties } from '@/types';

const testProperties = {
  id: '123',
  location: 'Test Location',
  price: 1000
} as any as Properties;

vi.mock('firebase/firestore', async () => {
  const actual = (await vi.importActual('firebase/firestore')) as {
    Properties: Properties;
  };
  return {
    doc: vi.fn(),
    getFirestore: vi.fn(),
    collection: vi.fn(),
    onSnapshot: vi.fn(),
    Properties: actual.Properties
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('Initial ready status should be false', ({ expect }) => {
  setActivePinia(createPinia());
  const store = usePropertyStore();
  expect(store.ready).toBe(false);
});

test('Should populate properties on snapshot', async ({ expect }) => {
  (onSnapshot as Mock).mockImplementationOnce((_, callback) => {
    const res = { data: () => testProperties };
    callback(res);
  });
  setActivePinia(createPinia());
  const store = usePropertyStore();
  await Promise.resolve();
  expect(onSnapshot).toHaveBeenCalledTimes(1);
  expect(store.properties).toStrictEqual(testProperties);
});

test('Ready status should be true after snapshot', async ({ expect }) => {
  (onSnapshot as Mock).mockImplementationOnce((_, callback) => {
    const res = { data: () => testProperties };
    callback(res);
  });
  setActivePinia(createPinia());
  const store = usePropertyStore();
  // Wait for all promises to resolve
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(store.ready).toBe(true);
});
