import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword,setPersistence,browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"

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

console.log(app);

const db = getDatabase();
const auth = getAuth();
var enterEmail = document.querySelector("#enterEmail");
var enterName = document.querySelector("#enterName");
var enterTel = document.querySelector("#enterTel");
var enterCNPJ = document.querySelector("#enterCNPJ");
var enterEndereco = document.querySelector("#enterEndereco");
var enterDescricao = document.querySelector("#enterDescricao");

var insertBtn = document.querySelector("#insert");


document.getElementById("insert").addEventListener("click", function() {
  var email =  document.getElementById("enterEmail").value;
  var password = document.getElementById("enterPassword").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up successfully, but we want to prevent automatic sign-in
    const user = userCredential.user;
    console.log(user);
    alert("Registration successfully!!");
    
    // Configure the authentication persistence to "none"
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Now, the user won't be automatically signed in on page reloads
        window.location.replace('Login.htm');
      })
      .catch((error) => {
        console.error("Error setting authentication persistence:", error);
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
    console.error(errorCode);
    alert(error);
  });
	  		  
});

function InsertData() {
  set(ref(db, "Empresas/" + enterName.value),{
      Name: enterName.value,
      Email: enterEmail.value,
      tel: enterTel.value,
      CNPJ: enterCNPJ.value,
      Endereco: enterEndereco.value,
      Descricao: enterDescricao.value,
  })
  .then(() => {
      alert("Data added successfully");
  })
  .catch((error) => {
      alert(error);
  });
}

insertBtn.addEventListener('click', InsertData);
