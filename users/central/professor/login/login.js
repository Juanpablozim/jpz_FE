const usersDB = 'FEteachers';
const lastLogin = 'FELastLogin';
const loginstr = "../users.html";

function leDados() {
    let strDados = localStorage.getItem(usersDB);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = {
            usuarios: [
                { id: 1, email: "gabriel@gmail.com", nome: "Gabriel", sobrenome: "Quaresma", senha: "Gabriel10" },
                { id: 2, email: "address@email.domain", nome: "Óscar", sobrenome: "da Silva Oliveira", senha: "Senha123" }
            ]
        }
    }

    return objDados;
}

function logar(userid) {
    let objDados = {};

    objDados = {
        login: [
            { id: userid, horario: Date.now(), tipo: 1 }
        ]
    }

    localStorage.setItem(lastLogin, JSON.stringify(objDados));

    validate();
}


function validate() {
    let strDados = localStorage.getItem(lastLogin);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
        if (objDados.login[0].tipo === 1) {

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

function logado() {
    if (validate()) {
        window.location = loginstr;
    }
}

function login() {
    let users = leDados();
    let email = document.getElementById('email').value;
    let senha = document.getElementById('password').value;

    for (let i = 0; i < users.usuarios.length; i++) {
        if (users.usuarios[i].email === email && users.usuarios[i].senha === senha) {
            logar(users.usuarios[i].id);
            window.location = loginstr;
            return;
        }
    }

    alert('Email ou senha inválidos.');
}

document.addEventListener('DOMContentLoaded', function () {
    // Selecionar o botão de login pelo ID
    let btnLogin = document.getElementById('btn-submit');

    // Vincular o evento de clique ao botão de login
    btnLogin.addEventListener('click', function (e) {
        e.preventDefault();
        login();
    });
});
