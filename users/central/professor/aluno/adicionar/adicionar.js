const dbMaterias = "dadosMaterias";
let contadorMaterias = 1;
const dadosMaterias = [];

function novaMateria() {
    const divNotas = document.getElementById("notas");
    const novaMateriaDiv = document.createElement("div");
    novaMateriaDiv.id = "materianova_" + contadorMaterias;
    novaMateriaDiv.classList += "materianova";
    novaMateriaDiv.innerHTML = `
    <label class="inputLabel" for="materia_${contadorMaterias}">Materia:</label>
    <input class="materia" type="text" id="materia_${contadorMaterias}" name="materia_${contadorMaterias}" placeholder="Matematica" required>

    <label class="inputLabel" for="nota_${contadorMaterias}">Nota:</label>
    <input class="nota" type="text" id="nota_${contadorMaterias}" name="nota_${contadorMaterias}" placeholder="0" required>
  `;

    const incluirMateriaButton = document.createElement("button");
    incluirMateriaButton.className = "incluirMateria";
    incluirMateriaButton.innerText = "+";
    incluirMateriaButton.addEventListener("click", novaMateria);
    novaMateriaDiv.appendChild(incluirMateriaButton);
    const excluirMateriaButton = document.createElement("button");
    excluirMateriaButton.className = "excluirMateria";
    excluirMateriaButton.innerText = "-";
    excluirMateriaButton.addEventListener("click", excluirMateria);
    novaMateriaDiv.appendChild(excluirMateriaButton);

    divNotas.appendChild(novaMateriaDiv);

    contadorMaterias++;
}

function excluirMateria() {
    const materiaDiv = this.parentNode;
    const divNotas = document.getElementById("notas");
    divNotas.removeChild(materiaDiv);
}

function salvarDados() {
    const materias = document.getElementsByClassName("materia");
    const notas = document.getElementsByClassName("nota");

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i].value;
        const nota = notas[i].value;
        let dadosMateria = {};

        if(document.getElementsByName("nivel")[0].value != 'pos'){
            dadosMateria = {
                nivel: document.getElementsByName("nivel")[0].value,
                modulo: document.getElementsByName("moduloatual")[0].value,
                userid: ultimoLogin,
                materia: materia,
                nota: nota
            };
        }else{
            dadosMateria = {
                nivel: document.getElementsByName("nivel")[0].value,
                userid: ultimoLogin,
                materia: materia,
                nota: nota
            };
        }

        dadosMaterias.push(dadosMateria);
    }

    const dadosSalvos = localStorage.getItem(dbMaterias);
    let dadosMateriasAntigos = [];

    if (dadosSalvos) {
        dadosMateriasAntigos = JSON.parse(dadosSalvos);
    }

    const dadosAtualizados = dadosMateriasAntigos.concat(dadosMaterias);
    localStorage.setItem("dadosMaterias", JSON.stringify(dadosAtualizados));

    window.location = "../users.html";
}

const incluirMateriaButton = document.getElementById("incluirMateria");
incluirMateriaButton.addEventListener("click", novaMateria);

const salvarButton = document.createElement("button");
salvarButton.classList += "salvarBTN";
salvarButton.innerText = "Salvar";
salvarButton.addEventListener("click", salvarDados);

const form = document.getElementsByClassName("form")[0];
form.appendChild(salvarButton);

gerarCaixasSelecao(); // Chamada da função para gerar as caixas de seleção inicialmente


const lastLogin = 'FELastLogin';
const usersDB = 'FEusers';

/*
  LOGIN
*/
let logado = false;
let users;
let ultimoLogin;

function validate() {
    let strDados = localStorage.getItem(lastLogin);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
        ultimoLogin = objDados.login[0].id;

        if (Date.now() - objDados.login[0].horario < 1800000) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function leUsuarios() {
    let strDados = localStorage.getItem(usersDB);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            usuarios: [
                { email: "gabriel@gmail.com", nome: "Gabriel", sobrenome: "Quaresma", senha: "Gabriel10" }
            ]
        };
    }

    return objDados;
}

function UserLogado() {
    users = leUsuarios();

    if (!validate()) {
        window.location = "../../central.html";
    }
}

/*
    Seleção
*/

function gerarCaixasSelecao() {
    const nivelSelect = document.getElementsByName("nivel")[0];
    const moduloDiv = document.getElementById("modulo");

    // Clear the content of the modulo div
    moduloDiv.innerHTML = "";

    // Verificar o valor selecionado na select de nome nivel
    const nivelSelecionado = nivelSelect.value;

    if (nivelSelecionado === "fundamental") {
        // Gerar caixa de seleção de Ano para o nível Fundamental
        const anoSelect = document.createElement("select");
        anoSelect.name = "moduloatual";
        anoSelect.classList.add("moduloatual");
        const labelAno = document.createElement("label");
        labelAno.innerHTML = "Ano:";
        labelAno.appendChild(anoSelect);

        // Adicionar opções de 1 a 9 na caixa de seleção de Ano
        for (let i = 1; i <= 9; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.text = i;
            anoSelect.appendChild(option);
        }

        moduloDiv.appendChild(labelAno);
    } else if (nivelSelecionado === "superior") {
        // Gerar caixa de seleção de Período para o nível Superior
        const periodoSelect = document.createElement("select");
        periodoSelect.name = "moduloatual";
        periodoSelect.classList.add("moduloatual");
        const labelPeriodo = document.createElement("label");
        labelPeriodo.innerHTML = "Período:";
        labelPeriodo.appendChild(periodoSelect);

        // Adicionar opções de 1 a 12 na caixa de seleção de Período
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.text = i;
            periodoSelect.appendChild(option);
        }

        moduloDiv.appendChild(labelPeriodo);
    } else if (nivelSelecionado === "medio") {
        // Gerar caixa de seleção de Ano para o nível Médio
        const anoSelect = document.createElement("select");
        anoSelect.name = "moduloatual";
        anoSelect.classList.add("moduloatual");
        const labelAno = document.createElement("label");
        labelAno.innerHTML = "Ano:";
        labelAno.appendChild(anoSelect);

        // Adicionar opções de 1 a 3 na caixa de seleção de Ano
        for (let i = 1; i <= 3; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.text = i;
            anoSelect.appendChild(option);
        }

        moduloDiv.appendChild(labelAno);
    }
}





// Chamar a função gerarCaixasSelecao quando a opção selecionada na select de nome nivel for alterada
const nivelSelect = document.getElementsByName("nivel")[0];
nivelSelect.addEventListener("change", gerarCaixasSelecao);
