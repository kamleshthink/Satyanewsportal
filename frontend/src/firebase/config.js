import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCbHOgLhpr76oIIsxn0wfOPrOPRc7t3gBA",
    authDomain: "satyanews-82f73.firebaseapp.com",
    projectId: "satyanews-82f73",
    storageBucket: "satyanews-82f73.firebasestorage.app",
    messagingSenderId: "937024323883",
    appId: "1:937024323883:web:61940abce372e91c68056e",
    measurementId: "G-XPVFJ84E6P"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 