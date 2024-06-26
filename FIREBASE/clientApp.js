// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore} from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { Router } from "next/router";

import secureLocalStorage from "react-secure-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC44N6PsbaBEica4WYf1yarrJ7hscgLmMo",
    authDomain: "auth.appchap.fr",
    databaseURL: "https://appchapfinal-default-rtdb.firebaseio.com",
    projectId: "appchapfinal",
    storageBucket: "appchapfinal.appspot.com",
    messagingSenderId: "991388025559",
    appId: "1:991388025559:web:7778779d2400f23bf22692",
    measurementId: "G-RFSVQTGJ87"
};
const provider2 = new FacebookAuthProvider();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});
provider2.setCustomParameters({
    'display': 'popup'
  });



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db2 = getDatabase(app)
const db = getFirestore(app)
const storage = getStorage(); 
const authentic= getAuth(app);
authentic.useDeviceLanguage();
export {app,db,db2,authentic,storage,provider,provider2}