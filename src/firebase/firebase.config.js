// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAUF7DQciiQS1Is4iEUtWjagIv49aELMY",
  authDomain: "user-email-password-auth-450c1.firebaseapp.com",
  projectId: "user-email-password-auth-450c1",
  storageBucket: "user-email-password-auth-450c1.appspot.com",
  messagingSenderId: "581659427034",
  appId: "1:581659427034:web:d72fe381ca40aa70d525e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;