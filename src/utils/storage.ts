import { openDB, DBSchema } from 'idb';

interface MyDB extends DBSchema {
  'tianhai-data': {
    key: string;
    value: any;
  };
}

const dbPromise = openDB<MyDB>('tianhai-db', 1, {
  upgrade(db) {
    db.createObjectStore('tianhai-data');
  },
});

export const saveData = async (key: string, value: any) => {
  try {
    const db = await dbPromise;
    await db.put('tianhai-data', value, key);
    console.log(`Data saved successfully for key: ${key}`);
  } catch (error) {
    console.error('Error saving data:', error);
    throw error; // 重新抛出错误，以便调用者可以处理它
  }
};

export const loadData = async (key: string) => {
  try {
    const db = await dbPromise;
    const data = await db.get('tianhai-data', key);
    console.log(`Data loaded successfully for key: ${key}`, data);
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error; // 重新抛出错误，以便调用者可以处理它
  }
};