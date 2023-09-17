import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getDatabase, push,ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
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
console.log(app);
const db = getDatabase();



document.addEventListener('DOMContentLoaded', function() {

    // Crie o elemento div com a classe "--dark-theme" e o id "chat"
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("--dark-theme");
    chatDiv.id = "chat";

    // Crie a div com a classe "chat__conversation-board"
    const conversationBoardDiv = document.createElement("div");
    conversationBoardDiv.classList.add("chat__conversation-board");

    // Crie quatro contêineres de mensagem dentro da "chat__conversation-board"
    for (let i = 0; i < 4; i++) {
      const messageContainerDiv = document.createElement("div");
      messageContainerDiv.classList.add("chat__conversation-board__message-container");

      // Crie a div com a classe "chat__conversation-board__message__person"
      const personDiv = document.createElement("div");
      personDiv.classList.add("chat__conversation-board__message__person");

      // Crie a div com a classe "chat__conversation-board__message__context"
      const contextDiv = document.createElement("div");
      contextDiv.classList.add("chat__conversation-board__message__context");

      // Crie a div com a classe "chat__conversation-board__message__options"
      const optionsDiv = document.createElement("div");
      optionsDiv.classList.add("chat__conversation-board__message__options");

      // Crie o botão com a classe "btn-icon chat__conversation-board__message__option-button" e a classe "emoji-button"
      const emojiButton = document.createElement("button");
      emojiButton.classList.add("btn-icon", "chat__conversation-board__message__option-button", "option-item", "emoji-button");

      // Crie o elemento SVG e adicione os atributos necessários
      const emojiSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      emojiSVG.setAttribute("width", "24");
      emojiSVG.setAttribute("height", "24");
      emojiSVG.setAttribute("viewBox", "0 0 24 24");
      emojiSVG.setAttribute("fill", "none");
      emojiSVG.setAttribute("stroke", "currentColor");
      emojiSVG.setAttribute("stroke-width", "2");
      emojiSVG.setAttribute("stroke-linecap", "round");
      emojiSVG.setAttribute("stroke-linejoin", "round");
      emojiSVG.setAttribute("aria-hidden", "true");

      // Crie os elementos SVG filhos necessários e adicione-os ao SVG
      // Este exemplo é apenas para um dos botões, você pode repetir para os outros
      const emojiCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      emojiCircle.setAttribute("cx", "12");
      emojiCircle.setAttribute("cy", "12");
      emojiCircle.setAttribute("r", "10");

      emojiSVG.appendChild(emojiCircle);
      emojiButton.appendChild(emojiSVG);

      // Adicione o botão ao contêiner de opções
      optionsDiv.appendChild(emojiButton);

      // Adicione todos os elementos ao contêiner de mensagem
      messageContainerDiv.appendChild(personDiv);
      messageContainerDiv.appendChild(contextDiv);
      messageContainerDiv.appendChild(optionsDiv);

      // Adicione o contêiner de mensagem à "chat__conversation-board"
      conversationBoardDiv.appendChild(messageContainerDiv);
    }

    // Crie a div com a classe "chat__conversation-panel"
    const conversationPanelDiv = document.createElement("div");
    conversationPanelDiv.classList.add("chat__conversation-panel");

    // Crie a div com a classe "chat__conversation-panel__container"
    const panelContainerDiv = document.createElement("div");
    panelContainerDiv.classList.add("chat__conversation-panel__container");

    // Crie o botão para adicionar arquivo
    const addFileButton = document.createElement("button");
    addFileButton.classList.add("chat__conversation-panel__button", "panel-item", "btn-icon", "add-file-button");

    // Crie o elemento SVG para o botão de adicionar arquivo
    const addFileSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    addFileSVG.setAttribute("width", "24");
    addFileSVG.setAttribute("height", "24");
    addFileSVG.setAttribute("viewBox", "0 0 24 24");
    addFileSVG.setAttribute("fill", "none");
    addFileSVG.setAttribute("stroke", "currentColor");
    addFileSVG.setAttribute("stroke-width", "2");
    addFileSVG.setAttribute("stroke-linecap", "round");
    addFileSVG.setAttribute("stroke-linejoin", "round");
    addFileSVG.setAttribute("aria-hidden", "true");

    // Crie os elementos SVG filhos necessários e adicione-os ao SVG do botão
    const addFileLine1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    addFileLine1.setAttribute("x1", "12");
    addFileLine1.setAttribute("y1", "5");
    addFileLine1.setAttribute("x2", "12");
    addFileLine1.setAttribute("y2", "19");

    const addFileLine2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    addFileLine2.setAttribute("x1", "5");
    addFileLine2.setAttribute("y1", "12");
    addFileLine2.setAttribute("x2", "19");
    addFileLine2.setAttribute("y2", "12");

    addFileSVG.appendChild(addFileLine1);
    addFileSVG.appendChild(addFileLine2);

    addFileButton.appendChild(addFileSVG);

    // Repita o processo para os outros botões

    // Crie a entrada de texto
    const inputField = document.createElement("input");
    inputField.classList.add("chat__conversation-panel__input", "panel-item");
    inputField.setAttribute("id", "messageText");
    inputField.placeholder = "Type a message...";

    // Crie o botão de envio de mensagem
    const sendMessageButton = document.createElement("button");
    sendMessageButton.setAttribute("id", "sendMessage");
    sendMessageButton.classList.add("chat__conversation-panel__button", "panel-item", "btn-icon", "send-message-button");

    // Crie o elemento SVG para o botão de envio de mensagem
    const sendMessageSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    sendMessageSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    sendMessageSVG.setAttribute("width", "24");
    sendMessageSVG.setAttribute("height", "24");
    sendMessageSVG.setAttribute("viewBox", "0 0 24 24");
    sendMessageSVG.setAttribute("fill", "none");
    sendMessageSVG.setAttribute("stroke", "currentColor");
    sendMessageSVG.setAttribute("stroke-width", "2");
    sendMessageSVG.setAttribute("stroke-linecap", "round");
    sendMessageSVG.setAttribute("stroke-linejoin", "round");
    sendMessageSVG.setAttribute("aria-hidden", "true");

    // Crie os elementos SVG filhos necessários e adicione-os ao SVG do botão de envio de mensagem
    const sendMessageLine1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    sendMessageLine1.setAttribute("x1", "22");
    sendMessageLine1.setAttribute("y1", "2");
    sendMessageLine1.setAttribute("x2", "11");
    sendMessageLine1.setAttribute("y2", "13");

    const sendMessagePolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    sendMessagePolygon.setAttribute("points", "22 2 15 22 11 13 2 9 22 2");

    sendMessageSVG.appendChild(sendMessageLine1);
    sendMessageSVG.appendChild(sendMessagePolygon);

    sendMessageButton.appendChild(sendMessageSVG);

    // Adicione todos os elementos à "chat__conversation-panel__container"
    panelContainerDiv.appendChild(addFileButton);
    panelContainerDiv.appendChild(sendMessageButton);
    panelContainerDiv.appendChild(inputField);
    panelContainerDiv.appendChild(sendMessageButton);

    // Adicione a "chat__conversation-panel__container" à "chat__conversation-panel"
    conversationPanelDiv.appendChild(panelContainerDiv);

    // Adicione a "chat__conversation-board" e a "chat__conversation-panel" à "chat"
    chatDiv.appendChild(conversationBoardDiv);
    chatDiv.appendChild(conversationPanelDiv);

    // Adicione o elemento "chat" ao corpo do documento
    document.body.appendChild(chatDiv);
    var sendMessagebtn = document.querySelector("#sendMessage");
    var messageText = document.querySelector("#messageText");

    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      console.log(user);
      console.log(user.uid);
      var userId = user.uid;

      function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então adicionamos 1.
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
  
        // Formate a data e hora com zeros à esquerda, se necessário.
        const formattedDate = `${month}/${day}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;
  
        return `${formattedDate} ${formattedTime}`;
      }

      function SendMessagefunc() {
        
        const messageRef = ref(db, "Mensagens/" + userId);
        const timestamp = Date.now();
        const formattedMessage = formatTimestamp(timestamp);
        update(messageRef, {
            [formattedMessage]: messageText.value,
        })
          .then(() => {
            alert("Data added successfully");
          })
          .catch((error) => {
            alert(error);
          });
      }

      // Função para buscar as mensagens no banco de dados
      function fetchMessagesAndDisplay() {
        const messageRef = ref(db, "Mensagens/" + userId + "/9/16");
      
        get(messageRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const chatDiv = document.getElementById("chat");
      
              // Limpa o conteúdo atual da exibição de mensagens
              chatDiv.innerHTML = "";
      
              // Itera sobre as mensagens e cria elementos para exibi-las
              for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                  const messageText = data[key];
      
                  // Crie um container de mensagem
                  const messageContainer = document.createElement("div");
                  messageContainer.classList.add("chat__conversation-board__message-container");
      
                  // Crie um elemento de pessoa
                  const personDiv = document.createElement("div");
                  personDiv.classList.add("chat__conversation-board__message__person");
      
                  // Crie um avatar (imagem de pessoa)
                  const avatarDiv = document.createElement("div");
                  avatarDiv.classList.add("chat__conversation-board__message__person__avatar");
                  const avatarImg = document.createElement("img");
                  avatarImg.src = "transferir.jpg";
                  avatarImg.alt = "Avatar";
                  avatarDiv.appendChild(avatarImg);
                  
                  // Crie um nome de pessoa
                  const nicknameSpan = document.createElement("span");
                  nicknameSpan.classList.add("chat__conversation-board__message__person__nickname");
                  nicknameSpan.textContent = "Monika Figi";
      
                  // Adicione o avatar e o nome de pessoa ao elemento de pessoa
                  personDiv.appendChild(avatarDiv);
                  personDiv.appendChild(nicknameSpan);
      
                  // Crie um contexto de mensagem
                  const contextDiv = document.createElement("div");
                  contextDiv.classList.add("chat__conversation-board__message__context");
      
                  // Crie uma bolha de mensagem
                  const messageBubble = document.createElement("div");
                  messageBubble.classList.add("chat__conversation-board__message__bubble");
                  messageBubble.innerHTML = `<span>${messageText}</span>`;
      
                  // Crie opções de mensagem (botões)
                  const optionsDiv = document.createElement("div");
                  optionsDiv.classList.add("chat__conversation-board__message__options");
      
                  const emojiButton = document.createElement("button");
                  emojiButton.classList.add("btn-icon", "chat__conversation-board__message__option-button", "option-item", "emoji-button");
                  emojiButton.innerHTML = `
                    <svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  `;
      
                  const moreButton = document.createElement("button");
                  moreButton.classList.add("btn-icon", "chat__conversation-board__message__option-button", "option-item", "more-button");
                  moreButton.innerHTML = `
                    <svg class="feather feather-more-horizontal sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  `;
      
                  // Adicione os botões de emoji e mais opções ao elemento de opções
                  optionsDiv.appendChild(emojiButton);
                  optionsDiv.appendChild(moreButton);
      
                  // Adicione a bolha de mensagem, contexto e opções ao contexto de mensagem
                  contextDiv.appendChild(messageBubble);
                  contextDiv.appendChild(optionsDiv);
      
                  // Adicione a pessoa, contexto de mensagem e opções ao container de mensagem
                  messageContainer.appendChild(personDiv);
                  messageContainer.appendChild(contextDiv);
      
                  // Adicione o container de mensagem à exibição de mensagens
                  chatDiv.appendChild(messageContainer);
                }
              }
            } else {
              // O nó "Mensagens" não existe ou está vazio
              console.log("Nenhuma mensagem encontrada.");
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar mensagens:", error);
          });
      }
      
      // ...
      
      sendMessagebtn.addEventListener('click', fetchMessagesAndDisplay);
  
    });
  });
  




