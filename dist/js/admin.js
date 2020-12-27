let buttonLogin = document.getElementById('login__btn');
let modalWindow = document.querySelector('.modal__window');
let buttonClose = document.getElementById('close_btn');

buttonLogin.addEventListener('click', () => {
    modalWindow.classList.toggle("modal__window--active");
});

buttonClose.addEventListener('click', () => {
    modalWindow.classList.toggle("modal__window--active");
});

window.addEventListener('click', (e) => {
    if(e.target == modalWindow){
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
});;
const NULL_TEXT_ERROR = "Введите текст новости";
const IMAGE_FORMAT_ERROR = 'Неверный формат изображения';
const TEXTAREA_LIMIT_ERROR = 'Превышен лимит символов';

let textareaInput = document.querySelector('.add__textarea');
let textareaInfo = document.querySelector('.add__form-textarea-info');
let errorBlock = document.querySelector('.form__add__error');
let submitButton = document.querySelector('.form__add-btn');
let addImgBtn = document.querySelector('.form__add-img');

function checkTextareaLenght(){
    if(textareaInput.value.length != 0){
        textareaInfo.classList.add('add__form-textarea-info--active');
        addImgBtn.style = 'margin-top: 6px;';
    }else{
        textareaInfo.classList.remove('add__form-textarea-info--active');
        addImgBtn.style = 'margin-top: 21px;';
    }
}

textareaInput.onkeyup = () => {
    checkTextareaLenght();
    textareaInfo.innerHTML = `Символов: ${textareaInput.value.length}/150`
    if(textareaInput.value.length > 150){
        textareaInfo.innerHTML = `Символов: <span class="highlight">${textareaInput.value.length}</span>/150`;
        errorBlock.innerHTML = TEXTAREA_LIMIT_ERROR;
    }else{
        dropError();
    }
};

let uploadInput = document.getElementById('upload_image_input');
let dropImage = document.querySelector('.form__add__uploaded-img_close-btn');
let addForm = document.querySelector('.add__form');

let uploadedImage = {
    container: document.querySelector('.form__add__uploaded-img__container'),
    icon: document.querySelector('.form__add__uploaded-img-icon'),
    name: document.querySelector('.form__add__uploaded-img-name')
};

let fileReader = new FileReader();
let image = new Image();

let imageData = {
    url: null,
    fileName: null
};

uploadInput.addEventListener('change', () => {
    let file = uploadInput.files[0];

    if(file.type && file.type.search("image/+(jpeg|png)") != -1){
        fileReader.readAsDataURL(file);
        imageData.fileName = file.name;
        dropError();
        if(file.name.length > 20){
            imageData.fileName = imageData.filename.slice(0, 20) + "..." + file.type.match("jpeg|png");
        }
    }else{
        errorBlock.innerHTML = IMAGE_FORMAT_ERROR;
    }
});

fileReader.addEventListener('load', (e) => {
    let url = e.target.result;
    image.src = url;
    imageData.url = url;
});

let displayUploadedImage = () => {
    uploadedImage.container.classList.toggle('form__add__uploaded-img__container--active');
    uploadedImage.icon.src = imageData.url;
    uploadedImage.name.innerHTML = imageData.fileName;
};

image.addEventListener('load', function() {
    let width = this.width;
    let height = this.height;

    if (width && height && width <= 270 && height <= 270) {
        displayUploadedImage();
        dropError();
    }else{
        errorBlock.innerHTML = IMAGE_FORMAT_ERROR;
        removeImage();
    }
});

dropImage.addEventListener('click', (e) => {
    e.preventDefault();
    uploadedImage.container.classList.toggle('form__add__uploaded-img__container--active');
    removeImage(); 
});

submitButton.addEventListener('click', (e) => {
    if(textareaInput.value.length === 0){
        errorBlock.innerHTML = NULL_TEXT_ERROR;
    }else{
        dropError();
        addForm.submit();
    }
});

function removeImage(){
    uploadInput.value = null;
    imageData.fileName = null;
    imageData.url = null;
}

function dropError(){
    errorBlock.innerHTML = '';
}

/*
const scrollbar = document.getElementById('scroll-style');
let content = document.querySelector('.add__textarea');

scrollbar.addEventListener('scroll', () => {
    content.scrollTop();
});*/;