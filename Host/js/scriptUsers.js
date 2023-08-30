import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
const firebaseConfig = {
  apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
  authDomain: "tcc-01-14792.firebaseapp.com",
  databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
  projectId: "tcc-01-14792",
  storageBucket: "tcc-01-14792.appspot.com",
  messagingSenderId: "432967975257",
  appId: "1:432967975257:web:2c48a5e7df9e3d3d5d8c48",
  databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

console.log(app);

const db = getDatabase();
const auth = getAuth();
var enterID = document.querySelector("#enterID");
var enterName = document.querySelector("#enterName");
var enterTel = document.querySelector("#enterTel");
var enterCNPJ = document.querySelector("#enterCNPJ");
var enterEndereco = document.querySelector("#enterEndereco");
var enterDescricao = document.querySelector("#enterDescricao");

var insertBtn = document.querySelector("#insert");

function InsertData() {
  set(ref(db, "People/" + enterID.value),{
      Name: enterName.value,
      ID: enterID.value,
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
