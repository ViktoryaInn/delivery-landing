let buttonEnter = document.getElementById('login__btn');
let modalWindow = document.querySelector('.modal__window');
let buttonClose = document.getElementById('close_btn');

buttonEnter.addEventListener('click', () => {
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

// buttonEnter.onClick = function(){
//     console.log("something");
// };