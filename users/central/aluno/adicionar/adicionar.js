let contadorMaterias = 1;
const dadosMaterias = [];

function novaMateria() {
    const divNotas = document.getElementById("notas");
    const novaMateriaDiv = document.createElement("div");
    novaMateriaDiv.id = "materianova_" + contadorMaterias;
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

    dadosMaterias.length = 0; // Limpa o array de dados

    for (let i = 0; i < materias.length; i++) {
        const materia = materias[i].value;
        const nota = notas[i].value;

        const dadosMateria = {
            materia: materia,
            nota: nota
        };

        dadosMaterias.push(dadosMateria);
    }

    localStorage.setItem("dadosMaterias", JSON.stringify(dadosMaterias));
    location.reload();
}

const incluirMateriaButton = document.getElementById("incluirMateria");
incluirMateriaButton.addEventListener("click", novaMateria);

const salvarButton = document.createElement("button");
salvarButton.innerText = "Salvar";
salvarButton.addEventListener("click", salvarDados);

const form = document.getElementsByClassName("form")[0];
form.appendChild(salvarButton);
