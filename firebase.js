// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7hrZLei65YBqf7tfJk7Du1HAMHcr5wJE",
  authDomain: "ig-clone-react-native-60996.firebaseapp.com",
  projectId: "ig-clone-react-native-60996",
  storageBucket: "ig-clone-react-native-60996.appspot.com",
  messagingSenderId: "836716631462",
  appId: "1:836716631462:web:0bcdf394628fb44a406b67",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

const db = firebase.firestore();

export { auth, db, firebase };
