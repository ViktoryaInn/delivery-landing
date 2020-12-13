//alert('hello..');;
let buttonLogin = document.getElementById('login__btn');
let modalWindow = document.querySelector('.modal__window');
let buttonClose = document.getElementById('close_btn');

buttonLogin.addEventListener('click', () => {
    console.log("something");
    modalWindow.classList.toggle("modal__window--active");
});

buttonClose.addEventListener('click', () => {
    console.log("close");
    modalWindow.classList.toggle("modal__window--active");
});

window.addEventListener('click', (e) => {
    if(e.target == modalWindow){
        modalWindow.classList.toggle("modal__window--active");
    }
});

// buttonLogin.onClick = function(){
//     console.log("something");
// };;
const NULL_TEXT_ERROR = "Введите текст новости";
const IMAGE_FORMAT_ERROR = 'Неверный формат изображения';
const TEXTAREA_LIMIT_ERROR = 'Превышен лимит символов';

let textareaInput = document.querySelector('.add__textarea');
let textareaInfo = document.querySelector('.add__form-textarea-info');
let errorBlock = document.querySelector('.form__add__error');
let submitButton = document.querySelector('.form__add-btn');

textareaInput.onkeyup = () => {
    textareaInfo.innerHTML = 'Символов: ' + textareaInput.value.length + '/150';
    if(textareaInput.value.length > 150){
        textareaInfo.innerHTML = 'Символов: ' + '<span class="highlight">' + 
        textareaInput.value.length + '</span>' + '/150';
        errorBlock.innerHTML = TEXTAREA_LIMIT_ERROR;
    }else{
        dropError();
    }
};



let uploadInput = document.getElementById('upload_image_input');
let dropImage = document.querySelector('.form__add__uploaded-img_close-btn');

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
    console.log("change");
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
    console.log("load1");
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
    console.log("load2");
    let width = this.width;
    let height = this.height;

    if (width && height && width <= 270 && height <= 270) {
        displayUploadedImage();
        dropError();
    }else{
        errorBlock.innerHTML = IMAGE_FORMAT_ERROR;
    }
});

dropImage.addEventListener('click', (e) => {
    e.preventDefault();
    uploadedImage.container.classList.toggle('form__add__uploaded-img__container--active');
    uploadInput.value = null;
    imageData.fileName = null;
    imageData.url = null;
});

submitButton.addEventListener('click', (e) => {
    if(textareaInput.value.length < 1){
        e.preventDefault();
        errorBlock.innerHTML = NULL_TEXT_ERROR;
    }else{
        dropError();
    }
});

function dropError(){
    errorBlock.innerHTML = '';
}
/*
const scrollbar = document.getElementById('scroll-style');
let content = document.querySelector('.add__textarea');

scrollbar.addEventListener('scroll', () => {
    content.scrollTop();
});*/;