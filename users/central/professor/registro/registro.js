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

let errorMessage = '';

class Validator {

  constructor() {
    this.validations = [
      'data-min-length',
      'data-max-length',
      'data-only-letters',
      'data-email-validate',
      'data-required',
      'data-equal',
      'data-password-validate',
    ]
  }

  // inicia a validação de todos os campos
  validate(form) {
    errorMessage = '';
    // limpa todas as validações antigas
    let currentValidations = document.querySelectorAll('form .error-validation');

    if (currentValidations.length) {
      this.cleanValidations(currentValidations);
    }

    // pegar todos inputs
    let inputs = form.getElementsByTagName('input');
    // transformar HTMLCollection em arr
    let inputsArray = [...inputs];

    // loop nos inputs e validação mediante aos atributos encontrados
    inputsArray.forEach(function (input, obj) {

      // fazer validação de acordo com o atributo do input
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {

          // limpa string para saber o método
          let method = this.validations[i].replace("data-", "").replace("-", "");

          // valor do input
          let value = input.getAttribute(this.validations[i])

          // invoca o método
          this[method](input, value);

        }
      }

    }, this);

  }

  // método para validar se tem um mínimo de caracteres
  minlength(input, minValue) {

    let inputLength = input.value.length;



    if (inputLength < minValue) {
      errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar se passou do máximo de caracteres
  maxlength(input, maxValue) {

    let inputLength = input.value.length;



    if (inputLength > maxValue) {
      errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar strings que só contem letras
  onlyletters(input) {

    let re = /^[A-Za-z]+$/;;

    let inputValue = input.value;



    if (!re.test(inputValue)) {
      errorMessage = `Este campo não aceita números nem caracteres especiais`;
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar e-mail
  emailvalidate(input) {
    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let strDados = leDados();


    if (!re.test(email)) {
      errorMessage = `Insira um e-mail no padrão aleatorio@email.com`;
      this.printMessage(input, errorMessage);
    }

    for (var i = 0; i < strDados.usuarios.length; i++) {
      if (email === strDados.usuarios[i].email) {
        errorMessage = `Esse email já esta cadastrado`;
        this.printMessage(input, errorMessage);
      }
    }
  }

  // verificar se um campo está igual o outro
  equal(input, inputName) {

    let inputToCompare = document.getElementsByName(inputName)[0];



    if (input.value != inputToCompare.value) {
      errorMessage = `Este campo precisa estar igual a senha`;
      this.printMessage(input, errorMessage);
    }
  }

  // método para exibir inputs que são necessários
  required(input) {

    let inputValue = input.value;

    if (inputValue === '') {
      errorMessage = `Este campo é obrigatório`;

      this.printMessage(input, errorMessage);
    }

  }

  // validando o campo de senha
  passwordvalidate(input) {

    // explodir string em array
    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for (let i = 0; charArr.length > i; i++) {
      if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
        uppercases++;
      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }

    if (uppercases === 0 || numbers === 0) {
      errorMessage = `A senha precisa um caractere maiúsculo e um número`;

      this.printMessage(input, errorMessage);
    }

  }

  // método para imprimir mensagens de erro
  printMessage(input, msg) {

    // checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector('.error-validation');

    // imprimir erro só se não tiver erros
    if (errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg;

      let inputParent = input.parentNode;

      template.classList.remove('template');

      inputParent.appendChild(template);
    }

  }

  // remove todas as validações para fazer a checagem novamente
  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }

}

function salvaDados(dados) {
  localStorage.setItem(usersDB, JSON.stringify(dados));
}

function incluirUsuario() {
  // Ler os dados do localStorage
  let objDados = leDados();

  // Incluir um novo contato
  let strEmail = document.getElementById('email').value;
  let strNome = document.getElementById('name').value;
  let strSobrenome = document.getElementById('lastname').value;

  //calculo de novo id
  let idvalue = objDados.usuarios[(objDados.usuarios.length - 1)].id + 1;

  let strSenha = document.getElementById('password').value;
  let novoUsuario = {
    id: idvalue,
    email: strEmail,
    nome: strNome,
    sobrenome: strSobrenome,
    senha: strSenha
  };
  objDados.usuarios.push(novoUsuario);

  // Salvar os dados no localStorage novamente
  salvaDados(objDados);
}

function ResetarOsFormularios(form) {
  let inputs = form.getElementsByTagName('input');
  let inputsArray = [...inputs];

  inputsArray.forEach(function (input) {
    if (input.type !== 'submit') {
      input.value = '';
    }
  });
}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function (e) {
  e.preventDefault();
  validator.validate(form);
  if (errorMessage.length === 0) {
    incluirUsuario();
    ResetarOsFormularios(form);
    window.location = "../login/login.html";
  }
});

function validate() {
  let strDados = localStorage.getItem(lastLogin);
  let objDados = {};

  if (strDados) {
    objDados = JSON.parse(strDados);
    if (objDados.login[0].tipo == 1) {

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