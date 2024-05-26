import { atom } from 'recoil';

// Utility function to manage local storage
const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet(newValue => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const drawerState = atom({
  key: 'drawerState',
  default: true,
  effects_UNSTABLE: [
    localStorageEffect('drawerState'),
  ],
});
