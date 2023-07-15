// BANCOS DE DADOS
const usersDB = 'FEteachers';
const lastLogin = 'FELastLogin';
const dbMaterias = 'FElecionadas';
const dbNiveis = 'FENiveisL';
const dbBIO = "FEbio";

/*
--------------------------------------------------------------------
NAVBAR 
--------------------------------------------------------------------
*/
const togglebtn = document.querySelector('.toggle_btn');
const togglebtnicon = document.querySelector('.toggle_btn i');
const dropdownmenu = document.querySelector('.dropdown_menu');

togglebtn.onclick = function () {
    dropdownmenu.classList.toggle('open');
    const isOpen = dropdownmenu.classList.contains('open');

    togglebtnicon.classList.toggle('fa-xmark', isOpen);
    togglebtnicon.classList.toggle('fa-bars', !isOpen);
};

window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.navbar').style.backgroundImage = 'none';
    const isOpen = dropdownmenu.classList.contains('open');
    if (isOpen) {
        dropdownmenu.classList.toggle('open');
        togglebtnicon.classList.toggle('fa-bars', isOpen);
    }
});

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY === 0) {
        navbar.style.backgroundImage = 'none';
    } else {
        navbar.style.backgroundImage = 'linear-gradient(to right, var(--cor-primaria), var(--cor-secundaria))';
    }
});

/*
-------------
    LOGIN
-------------
*/

function logoff() {
    localStorage.removeItem("FELastLogin");
    window.location = "./login/login.html";
}

document.getElementById("btnlogoff").addEventListener("click", logoff);

let ultimoLogin;

function printData() {
    let divnome = document.getElementById('name');
    let divemail = document.getElementById('email');

    divnome.innerHTML = `${users.usuarios[ultimoLogin - 1].nome} ${users.usuarios[ultimoLogin - 1].sobrenome}`;
    divemail.innerHTML = `${users.usuarios[ultimoLogin - 1].email}`;
}

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

function UserLogado() {
    users = leUsuarios();

    if (!validate()) {
        window.location = "../central.html";
    } else {
        printData();
        escreveBIO();
        preencheMaterias();
    }

}

/*
----------------------------------
    DADOS USUARIOS
----------------------------------
*/

function lebancodeDados(BancodeDados) {
    let strDados = localStorage.getItem(BancodeDados);
    let objDados = {};

    objDados = JSON.parse(strDados);

    return objDados;
}

function preencheMaterias() {
    let materias = lebancodeDados(dbMaterias);
    let niveis = lebancodeDados(dbNiveis);

    if (materias) {
        let divtxt = document.getElementById("materiaslecionadas");
        for (let i = 0; i < materias.length; i++) {
            const coisas = materias[i];
            if (coisas.userid === ultimoLogin) {
                const materiaElement = document.createElement("div");
                materiaElement.className = "materialecionada";
                materiaElement.textContent = getLevelName(coisas.materia);
                materiaElement.addEventListener("click", excluirMateria);
                divtxt.appendChild(materiaElement);
            }
        }
    }

    if (niveis) {
        let divniveis = document.getElementById("niveislecionados");
        for (let i = 0; i < niveis.length; i++) {
            const coisas = niveis[i];
            if (coisas.userid === ultimoLogin && coisas.checked === true) {
                divniveis.innerHTML += `<div class="nivellecionado">${getLevelName(
                    coisas.materia
                )}</div>`;
            }
        }
    }
}


function getLevelName(level) {
    switch (level) {
        case 'fundamental1':
            return 'Fundamental I';
        case 'fundamental2':
            return 'Fundamental II';
        case 'medio':
            return 'Médio';
        case 'graduacao':
            return 'Graduação';
        case 'posGraduacao':
            return 'Pós Graduação';
        default:
            return level;
    }
}

/* EXCLUIR MATERIA */

function excluirMateria(event) {
    const materia = event.target.textContent;
    const dadosSalvos = localStorage.getItem(dbMaterias);
    let dadosMateriasAntigos = [];

    if (dadosSalvos) {
        dadosMateriasAntigos = JSON.parse(dadosSalvos);
    }

    const dadosAtualizados = dadosMateriasAntigos.filter(
        (dadosMateria) => dadosMateria.materia !== materia
    );

    localStorage.setItem(dbMaterias, JSON.stringify(dadosAtualizados));

    event.target.remove();
}

function escreveBIO() {
    const bioDiv = document.getElementById("bio");

    const dadosSalvos = localStorage.getItem(dbBIO);
    if (dadosSalvos) {
        const dadosMaterias = JSON.parse(dadosSalvos);
        const usuarioLogadoBio = dadosMaterias.find(
            (dadosMateria) => dadosMateria.userid === ultimoLogin
        );

        if (usuarioLogadoBio && usuarioLogadoBio.bio) {
            bioDiv.innerHTML = `<a href="adicionar/bio/bio.html">${usuarioLogadoBio.bio} <i class="fa-solid fa-pencil"></i></a>`;
        }
    }
}

function escreveMateriasLecionadas() {
    const materiasLecionadas = document.getElementById("materiaslecionadas");

    materiasLecionadas.addEventListener("click", function (event) {
        if (event.target.classList.contains("materia")) {
            excluirMateria(event);
        }
    });
}

function EventoExcluirMateriasLecionadas () {
    const materiasLecionadas = document.getElementById("materiaslecionadas");

    materiasLecionadas.addEventListener("mouseover", function (event) {
        if (event.target.classList.contains("materialecionada")) {
            const originalText = event.target.innerHTML;
            event.target.addEventListener("mouseout", function () {
                event.target.innerHTML = originalText;
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    escreveMateriasLecionadas();
    EventoExcluirMateriasLecionadas ();
});

