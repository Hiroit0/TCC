	  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  import { getAuth,sendPasswordResetEmail , signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


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
  const auth = getAuth();
  console.log(app);

  document.getElementById("login").addEventListener("click", function() {
	  var email =  document.getElementById("login_email").value;
	  var password = document.getElementById("login_password").value;

	  signInWithEmailAndPassword(auth, email, password)
	  .then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		console.log(user);
		window.location.href = "/Host/Pages/Usuarios.htm";

	  })
	  .catch((error) => {
		const errorCode = error.code;
		if (errorCode==="auth/user-not-found"){alert("Usuário não encontrado, verifique as credenciais."); }
		else if (errorCode==="auth/wrong-password"){alert("Senha incorreta");}
		else if (errorCode === 'auth/invalid-email'){alert("Formato de email invalido, deve conter @exemplo.com");}
		else if (errorCode === 'auth/weak-password'){alert("A senha deve conter ao menos 6 caracteres.");}
		else {
			alert("Erro desconhecido: " + errorMessage);
		}
		const errorMessage = error.message;
		console.log(errorMessage);
	  });		  		  
  });