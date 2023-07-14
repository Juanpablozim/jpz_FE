const lastLogin = 'FELastLogin';

function validateStudent(  ) {
    let strDados = localStorage.getItem(lastLogin);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);

        if ( objDados.login[0].tipo === 0 ) {
            ultimoLogin = objDados.login[0].id;

            if ((Date.now() - objDados.login[0].horario) < 1800000) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }else{
        return false;
    }
}

function validateTeacher(  ) {
    let strDados = localStorage.getItem(lastLogin);
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);

        if ( objDados.login[0].tipo === 1 ) {
            ultimoLogin = objDados.login[0].id;

            if ((Date.now() - objDados.login[0].horario) < 1800000) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }else{
        return false;
    }
}

function redirecionar(){
    if( validateStudent() ){
        window.location = "aluno/users.html";
    }else if ( validateTeacher() ){
        window.location = "professor/users.html";
    }else {
        window.location = "aluno/login/login.html";
    }
}