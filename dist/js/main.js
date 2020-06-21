// Forms
const form = document.querySelector('.form');
const formBoxes = document.querySelectorAll('.form__box');
const formLogin = document.querySelector('.form__login');
const formRegister = document.querySelector('.form__register');

// Input fields
const username = document.getElementById('username');
const password = document.getElementById('password');
const regUsername = document.getElementById('regUsername');
const email = document.getElementById('email');
const regPassword = document.getElementById('regPassword');
const confirmPassword = document.getElementById('confirmPassword');

// Button
const loginBtn = document.querySelector('#login');
const registerBtn = document.querySelector('#register');

// Toggle login/register forms
loginBtn.addEventListener('click', () => {
  form.classList.remove('form--register');
});

registerBtn.addEventListener('click', () => {
  form.classList.add('form--register');
});

// Floating labels
formBoxes.forEach((box) => {
  const inputs = box.querySelector('.form__input');
  const labels = box.querySelector('.form__label');
  const eyes = box.querySelector('.form__eye');

  inputFields(inputs, labels);
  togglePassword(inputs, eyes);
});

function inputFields(input, label) {
  input.addEventListener('focus', () => {
    label.classList.add('form__label--focus');
  });
  input.addEventListener('blur', () => {
    if (!input.value) {
      label.classList.remove('form__label--focus');
    }
  });
}

// Toggling password fields
function togglePassword(input, eye) {
  if (eye !== null) {
    eye.addEventListener('click', () => {
      if (input.type === 'password') {
        eye.innerText = 'visibility_off';
        input.setAttribute('type', 'text');
      } else {
        eye.innerText = 'visibility';
        input.setAttribute('type', 'password');
      }
    });
  }
}

// Form submit
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validLoginUS() && validLoginPW()) {
    setTimeout(() => {
      reset();
    }, 2000);
  }
});

formRegister.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    validRegisterUS() &&
    validRegisterEmail() &&
    validRegisterPW() &&
    validRegisterCPW()
  ) {
    setTimeout(() => {
      reset();
    }, 2000);
  }
});

// Validation functions
function validLoginUS() {
  if (fieldEmpty(username)) return;
  if (matchDB(username)) return;
  return true;
}

function validLoginPW() {
  if (fieldEmpty(password)) return;
  if (matchDB(password)) return;
  return true;
}

function validRegisterUS() {
  if (fieldEmpty(regUsername)) return;
  if (checkChar(regUsername, 2)) return;
  return true;
}

function validRegisterEmail() {
  if (fieldEmpty(email)) return;
  if (checkChar(email, 4)) return;
  return true;
}

function validRegisterPW() {
  if (fieldEmpty(regPassword)) return;
  if (checkChar(regPassword, 3)) return;
  return true;
}

function validRegisterCPW() {
  if (fieldEmpty(confirmPassword)) return;
  if (matchPassword(confirmPassword)) return;
  return true;
}

function setInvalid(input, message) {
  const box = input.parentElement;
  const error = box.querySelector('.form__icon--error');
  const span = box.querySelector('.form__message');

  input.classList.remove('form__input--valid');
  input.focus();
  error.innerText = 'error_outline';
  span.innerHTML = message;
}

function setValid(input) {
  const box = input.parentElement;
  const error = box.querySelector('.form__icon--error');
  const span = box.querySelector('.form__message');

  input.classList.add('form__input--valid');
  error.innerText = null;
  span.innerHTML = null;
}

// Helper functions
function fieldEmpty(input) {
  const value = input.value.trim();
  if (!value) {
    input.value = null;
    setInvalid(input, `${input.name} is empty`);
    return true;
  }
}

function matchDB(input) {
  if (input.value !== 'gridsequence') {
    input.value = null;
    setInvalid(input, `${input.name} is incorrect`);
    return true;
  } else if (input.value === 'gridsequence') {
    setValid(input);
    return false;
  }
}

function matchPassword(input) {
  if (regPassword.value !== input.value) {
    setInvalid(input, `${regPassword.name} does not match`);
    return true;
  } else {
    setValid(input);
    return false;
  }
}

function regexMatch(regEx, input, message) {
  if (input.value.match(regEx)) {
    setValid(input);
    return false;
  } else {
    setInvalid(input, message);
    return true;
  }
}

function checkChar(input, level) {
  let regEx;
  switch (level) {
    case 1:
      // 1 = a A
      regEx = /(^(?=.{4,16}$)(?=.+[a-zA-Z])[a-zA-Z]+$)/;
      return regexMatch(
        regEx,
        input,
        '<b>MUST CONTAIN:</b> <br> 4-16 characters <br> Uppercase or lowercase letters <br> No whitespace'
      );
    case 2:
      // 2 = a A 1 _ -
      regEx = /(^(?=.{4,16}$)(?!.*[-_]{2})(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9-_]+$)/;
      return regexMatch(
        regEx,
        input,
        '<b>MUST CONTAIN:</b> <br> 4-16 characters <br> Uppercase & lowercase letters <br> No whitespace <br> Optional: numbers, 1 hyphen & 1 underscore'
      );
    case 3:
      // 3 = A a 1 !
      regEx = /(^(?=.{8,32}$)(?!.*[\s])(?!.*[\W-_]{2})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_])[a-zA-Z0-9\W_]+$)/;
      return regexMatch(
        regEx,
        input,
        '<b>MUST CONTAIN:</b> <br> 8-32 characters <br> Uppercase & lowercase letters <br> Numbers <br> 1 symbols <br> no whitespace <br> Note: 1 symbol character after each letter'
      );
    case 4:
      // 4 = some@some.co or some@some.co.uk
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexMatch(
        regEx,
        input,
        `<b>VALID EMAIL EXAMPLES:</b> steve@gs.co | deep@gs.com | john@gs.co.uk`
      );
    default:
      return false;
  }
}

function reset() {
  formBoxes.forEach((box) => {
    const inputs = box.querySelector('.form__input');
    const labels = box.querySelector('.form__label');
    const eyes = box.querySelector('.form__eye');
    const errors = box.querySelector('.form__icon--error');
    const spans = box.querySelector('.form__message');

    inputs.value = '';
    inputs.blur();
    errors.innerText = '';
    spans.innerHTML = '';
    labels.classList.remove('form__label--focus');
    inputs.classList.remove('form__input--valid');

    if (eyes !== null) {
      eyes.innerText = 'visibility';
    }

    if (
      inputs.type === 'text' &&
      inputs.id !== 'username' &&
      inputs.id !== 'regUsername'
    ) {
      inputs.setAttribute('type', 'password');
    }
  });
}
