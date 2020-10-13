import storage from 'localforage';

export const setItem = async (key: string, value: any) => {
  await storage.setItem(key, value);
};

export const getItem = async (key: string): Promise<any> => {
  return await storage.getItem(key);
};

export const removeItem = async (key: string) => {
  return await storage.removeItem(key);
};
