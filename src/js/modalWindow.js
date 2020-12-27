let buttonLogin = document.getElementById('login__btn');
let modalWindow = document.querySelector('.modal__window');
let modalWrap = document.querySelector('.modal__wrap');
let buttonClose = document.getElementById('close_btn');

buttonLogin.addEventListener('click', () => {
    modalWindow.classList.toggle("modal__window--active");
});

buttonClose.addEventListener('click', () => {
    modalWindow.classList.toggle("modal__window--active");
});

window.addEventListener('click', (e) => {
    if(e.target == modalWindow && e.target != modalWrap){
        modalWindow.classList.toggle("modal__window--active");
    }
});

const INPUT_LOGIN_ERROR = "Введите действительный электронный адрес";
const INPUT_PASSWORD_ERROR = "Введите пароль";

let inputLogin = document.getElementById('modal-input-login');
let inputPassword = document.getElementById('modal-input-password');
let modalSubmitBtn = document.getElementById('modal-submit-button');
let loginError = document.getElementById('input-error-login');
let passwordError = document.getElementById('input-error-password');

function validateLogin(login){
    let re = /\S+@\S+\.\S+/;
    return re.test(login);
}

function validatePassword(password){
    let re = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/;
    return re.test(password);
}

function enableError(element, blockError, error){
    blockError.innerHTML = error;
    element.classList.add('input-highlight');
    modalSubmitBtn.classList.add('submit-disabled');
    modalSubmitBtn.disabled = true;
}

function disableError(element, blockError){
    blockError.innerHTML = '';
    element.classList.remove('input-highlight');
    modalSubmitBtn.classList.remove('submit-disabled');
    modalSubmitBtn.disabled = false;
}

inputLogin.addEventListener('blur', () => {
    if(validateLogin(inputLogin.value) && inputLogin.value.length > 0){
        disableError(inputLogin, loginError);
    }else{
        enableError(inputLogin, loginError, INPUT_LOGIN_ERROR);
    }
});

inputPassword.addEventListener('blur', () => {
    if(validatePassword(inputPassword.value) && inputPassword.value.length > 0){
        disableError(inputPassword, passwordError);
    }else{
        enableError(inputPassword, passwordError, INPUT_PASSWORD_ERROR);
    }
});