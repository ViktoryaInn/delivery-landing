//alert('hello..');

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
    console.log('pidoras');
}

function disableError(element, blockError){
    blockError.innerHTML = '';
    element.classList.remove('input-highlight');
    modalSubmitBtn.classList.remove('submit-disabled');
    modalSubmitBtn.disabled = false;
    console.log('none-pidoras');
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
/*
let slides = document.querySelectorAll('div.slider__item');
console.log(slides.length);

let currentSlide = 0;
let timerID;

window.onload = function(){
    showSlide(currentSlide);
    timerID = setInterval(() => showNextSlide(), 5000);
}

function showNextSlide(){
    console.log("next");
    if(currentSlide == slides.length - 1){
        showSlide(0);
    }else{
        showSlide(currentSlide + 1);
    }
}

function showSlide(index){
    currentSlide = index;
    for(let i = 0; i < slides.length; i++){
        if(i != currentSlide){
            slides[i].style = "display: none;"
        }else{
            slides[i].style = "display: flex;"
        }
    }
}*/

let slider = document.querySelector('.slider');
let sliderContainer = document.querySelector('.slider__items');
let sliderItems = document.querySelectorAll('div.slider__item');

console.log(sliderItems.length);

let indicatorIndex = 0;
let indicatorIndexMax = sliderItems.length - 1;
let currentPosition = 0;
let transformValue = 0;
let transformStep = 100;
let indicatorItems;
let timerId;

let itemsArray = [];
for(let i = 0; i < sliderItems.length; i++){
  itemsArray.push({item: sliderItems[i], position: i, transform: 0});
}

console.log(itemsArray);

let position = {
  getItemIndex: function(mode) {
    console.log("get item index");
    let index = 0;
    for(let i = 0; i < itemsArray.length; i++){
      if((itemsArray[i].position < itemsArray[index].position && mode === 'min') || (itemsArray[i].position > itemsArray[index].position && mode === 'max')){
        index = i;
      }
    }
    return index;
  },
  getItemPosition: function(mode){
    console.log("get item position");
    return itemsArray[position.getItemIndex(mode)].position;
  }
};

function moveSlide(direction){
    console.log("move slide");
    let nextItem;
    let currentIndicator = indicatorIndex;
    if(direction === 'next'){
      currentPosition++;
      if(currentPosition > position.getItemPosition('max')){
        nextItem = position.getItemIndex('min');
        itemsArray[nextItem].position = position.getItemPosition('max') + 1;
        itemsArray[nextItem].transform += itemsArray.length * 100;
        itemsArray[nextItem].item.style.transform = `translateX(${itemsArray[nextItem].transform}%)`;
      }
  
      transformValue -= transformStep;
      indicatorIndex = indicatorIndex + 1; //
      if(indicatorIndex > indicatorIndexMax){
        indicatorIndex = 0;
      }
    }else{
      currentPosition--;
      if(currentPosition < position.getItemPosition('min')){
        nextItem = position.getItemIndex('max');
        itemsArray[nextItem].position = position.getItemPosition('min') - 1;
        itemsArray[nextItem].transform -= itemsArray.length * 100;
        itemsArray[nextItem].item.style.transform = `translateX(${itemsArray[nextItem].transform}%)`;
      }
  
      transformValue += transformStep;
      indicatorIndex--; //
      if(indicatorIndex < 0) {
        indicatorIndex = indicatorIndexMax;
      }
    }
  
    sliderContainer.style.transform = `translateX(${transformValue}%)`;
    //indicatorItems[currentIndicator].classList.remove('active');
    //indicatorItems[indicatorIndex].classList.add('active');
  }

  function moveTo(index){
    let i = 0;
    let direction = (index > indicatorIndex) ? 'next' : 'prev';
    while(index != indicatorIndex && i <= indicatorIndexMax){
      moveSlide(direction);
      i++;
    }
  }
  
  let defaultDirection = 'next';
  let delayAutoPlay = 5000;
  
  function startAutoPlay(){
    stopAutoPlay();
    console.log("start auto play");
    timerId = setInterval(() => moveSlide(defaultDirection), delayAutoPlay);
  }
  
  function stopAutoPlay(){
    clearInterval(timerId);
  }

  window.onload = function(){
    startAutoPlay();
  };
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
        removeImage();
    }
});

dropImage.addEventListener('click', (e) => {
    e.preventDefault();
    uploadedImage.container.classList.toggle('form__add__uploaded-img__container--active');
    removeImage(); 
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
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