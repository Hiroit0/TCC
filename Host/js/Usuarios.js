import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getStorage, ref as StorageRef, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
  authDomain: "tcc-01-14792.firebaseapp.com",
  databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
  projectId: "tcc-01-14792",
  storageBucket: "tcc-01-14792.appspot.com",
  messagingSenderId: "432967975257",
  appId: "1:432967975257:web:2c48a5e7df9e3d3d5d8c48",
};

const app = initializeApp(firebaseConfig);

console.log(app);


const auth = getAuth();
const db = getDatabase();
const storage = getStorage();
var storageRef = StorageRef(storage, "ImagensUsuarios/" + "polsaorisd.jpg");
const urlImagem = getDownloadURL(storageRef);

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

// Função para obter o último contato do Firebase
function getLastCheckedTime(nome, element) {
    const userRef = ref(db, `LastChecked/${nome}`);
    
    // Obtém os dados do Firebase
    get(userRef).then(snapshot => {
        const data = snapshot.val();

        // Se houver dados, exibe no elemento HTML
        if (data) {
            element.textContent = "Último Contato: " + data.datetime;
        }
    }).catch(error => {
        console.error("Erro ao obter o último contato:", error);
    });
}

// Função para verificar e atualizar o último contato no Firebase
function updateLastCheckedTime(element, nome) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

    // Verifica se já existe um registro para esse nome no Firebase
    const userRef = ref(db, `LastChecked/${nome}`);
    get(userRef).then(snapshot => {
        const data = snapshot.val();

        // Se não houver dados ou se a data/hora for diferente, atualiza e exibe
        if (!data || data.datetime !== `${formattedDate} ${formattedTime}`) {
            // Atualiza no Firebase
            set(userRef, { datetime: `${formattedDate} ${formattedTime}` });

            // Atualiza o texto no elemento HTML
            element.textContent = "Último Contato: " + formattedDate + " " + formattedTime;
        }
    }).catch(error => {
        console.error("Erro ao verificar o último contato:", error);
    });
}

// Função para mostrar o nome na lateral direita
function showNomeNaDireita(nome) {
    const direita = document.querySelector(".direita");

    let nomesContainer = document.querySelector(".MatchesNames");
    if (!nomesContainer) {
        nomesContainer = document.createElement("div");
        nomesContainer.classList.add("MatchesNames");
        direita.appendChild(nomesContainer);
    }

    // Create a paragraph element for the name
    const nomeElement = document.createElement("div");
    nomeElement.textContent = "Nome: " + nome;
    nomeElement.classList.add("Nomes");
    const lastCheckedElement = document.createElement("p");
    lastCheckedElement.classList.add("LastChecked");

    // Append the name and last checked elements to the container
    nomesContainer.appendChild(nomeElement);
    nomesContainer.appendChild(lastCheckedElement);

    // Chama a função para obter o último contato ao carregar a página
    getLastCheckedTime(nome, lastCheckedElement);

    // Add a click event listener to the name element
    nomeElement.addEventListener("click", () => {
        updateLastCheckedTime(lastCheckedElement, nome);
    });
}

// Obtém a lista de nomes do Firebase e exibe na lateral direita
const empresasRef = ref(db, 'LastChecked');
get(empresasRef).then(snapshot => {
    snapshot.forEach(childSnapshot => {
        var namaewa = childSnapshot.key;

        // Chama a função para mostrar o nome na lateral direita
        showNomeNaDireita(namaewa);
    });
}).catch(error => {
    console.error("Erro ao obter dados do Realtime Database:", error);
});




function displayData(inputKey, name, area, cidade, mais, telefone,descricao,imgURL) {    
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
        inputKeyElement.style.display = "none"; 
        const imgElement = document.createElement("img");
        imgElement.src = imgURL;
        imgElement.style.height = "100px";
        imgElement.style.width = "100px";
        imgElement.style.objectFit = "cover"; 

        console.log(imgElement);
        
        card.appendChild(imgElement);
        card.appendChild(inputKeyElement);
        card.appendChild(nameElement);
        card.appendChild(areaCidadeElement);
        card.appendChild(maisElement);
        card.appendChild(telefoneElement);
        
        cardContainer.appendChild(card);

        let expandido = false;
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
    
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("Usuário autenticado");
            var userEmail = user.email;
            console.log("Email do usuário:", userEmail);
            const empresasRef = ref(db, 'Empresas');
            get(empresasRef).then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    var empresaData = childSnapshot.val();
                    if (empresaData.Email === userEmail) {
                        var nomeDaEmpresa = empresaData.Nome;

                        const meetRef = ref(db, "Meet/" + nomeDaEmpresa);

                        get(meetRef).then(meetSnapshot => {
                            const values = [];
                    
                            meetSnapshot.forEach(idSnapshot => {
                                const id = idSnapshot.key;
                                const idValues = [];
                                const ids = []
                                idSnapshot.forEach(valueSnapshot => {
                                    const value = valueSnapshot.val();
                                    idValues.push(value);
                                    ids.push(id)
                                });
                    
                                // Agora, 'idValues' contém os valores dentro do ID atual
                                values.push({ values });
                                const dbref = ref(db);

                                ids.forEach(inputKey => {
                                    console.log(inputKey)
                                    get(child(dbref, "Meet/" + nomeDaEmpresa + inputKey))
                                    .then((snapshot) => {
                                        if (snapshot.exists()) {
                                            const name = snapshot.val().Name;
                                            const area = snapshot.val().Area;
                                            const cidade = snapshot.val().Cidade;
                                            const mais = snapshot.val().Mais;
                                            const telefone = snapshot.val().tel;
                                            const descricao = snapshot.val().Descricao;
                                            const imgURL = snapshot.val().imagem
                                            displayData(inputKey, name, area, cidade, mais, telefone,descricao,imgURL); 
                                            console.log("Ids sendo puxados: " + allIDs)
                                            console.log("Url sendo puxados: " + imgURL)
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                                });
                            });
                    
                            console.log("Lista de IDs e seus valores do Meet:", values);
                    
                            // Continue o processamento com a lista de IDs e valores se necessário
                        }).catch(error => {
                            console.error("Erro ao obter snapshot do Meet:", error);
                        });

                        console.log("Nome da empresa encontrada:", nomeDaEmpresa);
                        get(ref(db, "Meet/" + nomeDaEmpresa)).then(meetSnapshot => {
                            console.log("Snapshot do Meet", meetSnapshot.val());
                            // Continue o processamento com os dados do "Meet" se necessário
                        }).catch(error => {
                            console.error("Erro ao obter snapshot do Meet:", error);
                        });
                    }
                });
                
            }).catch(error => {
                console.error("Erro ao obter dados do Realtime Database:", error);
            });
        } 
        
        

        else {
            console.log("Usuário não autenticado");
        }
    });


}


var findBtn = document.querySelector("#find");
findBtn.addEventListener('click', FindData);



/* document.body.addEventListener("click", ()=>{
    set(ref(db, "Meet/Cleito/2"),{
        Area
        :
        "la",
        Cidade
        :
        "sapónalkkai",
        Descricao
        :
        "Auuuu porco pidao",
        Mais
        :
        "asads ",
        Name
        :
        "asdadsas",
        Telefone
        :
        "123123",
    })
}) */