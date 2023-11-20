import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref,set, push, query, orderByKey, limitToLast, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getStorage, ref as StorageRef, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

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
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage();

document.getElementById("register").addEventListener("click", async function() {
  // Gather form data
  var email = document.getElementById("email").value;
  var senha = document.getElementById("password").value;
  var cnpj = document.getElementById("cnpj-input").value;
  var areaAtuacao = document.getElementById("areaAtuacao").value;
  var telefone = document.getElementById("phone-input").value;
  var descricao = document.querySelector("textarea").value;

  const imagemInput = document.getElementById("imagem-input");
  const imagemFile = imagemInput.files[0];

  let imageUrl = null;

  if (imagemFile) {
    const storageRef = StorageRef(storage, "images/");
    const imagemSnapshot = await uploadBytes(storageRef, imagemFile);
    imageUrl = await getDownloadURL(imagemSnapshot.ref);
  }

  const idQuery = query(ref(database, 'Empresas'), orderByKey());
  const idSnapshot = await get(idQuery);
  
  // Get all existing IDs
  const existingIds = Object.keys(idSnapshot.val() || {});

  // Find the first available ID
  let newId = 1;
  while (existingIds.includes(newId.toString())) {
    newId++;
  }

  set(ref(database, `Empresas/${newId}`), {
    Email: email,
    Senha: senha,
    CNPJ: cnpj,
    AreaAtuacao: areaAtuacao,
    Telefone: telefone,
    Descricao: descricao,
    ImageUrl: imageUrl  // Novo campo para armazenar a URL da imagem
  });

  // Email and password authentication (if needed)
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Registration successfully!!");
      window.location.replace('Login.htm');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      alert(errorMessage);
    });
});
