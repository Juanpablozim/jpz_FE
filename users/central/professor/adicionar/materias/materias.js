const dbMaterias = "FElecionadas";
let contadorMaterias = 1;
const dadosMaterias = [];

function novaMateria() {
    const divNotas = document.getElementById("materia");
    const novaMateriaDiv = document.createElement("div");
    novaMateriaDiv.id = "materianova_" + contadorMaterias;
    novaMateriaDiv.classList += "materianova";
    novaMateriaDiv.innerHTML = `
    <label class="inputLabel" for="materia_${contadorMaterias}">Materia:</label>
    <input class="materia" type="text" id="materia_${contadorMaterias}" name="materia_${contadorMaterias}" placeholder="Matematica" required>`;

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
    const divNotas = document.getElementById("materia");
    divNotas.removeChild(materiaDiv);
}

function salvarDados() {
    const materias = document.getElementsByClassName("materia");

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i].value;
        let dadosMateria = {};
            dadosMateria = {
                userid: ultimoLogin,
                materia: materia,
            };

        dadosMaterias.push(dadosMateria);
    }

    const dadosSalvos = localStorage.getItem(dbMaterias);
    let dadosMateriasAntigos = [];

    if (dadosSalvos) {
        dadosMateriasAntigos = JSON.parse(dadosSalvos);
    }

    const dadosAtualizados = dadosMateriasAntigos.concat(dadosMaterias);
    localStorage.setItem(dbMaterias, JSON.stringify(dadosAtualizados));

    window.location = "../../users.html";
}

const incluirMateriaButton = document.getElementById("incluirMateria");
incluirMateriaButton.addEventListener("click", novaMateria);

const salvarButton = document.createElement("button");
salvarButton.classList += "salvarBTN";
salvarButton.innerText = "Salvar";
salvarButton.addEventListener("click", salvarDados);

const form = document.getElementsByClassName("form")[0];
form.appendChild(salvarButton);

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
        if (objDados.login[0].tipo === 1) {
            ultimoLogin = objDados.login[0].id;

            if ((Date.now() - objDados.login[0].horario) < 1800000) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
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