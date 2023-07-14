const dbMaterias = "FENiveisL";
let contadorMaterias = 1;
const dadosMaterias = [];

function salvarDados() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        const materia = checkbox.id;
        const isChecked = checkbox.checked;

        let dadosMateria = {
            userid: ultimoLogin,
            materia: materia,
            checked: isChecked,
        };

        const index = dadosMaterias.findIndex(
            (data) => data.userid === ultimoLogin && data.materia === materia
        );

        if (index !== -1) {
            dadosMaterias.splice(index, 1); // Remove existing data
        }

        dadosMaterias.push(dadosMateria); // Add new data
    });

    localStorage.setItem(dbMaterias, JSON.stringify(dadosMaterias));

    window.location = "../../users.html";
}




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
        window.location = "../../../central.html";
    }
}