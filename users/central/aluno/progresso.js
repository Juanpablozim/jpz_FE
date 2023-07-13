  function preencheNotas() {
    let materias = lebancodeDados("dadosMaterias");

    if (materias) {
        let divtxt;
        for (let i = 0; i < materias.length; i++) {
            const coisas = materias[i];

            if (coisas.userid === ultimoLogin) {
                if (coisas.nivel) {
                    divtxt = document.getElementById(coisas.nivel);
                    if(coisas.nivel == "superior"){
                        divtxt.innerHTML += `<div class="notamateria"><div class="anomateria">Periodo:${coisas.modulo}</div><div class="materia">${coisas.materia}</div><div class="nota">${coisas.nota}</div><div class="barra-progresso" width=""></div>`;
                    } else if ( coisas.nivel == "pos") {
                        divtxt.innerHTML += `<div class="notamateria"><div class="materia">${coisas.materia}</div>${coisas.nota}</div>`;
                    } else {
                        divtxt.innerHTML += `<div class="notamateria"><div class="anomateria">Ano:${coisas.modulo}</div><div class="materia">${coisas.materia}</div><div class="nota">${coisas.nota}</div></div>`;
                    }
                }
            }
        }
    }
}