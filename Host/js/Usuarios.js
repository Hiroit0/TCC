import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
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

const processedIDs = new Set(); // Para armazenar IDs já processados

addEventListener("DOMContentLoaded", ()=>{
        const direita = document.createElement("div");
        direita.classList.add("direita");
        const titulo = document.createElement("h1")
        titulo.textContent = "MATCHES"
        titulo.id = "Titulo"
        direita.appendChild(titulo)
        document.body.appendChild(direita);
        
        
});





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




function displayData(userId, name, area, cidade, mais, telefone,descricao,imgUrl,nomeDaEmpresa) {    
    if (!processedIDs.has(userId)) {
        processedIDs.add(userId);
        console.log("Ids processados: " + userId);
        const cardContainer = document.getElementById("cardContainer");

        const card = document.createElement("div");
        card.className = "card card-enter";

        const nameElement = createParagraph(name, "name");
        const areaCidadeElement = createAreaCidadeParagraph(area, cidade, "area-cidade");
        const maisElement = createMaisParagraph(mais, "mais");
        const telefoneElement = createParagraph("Telefone: " + telefone, "telefone");
        const userIdElement = document.createElement("p");
        userIdElement.textContent = userId;
        userIdElement.style.display = "none"; 
        const EmpresaElement = document.createElement("p");
        EmpresaElement.textContent = nomeDaEmpresa;
        EmpresaElement.style.display = "none"; 
        const imgElement = document.createElement("img");
        imgElement.src = imgUrl
        imgElement.style.height = "100px";
        imgElement.style.width = "100px";
        imgElement.style.objectFit = "cover"; 

        console.log(imgElement);
        
        card.appendChild(imgElement);
        card.appendChild(userIdElement);
        card.appendChild(EmpresaElement)
        card.appendChild(nameElement);
        card.appendChild(areaCidadeElement);
        card.appendChild(maisElement);
        card.appendChild(telefoneElement);
        
        cardContainer.appendChild(card);

        let expandido = false;
        card.addEventListener("click", () => {
            localStorage.setItem("Condicao", "FOI");
        
            const invisibleCard = document.querySelector(".invisible-card");
        
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
        
                // Verifique se o card está no invisibleCard antes de tentar removê-lo
                if (invisibleCard.contains(card)) {
                    invisibleCard.removeChild(card);
                }
        
                cardContainer.appendChild(card);
                cardContainer.style.opacity = 1;
                cardContainer.style.pointerEvents = "all";
                invisibleCard.style.display = "none";
                expandido = false;
            } else {
                invisibleCard.classList.add("invisible-card");
                invisibleCard.style.display = "block";
                document.body.appendChild(invisibleCard);
                card.classList.remove(".card");
                card.classList.add("selected-card");
                const allCards = document.querySelectorAll(".card");
                allCards.forEach((otherCard) => {
                    if (otherCard !== card) {
                        cardContainer.style.opacity = "0.5";
                        cardContainer.style.pointerEvents = "none";
                    }
                });
                invisibleCard.appendChild(card);
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
                certoButton.addEventListener("click", () => {
                    if (certoButton && userIdElement && EmpresaElement) {
                        const userId = userIdElement.textContent;
                        const nomeDaEmpresa = EmpresaElement.textContent
                        const userRef = ref(db, `Meet/${nomeDaEmpresa}/${userId}`);
                        
                        update(userRef, {
                            Aceito: 1
                        })
                            .then(() => {
                                alert("Aceito atualizado para 1 com sucesso");
                                alert(nomeDaEmpresa)
                            })
                            .catch((error) => {
                                alert(error);
                            });
                    }
                });
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

    if (maisText.includes(' ')) {
        const words = maisText.split(' ');
        const borderedWords = words.map(word => `<span class="bordered-word">${word}</span>`);
        paragraph.innerHTML = borderedWords.join(' ');
    } else {
        paragraph.textContent = maisText; // Se houver apenas uma palavra, define o texto diretamente
    }

    paragraph.classList.add(className);
    return paragraph;
}


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
                    console.log("Nome da empresa encontrada:", nomeDaEmpresa);
                    // Obtendo a referência da pasta "Meet" da empresa logada
                    const meetRef = ref(db, "Meet/" + nomeDaEmpresa);

                    // Obtendo todos os dados da pasta "Meet" da empresa logada
                    get(meetRef).then(meetSnapshot => {
                        meetSnapshot.forEach(userSnapshot => {
                            var userData = userSnapshot.val();
                            var userId = userSnapshot.key;
                            console.log("ID do usuário:", userId);
                            console.log("Dados do usuário:", userData);
                            console.log(userId);
                            get(child(meetRef, userId))
                                .then((snapshot) => {
                                    if (snapshot.exists()) {

                                        const name = snapshot.val().Name;
                                        const area = snapshot.val().Area;
                                        const cidade = snapshot.val().Cidade;
                                        const mais = snapshot.val().Mais;
                                        const telefone = snapshot.val().Telefone;
                                        const descricao = snapshot.val().Descricao;
                                        const imgUrl = snapshot.val().imagem;
                                        displayData(userId, name, area, cidade, mais, telefone, descricao, imgUrl, nomeDaEmpresa);
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });

                            // Chame checkAceitoValue() aqui, passando userId e nomeDaEmpresa como argumentos
                            checkAceitoValue(userId, nomeDaEmpresa);
                        });
                    }).catch(error => {
                        console.error("Erro ao obter snapshot do Meet:", error);
                    });
                }
            });
        }).catch(error => {
            console.error("Erro ao obter dados do Realtime Database:", error);
        });

    } else {
        console.log("Usuário não autenticado");
    }
});

// Defina checkAceitoValue para aceitar userId e nomeDaEmpresa como parâmetros
function checkAceitoValue(userId, nomeDaEmpresa) {
    // Sua lógica checkAceitoValue aqui, usando userId e nomeDaEmpresa conforme necessário
    const userRef = ref(db, `Meet/${nomeDaEmpresa}/${userId}/Aceito`);
    console.log(userRef)
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const aceitoValue = snapshot.val();
                // Verifique se "Aceito" é igual a 1
                if (aceitoValue === 1) {
                    // Se for igual a 1, obtenha o nome e mostre na div "direita"
                    const nomeRef = ref(db, `Meet/${nomeDaEmpresa}/${userId}/Name`);

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
        });}
