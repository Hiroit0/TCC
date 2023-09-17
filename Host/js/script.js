import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
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

var enterID = document.querySelector("#enterID");
var enterName = document.querySelector("#enterName");
var enterTel = document.querySelector("#enterTel");
var enterArea = document.querySelector("#enterArea");
var enterCidade = document.querySelector("#enterCidade");
var enterMais = document.querySelector("#enterMais");
  
var insertBtn = document.querySelector("#insert");
  
function InsertData() {
    set(ref(db, "Usuarios/" + enterID.value),{
        Name: enterName.value,
        tel: enterTel.value,
        Area: enterArea.value,
        Cidade: enterCidade.value,
        Mais: enterMais.value,
    })
    .then(() => {
        alert("Data added successfully");
    })
    .catch((error) => {
        alert(error);
    });
  }

  
insertBtn.addEventListener('click', InsertData);
