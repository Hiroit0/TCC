// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiLcGIaET63fJjRgSSwwI2NCppt-qnrXw",
  authDomain: "empresas-aac03.firebaseapp.com",
  projectId: "empresas-aac03",
  storageBucket: "empresas-aac03.appspot.com",
  messagingSenderId: "761927015613",
  appId: "1:761927015613:web:30d4e852e143d1f3502bd4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
console.log(app);

const db = database;
const postListRef = ref(db, 'posts');
const newPostRef = push(postListRef);
set(newPostRef, {
    // ...
});

//----- New Registration code start	  
document.getElementById("register").addEventListener("click", function() {
  var email =  document.getElementById("email").value;
  var password = document.getElementById("password").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Registration successfully!!");
    window.location.replace('Login.htm')

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    alert(error);
  });		  		  
});
//----- End

