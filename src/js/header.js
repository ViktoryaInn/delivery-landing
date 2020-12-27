let slider = document.querySelector('.slider');
let sliderContainer = document.querySelector('.slider__items');
let sliderItems = document.querySelectorAll('div.slider__item');

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

let position = {
  getItemIndex: function(mode) {
    let index = 0;
    for(let i = 0; i < itemsArray.length; i++){
      if((itemsArray[i].position < itemsArray[index].position && mode === 'min') || (itemsArray[i].position > itemsArray[index].position && mode === 'max')){
        index = i;
      }
    }
    return index;
  },
  getItemPosition: function(mode){
    return itemsArray[position.getItemIndex(mode)].position;
  }
};

function moveSlide(direction){
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
      indicatorIndex++; 
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
      indicatorIndex--;
      if(indicatorIndex < 0) {
        indicatorIndex = indicatorIndexMax;
      }
    }
  
    sliderContainer.style.transform = `translateX(${transformValue}%)`;
    indicatorItems[currentIndicator].classList.remove('active');
    indicatorItems[indicatorIndex].classList.add('active');
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
    timerId = setInterval(() => moveSlide(defaultDirection), delayAutoPlay);
  }
  
  function stopAutoPlay(){
    clearInterval(timerId);
  }

  function addIndicators(){
    let indicatorsContainer = document.createElement('ol');
    indicatorsContainer.classList.add('slider__indicators');
    for(let i = 0; i < sliderItems.length; i++){
      let sliderIndicatorsItem = document.createElement('li');
      if(i === 0){
        sliderIndicatorsItem.classList.add('active');
      }
      sliderIndicatorsItem.setAttribute('data-slide-to', i);
      indicatorsContainer.appendChild(sliderIndicatorsItem);
    }
    slider.appendChild(indicatorsContainer);
    indicatorItems = slider.querySelectorAll('.slider__indicators > li');
  }
  
  slider.addEventListener('click', (e) => {
    if(e.target.getAttribute('data-slide-to')){
      e.preventDefault();
      moveTo(parseInt(e.target.getAttribute('data-slide-to')));
      startAutoPlay();
    }
  });

  window.onload = function(){
    startAutoPlay();
    addIndicators();
  }