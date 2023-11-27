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
  var nome = document.getElementById("nome").value;
  var lowerCaseEmail = email.toLowerCase();
  const idQuery = query(ref(database, 'Empresas'), orderByKey());
  const idSnapshot = await get(idQuery);
  
  // Get all existing IDs
  const existingIds = Object.keys(idSnapshot.val() || {});

  // Find the first available ID
  let newId = 1;
  while (existingIds.includes(newId.toString())) {
    newId++;
  }

  const imagemInput = document.getElementById("imagem-input");
  const imagemFile = imagemInput.files[0];

  let imageUrl = null;

  if (imagemFile) {
    const storageRef = StorageRef(storage, "ImagensEmpresas/" + newId);
    const imagemSnapshot = await uploadBytes(storageRef, imagemFile);
    imageUrl = await getDownloadURL(imagemSnapshot.ref);
    console.log(imageUrl);
  }


  // Email and password authentication (if needed)
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    alert("Cadastro realisado com sucesso!");
    window.location.replace('Login.htm');    
    // Somente se a autenticação for bem-sucedida, envie os dados para o Realtime Database
    set(ref(database, `Empresas/${newId}`), {
      Nome: nome,
      Email: lowerCaseEmail,
      Senha: senha,
      CNPJ: cnpj,
      AreaAtuacao: areaAtuacao,
      Telefone: telefone,
      Descricao: descricao,
      ImageUrl: imageUrl  
    });
  })  
  .catch((error) => {
    const errorCode = error.code;
    if (errorCode === 'auth/email-already-in-use') { alert("Email já está sendo utilizado"); } 
    else if (errorCode === 'auth/weak-password') { alert("Senha muito fraca, deve conter ao menos 6 caracteres"); }
    else if (errorCode === 'auth/invalid-email') { alert("Formato de email inválido, deve conter @exemplo.com"); }
    else { alert("Erro desconhecido: " + error.message) }
    const errorMessage = error.message;
    console.error(errorMessage);
  });
});


document.querySelector("html").classList.add('js');

document.getElementById('cnpj-input').addEventListener('input', function (e) {
  var cnpj = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (cnpj.length > 2) {
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2'); // Adiciona ponto após os primeiros dois dígitos
  }
  if (cnpj.length > 6) {
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Adiciona ponto após os próximos três dígitos
  }
  if (cnpj.length > 10) {
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4'); // Adiciona barra após os próximos três dígitos
  }
  if (cnpj.length > 13) {
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5'); // Adiciona hífen após o último dígito
  }
  e.target.value = cnpj;
});

// Formatação automática do telefone com espaço para o DDD
document.getElementById('phone-input').addEventListener('input', function (e) {
  var phone = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (phone.length > 2) {
    phone = '(' + phone.substring(0, 2) + ') ' + phone.substring(2); // Adiciona parênteses e espaço após os primeiros dois dígitos
  }
  if (phone.length > 7) {
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona hífen após os próximos cinco dígitos
  }
  e.target.value = phone;
});

document.body.addEventListener("click", ()=>{
  set(ref(database, "Meet/Cleito"),{
    Nome: "Cleito",
  })
})

