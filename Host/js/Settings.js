import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
    authDomain: "tcc-01-14792.firebaseapp.com",
    databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
    projectId: "tcc-01-14792",
    storageBucket: "tcc-01-14792.appspot.com",
    messagingSenderId: "432967975257",
    appId: "1:432967975257:web:890f1cf2373a70fa5d8c48"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

