import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
  authDomain: "tcc-01-14792.firebaseapp.com",
  databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
  projectId: "tcc-01-14792",
  storageBucket: "tcc-01-14792.appspot.com",
  messagingSenderId: "432967975257",
  appId: "1:432967975257:web:2c48a5e7df9e3d3d5d8c48",
};

const app = initializeApp(firebaseConfig);

console.log(app);

const auth = getAuth();

document.addEventListener("DOMContentLoaded",()=>{
    const email = "arskhancontato@gmail.com"
    sendPasswordResetEmail(auth,email)
    .then(()=>{
        window.close();
    })
})

