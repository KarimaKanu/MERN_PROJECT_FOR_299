// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAjXW8NTFstMCdML_8ZRJs6OacM3-HGHw",
  authDomain: "mernproject-5e18e.firebaseapp.com",
  projectId: "mernproject-5e18e",
  storageBucket: "mernproject-5e18e.firebasestorage.app",
  messagingSenderId: "146861945939",
  appId: "1:146861945939:web:ccd5f69d1cda90e682c2a6",
  measurementId: "G-B5E53QEMLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);