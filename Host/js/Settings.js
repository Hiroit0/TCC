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
const db = getDatabase();
const auth = getAuth();

document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const paragraphs = document.querySelectorAll('.settings p.value');
    const inputs = document.querySelectorAll('.settings input.edit-input');
    const saveButtonContainer = document.querySelector('.save-btn');
    
    saveButtonContainer.style.display = 'none'; // Hide the "Enviar" button initially
    
    const auth = getAuth(); // Obtém a instância de autenticação Firebase
    // Verifica se o usuário está autenticado
    
        if (user) {
            console.log(user)

            // O usuário está autenticado, agora você pode buscar os dados do usuário no banco de dados em tempo real
            const userRef = ref(db, 'Usuarios/' + "ajmhdsv");
            
            // Obtenha os dados do usuário no banco de dados em tempo real
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    
                    // Exibe os dados do usuário nos campos de exibição
                    paragraphs[0].textContent = userData.Name;
                    paragraphs[1].textContent = userData.Email;
                    
                    // Exibe os dados do usuário nos campos de edição
                    inputs[0].value = userData.Name;
                    inputs[1].value = userData.Email;
                }
            }).catch((error) => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
        }
    
    
    editButton.addEventListener('click', function() {
        document.body.classList.add('edit-mode');
        
        paragraphs.forEach(p => p.style.display = 'none');
        inputs.forEach(input => input.style.display = 'block');
        
        editButton.style.display = 'none';
        saveButtonContainer.style.display = 'block'; // Mostra o botão "Enviar" quando no modo de edição
    });
    
    saveButton.addEventListener('click', function() {
        document.body.classList.remove('edit-mode');
        
        // Atualize os dados do usuário no banco de dados em tempo real
        const name = inputs[0].value;
        const email = inputs[1].value;
        const user = auth.currentUser; // Obtém o usuário autenticado
        
        if (user) {
            // Atualize os dados do usuário no banco de dados em tempo real
            update(ref(db, 'Usuarios/' + "ajmhdsv"), {
                Name: name,
                Email: email
            }).then(() => {
                console.log('Dados do usuário atualizados com sucesso.');
                
                // Exibe os dados atualizados nos campos de exibição
                paragraphs[0].textContent = name;
                paragraphs[1].textContent = email;
                
                // Oculta os campos de edição
                inputs.forEach(input => input.style.display = 'none');
                
                // Mostra o botão "Editar"
                editButton.style.display = 'block';
                saveButtonContainer.style.display = 'none'; // Oculta o botão "Enviar" quando as alterações são salvas
            }).catch((error) => {
                console.error('Erro ao atualizar dados do usuário:', error);
            });
        }
    });
});
