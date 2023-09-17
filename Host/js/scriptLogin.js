	  // Import the functions you need from the SDKs you need
	  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
	  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
	  import { getAuth,sendPasswordResetEmail , signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
 
	  // TODO: Add SDKs for Firebase products that you want to use
	  // https://firebase.google.com/docs/web/setup#available-libraries

	  // Your web app's Firebase configuration
	  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
	  const firebaseConfig = {
		apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
		authDomain: "tcc-01-14792.firebaseapp.com",
		databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
		projectId: "tcc-01-14792",
		storageBucket: "tcc-01-14792.appspot.com",
		messagingSenderId: "432967975257",
		appId: "1:432967975257:web:890f1cf2373a70fa5d8c48"
	  };

	  // Initialize Firebase
	  const app = initializeApp(firebaseConfig);
	  const auth = getAuth();
	  console.log(app);

	  //----- Login code start	  
	  document.getElementById("login").addEventListener("click", function() {
		  var email =  document.getElementById("login_email").value;
		  var password = document.getElementById("login_password").value;

		  signInWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
		    console.log(user);
		    alert(user.email+" Login successfully!!!");
		    document.getElementById('logout').style.display = 'block';
			window.location.href = "/Host/Pages/Chat.htm";

		    // ...
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    console.log(errorMessage);
		    alert(errorMessage);
		  });		  		  
	  });
	  //----- End

	  //----- Logout code start	  
	  document.getElementById("logout").addEventListener("click", function() {
		  signOut(auth).then(() => {
			  // Sign-out successful.
			  console.log('Sign-out successful.');
			  alert('Sign-out successful.');
			  document.getElementById('ChangePassword').setAttribute('hidden',"true");
			  document.getElementById('logout').style.display = 'none';
			}).catch((error) => {
			  // An error happened.
			  console.log('An error happened.');
			});		  		  
	  });
	  //----- End

	  auth.onAuthStateChanged(user => {
		if (user) {		
			
			const banana = user.uid
			console.log(banana)
			console.log(user.email)
			const email = user.email
			document.getElementById("ChangePassword").addEventListener("click", function() {
				sendPasswordResetEmail(auth, email)
				.then(() => {
				  alert("Password reset email sent!")
				  // ..
				})
				.catch((error) => {
				  const errorCode = error.code;
				  const errorMessage = error.message;
				  console.error("Error code:", errorCode);
					console.error("Error message:", errorMessage);
				  // ..
				});		  		  
			});
			
		} else {
			// not signed in
			console.log("erro")
		}
	});


	//-----	