import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD-5PN0pZA4csUIV99zCK7pClCvtmj1keE",
  authDomain: "spaces-5aa8f.firebaseapp.com",
  projectId: "spaces-5aa8f",
  storageBucket: "spaces-5aa8f.appspot.com",
  messagingSenderId: "613689501326",
  appId: "1:613689501326:web:8315f8b55619c399ed8bdf",
  measurementId: "G-4ECL1G29X8"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export default fire;