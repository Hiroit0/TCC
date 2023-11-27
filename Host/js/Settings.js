import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {getDatabase, ref, get, set, child, update, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, onAuthStateChanged, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

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
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("Usuário autenticado");
        var userEmail = user.email;
        console.log("Email do usuário:", userEmail);

        const empresasRef = ref(db, 'Empresas');

        get(empresasRef).then(snapshot => {
            let empresaEncontrada = false;

            snapshot.forEach(empresaSnapshot => {
                var empresaData = empresaSnapshot.val();
                var empresaId = empresaSnapshot.key;

                // Verifique se o email da empresa é igual ao email do usuário autenticado
                if (empresaData.Email === userEmail) {
                    console.log("Empresa encontrada - ID:", empresaId);
                    console.log("Dados da empresa:", empresaData);

                    // Criar um contêiner para os dados da empresa
                    const DadosContainerElement = document.createElement("div");
                    document.body.appendChild(DadosContainerElement);

                    // Criar elementos para cada dado da empresa
                    const nomeElement = document.createElement("p");
                    const areaAtuacaoElement = document.createElement("p");
                    const cnpjElement = document.createElement("p");
                    const descricaoElement = document.createElement("p");
                    const emailElement = document.createElement("p");

                    // Preencher os elementos com os dados da empresa
                    nomeElement.textContent = "Nome: " + empresaData.Nome;
                    areaAtuacaoElement.textContent = "Área de Atuação: " + empresaData.AreaAtuacao;
                    cnpjElement.textContent = "CNPJ: " + empresaData.CNPJ;
                    descricaoElement.textContent = "Descrição: " + empresaData.Descricao;
                    emailElement.textContent = "Email: " + empresaData.Email;

                    // Adicionar outros campos aqui

                    // Adicionar os elementos ao contêiner
                    DadosContainerElement.appendChild(nomeElement);
                    DadosContainerElement.appendChild(areaAtuacaoElement);
                    DadosContainerElement.appendChild(cnpjElement);
                    DadosContainerElement.appendChild(descricaoElement);
                    DadosContainerElement.appendChild(emailElement);

                    // Adicionar botão de edição
                    const editarButton = document.createElement("button");
                    editarButton.textContent = "Editar";
                    editarButton.addEventListener("click", () => habilitarEdicao(empresaData, DadosContainerElement));
                    DadosContainerElement.appendChild(editarButton);

                    empresaEncontrada = true;
                    return;
                }
            });

            // Se não encontrou a empresa, imprima a mensagem
            if (!empresaEncontrada) {
                console.log("Empresa não encontrada para o usuário com o email:", userEmail);
            }
        }).catch(error => {
            console.error("Erro ao obter dados do banco de dados:", error);
        });
    }
});

function habilitarEdicao(empresaData, DadosContainerElement) {
    console.log(empresaData)
    // Desabilitar o botão de edição
    const editarButton = DadosContainerElement.querySelector("button");
    editarButton.disabled = true;

    // Criar elementos de input para cada campo
    const nomeInput = criarInput("text", "Nome", empresaData.Nome);
    const areaAtuacaoInput = criarInput("text", "Área de Atuação", empresaData.AreaAtuacao);
    const cnpjInput = criarInput("text", "CNPJ", empresaData.CNPJ);
    const descricaoInput = criarInput("text", "Descrição", empresaData.Descricao);
    const emailInput = criarInput("email", "Email", empresaData.Email);

    // Adicionar elementos de input ao contêiner
    DadosContainerElement.innerHTML = ""; // Limpar o conteúdo atual
    DadosContainerElement.appendChild(nomeInput);
    DadosContainerElement.appendChild(areaAtuacaoInput);
    DadosContainerElement.appendChild(cnpjInput);
    DadosContainerElement.appendChild(descricaoInput);
    DadosContainerElement.appendChild(emailInput);

    // Adicionar botão de salvar
    const salvarButton = document.createElement("button");
    salvarButton.textContent = "Salvar";
    salvarButton.addEventListener("click", () => salvarEdicao(empresaData, DadosContainerElement));
    DadosContainerElement.appendChild(salvarButton);
}

function criarInput(type, label, valor) {
    const input = document.createElement("input");
    input.type = type;
    input.value = valor;

    const labelElement = document.createElement("label");
    labelElement.textContent = label + ": ";
    labelElement.appendChild(input);

    return labelElement;
}

function salvarEdicao(empresaData, DadosContainerElement) {
    // Obter os novos valores dos campos de input
    const novoNome = DadosContainerElement.querySelector('input[name="Nome"]').value;
    const novaAreaAtuacao = DadosContainerElement.querySelector('input[name="Área de Atuação"]').value;
    const novoCNPJ = DadosContainerElement.querySelector('input[name="CNPJ"]').value;
    const novaDescricao = DadosContainerElement.querySelector('input[name="Descrição"]').value;
    const novoEmail = DadosContainerElement.querySelector('input[name="Email"]').value;

    // Verificar se algum valor foi alterado
    if (
        novoNome !== empresaData.Nome ||
        novaAreaAtuacao !== empresaData.AreaAtuacao ||
        novoCNPJ !== empresaData.CNPJ ||
        novaDescricao !== empresaData.Descricao ||
        novoEmail !== empresaData.Email
    ) {
        // Atualizar os dados no banco de dados (você precisa implementar a lógica para isso)
        // ...

        // Atualizar a página após salvar
        location.reload();
    } else {
        // Se nenhum valor foi alterado, exibir uma mensagem ou tomar outra ação se necessário
        console.log("Nenhum valor foi alterado.");
    }
}
