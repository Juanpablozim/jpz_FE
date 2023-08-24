const teachersDB = 'FEteachers';

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
--------------------------------------------------------------------
PESQUISA
--------------------------------------------------------------------
*/

function printData() {
    // Obter os dados dos usuários do localStorage
    let teachers = leUsuarios();

    // Verificar se existem professores cadastrados
    if (teachers && teachers.length > 0) {
        // Obter os 10 últimos professores adicionados
        let lastTenTeachers = teachers.slice(-10);

        // Selecionar o elemento do HTML onde os cards serão adicionados
        let cardsContainer = document.querySelector('.cards');

        // Limpar o conteúdo atual do container
        cardsContainer.innerHTML = '';

        // Iterar sobre os 10 últimos professores
        for (let teacher of lastTenTeachers) {
            // Criar um novo elemento de card
            let card = document.createElement('a');
            card.href = '../professores/professor.html';
            card.classList.add('card');

            // Criar a estrutura do card usando o template HTML fornecido
            card.innerHTML = `
                <div class="img">
                    <img src="../imgs/thisisengineering-raeng-TXxiFuQLBKQ-unsplash_cut.jpg" alt="">
                </div>
                <div class="txts">
                    <div class="identificacao">
                        <div class="name">
                            ${teacher.nome} ${teacher.sobrenome} <!-- Substituir pelo nome do professor -->
                        </div>
                        <div class="avaliacao">
                            4,9 <i class="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div class="pontosfortes">
                        <h1>Pontos Fortes:</h1>
                        <div class="pontoforte">Matemática</div>
                        <div class="pontoforte">Português</div>
                        <div class="pontoforte">Química</div>
                    </div>
                    <div class="faixaatuacao">
                        <h1>Faixa de atuação:</h1>
                        <p>5º Fundamental - 3º Médio</p>
                    </div>
                </div>
            `;

            // Adicionar o card ao container
            cardsContainer.appendChild(card);
        }
    }
}


function leUsuarios() {
    let strDados = localStorage.getItem(teachersDB);
    let objDados = {};

    objDados = JSON.parse(strDados);

    return objDados;
}

function UserLogado() {
    let teachers = leUsuarios();

    if (teachers) {
        printData();
    }
}