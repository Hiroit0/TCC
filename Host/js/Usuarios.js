import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

const processedIDs = new Set(); // Para armazenar IDs já processados




addEventListener("DOMContentLoaded", ()=>{
        const direita = document.createElement("div");
        direita.classList.add("direita");
        const titulo = document.createElement("h1")
        titulo.textContent = "MATCHES"
        titulo.id = "Titulo"
        direita.appendChild(titulo)
        document.body.appendChild(direita);

        getAllIDs()
        .then(allIDs => {
            allIDs.forEach(inputKey => {
                checkAceitoValue(inputKey); // Chame a função para verificar "Aceito" para cada usuário
            });
        })
        .catch(error => {
            console.error(error);
        });
});

function checkAceitoValue(inputKey) {
    const userRef = ref(db, "Usuarios/" + inputKey + "/Aceito");

    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const aceitoValue = snapshot.val();

                // Verifique se "Aceito" é igual a 1
                if (aceitoValue === 1) {
                    // Se for igual a 1, obtenha o nome e mostre na div "direita"
                    const nomeRef = ref(db, "Usuarios/" + inputKey + "/Name");

                    get(nomeRef)
                        .then((nomeSnapshot) => {
                            if (nomeSnapshot.exists()) {
                                const nome = nomeSnapshot.val();
                                showNomeNaDireita(nome);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

// Função para mostrar o nome na div "direita"
function showNomeNaDireita(nome) {
    const direita = document.querySelector(".direita")
    
    let nomesContainer = document.querySelector(".MatchesNames");
    if (!nomesContainer) {
        nomesContainer = document.createElement("div");
        nomesContainer.classList.add("MatchesNames");
        direita.appendChild(nomesContainer);
    }

    // Create a paragraph element for the name
    const nomeElement = document.createElement("p");
    nomeElement.textContent = "Nome: " + nome;
    nomesContainer.appendChild(nomeElement);
}


function displayData(inputKey, name, area, cidade, mais, telefone,descricao) {    
    if (!processedIDs.has(inputKey)) {
        processedIDs.add(inputKey);
        console.log("Ids processados: " + inputKey);
        const cardContainer = document.getElementById("cardContainer");

        const card = document.createElement("div");
        card.className = "card card-enter";

        const nameElement = createParagraph(name, "name");
        const areaCidadeElement = createAreaCidadeParagraph(area, cidade, "area-cidade");
        const maisElement = createMaisParagraph(mais, "mais");
        const telefoneElement = createParagraph("Telefone: " + telefone, "telefone");
        const inputKeyElement = document.createElement("p");
        inputKeyElement.textContent = inputKey;
        inputKeyElement.style.display = "none"; // Tornar invisível
        
        
        card.appendChild(inputKeyElement);
        card.appendChild(nameElement);
        card.appendChild(areaCidadeElement);
        card.appendChild(maisElement);
        card.appendChild(telefoneElement);

        cardContainer.appendChild(card);

        let expandido = false;
        let selecionado = false;
        card.addEventListener("click", () => {
            localStorage.setItem("Condicao","FOI")
            
            if (expandido) {
                card.style.transform = "scale(1)";
                const descricaoElement = card.querySelector(".descricao");
                if (descricaoElement) {
                    card.removeChild(descricaoElement);
                }
                const buttonContainer = card.querySelector(".button-container");
                if (buttonContainer) {
                    card.removeChild(buttonContainer);
                }
                const invisibleCard = document.querySelector(".invisible-card");
                console.log(invisibleCard);
                invisibleCard.removeChild(card)
                cardContainer.appendChild(card);
                cardContainer.style.opacity = 1
                cardContainer.style.pointerEvents = "all";
                invisibleCard.style.display = "none"
                console.log(invisibleCard);

            } else {
                const invisibleCard = document.querySelector(".invisible-card");
                invisibleCard.classList.add("invisible-card");
                invisibleCard.style.display = "block";
                document.body.appendChild(invisibleCard);
                card.classList.remove(".card");
                card.classList.add("selected-card");
                // Remove a classe .card do card selecionado
                card.classList.remove("card");
                const allCards = document.querySelectorAll(".card");
                allCards.forEach((otherCard) => {
                    if (otherCard !== card) {
                        cardContainer.style.opacity = "0.5"
                        cardContainer.style.pointerEvents = "none"
                    }
                });
                invisibleCard.appendChild(card)
                card.style.transform = "scale(2)";
                const descricaoElement = createParagraph("Descricao: " + descricao, "descricao");
                card.appendChild(descricaoElement);
                const buttonContainer = document.createElement("div");
                buttonContainer.className = "button-container";
                const certoButton = document.createElement("button");
                certoButton.textContent = "Entrevistar";
                certoButton.className = "Button-Certo";
                const erradoButton = document.createElement("button");
                erradoButton.textContent = "Recusar";
                erradoButton.className = "Button-Errado";
                buttonContainer.appendChild(erradoButton);
                buttonContainer.appendChild(certoButton);
                card.appendChild(buttonContainer);
                certoButton.addEventListener("click",()=>{
                    if (certoButton && inputKeyElement) {
                        const inputKey = inputKeyElement.textContent;
                        const userRef = ref(db, "Usuarios/" + inputKey);
                    
                        // Adicione um evento de clique ao botão certoButton
                            // Atualiza a variável "Aceito" para 1
                            update(userRef, {
                                Aceito: 1
                            })
                            .then(() => {
                                alert("Aceito atualizado para 1 com sucesso");
                            })
                            .catch((error) => {
                                alert(error);
                            });
                    }
                })
                expandido = true;
            }
        });
        
    }
}



function createParagraph(text, className) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    paragraph.classList.add(className);
    return paragraph;
}

function createAreaCidadeParagraph(areaText, cidadeText, className) {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `<span class="area">${areaText}</span> | <span class="cidade">${cidadeText}</span>`;
    paragraph.classList.add(className);
    return paragraph;
}

function createMaisParagraph(maisText, className) {
    const paragraph = document.createElement("p");
    const words = maisText.split(' ');
    const borderedWords = words.map(word => `<span class="bordered-word">${word}</span>`);
    paragraph.innerHTML = borderedWords.join(' ');
    paragraph.classList.add(className);
    return paragraph;
}


function getAllIDs() {
    const dbref = ref(db, "Usuarios");

    return get(dbref)
        .then((snapshot) => {
            
            const allIDs = [];
            if (snapshot.exists()) {
                const data = snapshot.val();
                Object.keys(data).forEach(inputKey => {
                    allIDs.push(inputKey);
                });
            }
            return allIDs;
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
}



function FindData() {
    const dbref = ref(db);
    getAllIDs()
        .then(allIDs => {
            allIDs.forEach(inputKey => {
                get(child(dbref, "Usuarios/" + inputKey))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const name = snapshot.val().Name;
                        const area = snapshot.val().Area;
                        const cidade = snapshot.val().Cidade;
                        const mais = snapshot.val().Mais;
                        const telefone = snapshot.val().tel;
                        const descricao = snapshot.val().Descricao;
                        displayData(inputKey, name, area, cidade, mais, telefone,descricao); 
                        console.log("Ids sendo puxados: " + allIDs)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            });
        })
        .catch(error => {
            console.error(error);
        });
}

var findBtn = document.querySelector("#find");
findBtn.addEventListener('click', FindData);