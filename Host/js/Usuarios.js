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

function displayData(inputKey, name, area, cidade, mais, telefone,descricao) {
    let PosicaoCard = 850
    
    if (!processedIDs.has(inputKey)) {
        processedIDs.add(inputKey);
        console.log("Ids processados: " + inputKey);
        const cardContainer = document.getElementById("cardContainer");

        const card = document.createElement("div");
        card.className = "card card-enter";
        var PosicaoIndividual = PosicaoCard + 100;
        if (PosicaoIndividual >= 850) {
            PosicaoIndividual += 100
        }
        card.classList.add("card-" + PosicaoIndividual);

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
        let transicao = false;
        let buttonContainer;
        let descricaoElement;
        
        card.addEventListener("click", () => {
            if (!expandido) {
                if (PosicaoIndividual >= 1000){
                    PosicaoIndividual = 850
                    return PosicaoIndividual;
                }
                const inputKeyElement = card.querySelector("p");
                if (inputKeyElement) {
                const inputKey = inputKeyElement.textContent;
                console.log("InputKey clicada: " + inputKey);
                }
                console.log(card);
                card.style.left = PosicaoIndividual + "px";
                card.style.transition = "left ease-in 1s";
                cardContainer.style.right = "180px";
                cardContainer.style.transition = "right ease-in 0.5s";
                card.classList.remove("card-enter");
                expandido = true;
            } else {
                card.style.left = "0px";
                card.style.transition = "left ease-in 1s";
                cardContainer.style.right = "0px";
                cardContainer.style.transition = "right ease-in 0.5s";
                expandido = false;
            }
        });
        card.addEventListener("transitionend", () => {
            if (!transicao && expandido) {
                buttonContainer = document.createElement("div");
                buttonContainer.className = "button-container";
        
                const certoButton = document.createElement("button");
                certoButton.textContent = "V";
                certoButton.className = "Button-Certo";
        
                const erradoButton = document.createElement("button");
                erradoButton.textContent = "X";
                erradoButton.className = "Button-Errado";
                
                descricaoElement = createParagraph("Descricao: " + descricao, "descricao");
                
                card.appendChild(descricaoElement);
                buttonContainer.appendChild(erradoButton);
                buttonContainer.appendChild(certoButton);
                card.appendChild(buttonContainer);
                card.style.transform = "scale(1.2)";
                transicao = true;
                console.log(card);
                if (certoButton && inputKeyElement) {
                    const inputKey = inputKeyElement.textContent;
                    const userRef = ref(db, "Usuarios/" + inputKey);
                
                    // Adicione um evento de clique ao botão certoButton
                    certoButton.addEventListener("click", () => {
                        // Atualiza a variável "Aceito" para 1
                        update(userRef, {
                            Aceito: 1
                        })
                        .then(() => {
                            alert("Aceito atualizado para 1 com sucesso");
                            window.location.replace("/host/pages/Chat.html");
                        })
                        .catch((error) => {
                            alert(error);
                        });
                    });
                }
            } else if (transicao && !expandido) {
                if (buttonContainer) {
                    card.removeChild(buttonContainer);
                }
                if (descricaoElement) {
                    card.removeChild(descricaoElement);
                }
                card.style.transform = "scale(1)";
                transicao = false;
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