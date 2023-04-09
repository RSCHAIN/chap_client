// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const appCLient = {
  apiKey: "AIzaSyC45trCJz6Cl3BSedB2Zm0SnAc5Suox8OM",
  authDomain: "okaycool-19167.firebaseapp.com",
  projectId: "okaycool-19167",
  storageBucket: "okaycool-19167.appspot.com",
  messagingSenderId: "320095317483",
  appId: "1:320095317483:web:02816f1c7c9d53e4d2bdae",
  databaseURL: "https://okaycool-19167-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(appCLient);
const db2 = getDatabase()
const db = getFirestore(app)
export {app,db,db2}