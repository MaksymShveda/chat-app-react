import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBj2DmsqujFDWY6Bd5HDPIBnwXuibnTDN4",
  authDomain: "react-chat-app-c57fc.firebaseapp.com",
  projectId: "react-chat-app-c57fc",
  storageBucket: "react-chat-app-c57fc.appspot.com",
  messagingSenderId: "817359221097",
  appId: "1:817359221097:web:39bb35be7dd3593dd14df8",
  measurementId: "G-7VW9JQL6GM"
}
initializeApp(firebaseConfig)


export default firebase