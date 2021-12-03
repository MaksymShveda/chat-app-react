import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBj2DmsqujFDWY6Bd5HDPIBnwXuibnTDN4",
  authDomain: "react-chat-app-c57fc.firebaseapp.com",
  projectId: "react-chat-app-c57fc",
  storageBucket: "react-chat-app-c57fc.appspot.com",
  messagingSenderId: "817359221097",
  appId: "1:817359221097:web:39bb35be7dd3593dd14df8",
  measurementId: "G-7VW9JQL6GM"
}
firebase.initializeApp(firebaseConfig)

export default firebase