// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APP_ENV_API_KEY,
  authDomain: process.env.APP_ENV_AUTH_DOMAIN,
  projectId: process.env.APP_ENV_PROJECT_ID,
  storageBucket: process.env.APP_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_ENV_SENDER_ID,
  appId: process.env.APP_ENV_APP_ID,
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
