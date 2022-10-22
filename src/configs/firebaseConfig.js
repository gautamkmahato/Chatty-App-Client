// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9ysVFNNwgBak_vSv4vouegu9spCW86x4",
  authDomain: "react-auth-f0182.firebaseapp.com",
  projectId: "react-auth-f0182",
  storageBucket: "react-auth-f0182.appspot.com",
  messagingSenderId: "124385161163",
  appId: "1:124385161163:web:5bb27d7796dc3d06b8104e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



export {auth , app};
export default auth;
