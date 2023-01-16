import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDFKb4zzuDCh-fjERuTgoo7fqSDtnhHvA0',
  authDomain: 'vuefire-crud-95a74.firebaseapp.com',
  projectId: 'vuefire-crud-95a74',
  storageBucket: 'vuefire-crud-95a74.appspot.com',
  messagingSenderId: '235817507052',
  appId: '1:235817507052:web:f8d06dac96c22aedd06dc9',
  measurementId: 'G-NCYXPDD09P',
});

// used for the firestore refs
export const fireDB = getFirestore(firebaseApp);

// here we can export reusable database references
export const authorsRef = collection(fireDB, 'authors');
export const booksRef = collection(fireDB, 'books');
