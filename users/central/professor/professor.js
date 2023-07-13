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
    window.location = "login/login.html";
}

document.getElementById("btnlogoff").addEventListener("click", logoff);

function printData() {
    let divnome = document.getElementById('nome');
    let divemail = document.getElementById('email');

    divnome.innerHTML = `${users.usuarios[ultimoLogin - 1].nome} ${users.usuarios[ultimoLogin - 1].sobrenome}`;
    divemail.innerHTML = `${users.usuarios[ultimoLogin - 1].email}`;
    // UserLogado();
}

function UserLogado() {
    users = leUsuarios();

    if (!validate()) {
        window.location = "../central.html";
    } else {
        printData();
        preencheNotas()
    }

}