const track = document.querySelector('.swipable-area');
const stack = document.querySelector('.stack');
const cards = stack.querySelectorAll('.card');
let deckSize = cards.length - 1;
let active;
let startX;
let walk = 0;
// const maxWalk = track.offsetWidth / 2; 
const maxWalk = 250; //how var the card will translateX
const trigger = 200; //trigger moveToBack at 200px swiped
let isClicked = false;

function init(cards, z) {
  Array.from(cards).forEach(function (card, i){
  //cards.forEach(function (card, i) {
    // card.style.setProperty('z-index', z);
    card.style.setProperty('z-index', card.dataset.zindex);
    if (z === deckSize){
      card.classList.add('active');
      card.classList.add('wiggle');
      addEvents(card, track);
    }
    z -= 1;
  });
  active = stack.querySelector('.active');
}

function moveToBack(){
  Array.from(cards).forEach(function (card){
  //cards.forEach(function(card){
    var z = parseInt(card.style.getPropertyValue('z-index'));
    if(z === deckSize){
      card.style.setProperty('z-index', 0);
      card.classList.remove('active');
    } else {
      card.style.setProperty('z-index', z + 1);
      if (z + 1 === deckSize){
        card.classList.add('active');
        addEvents(card, track);
      }
    }
  });
}

function addEvents(element, track){
  console.log('addEvents', element, track);
  element.addEventListener('mousedown', mouseDownEvent); 
  track.addEventListener('mouseup', mouseUpEvent);
  track.addEventListener('mouseleave', mouseLeaveEvent);
  track.addEventListener('mousemove', mouseMoveEvent);
    
  element.addEventListener('touchstart', mouseDownEvent); 
  element.addEventListener('touchend', mouseUpEvent);
  element.addEventListener('touchmove', mouseMoveEvent);
}

function removeEvents(element, track){
  console.log('removeEvents');
  element.removeEventListener('mousedown', mouseDownEvent); 
  track.removeEventListener('mouseup', mouseUpEvent);
  track.removeEventListener('mouseleave', mouseLeaveEvent);
  track.removeEventListener('mousemove', mouseMoveEvent);
  
  element.removeEventListener('touchstart', mouseDownEvent); 
  element.removeEventListener('touchend', mouseUpEvent);
  element.removeEventListener('touchmove', mouseMoveEvent);
}

function mouseDownEvent(e){
  console.log('mouse down event');
  isClicked = true;
  this.classList.add('swiping');
  this.classList.remove('wiggle');
  startX = e.pageX - this.offsetLeft
  console.log(isClicked, startX);
}

function mouseUpEvent(e){
  console.log('mouse up event');
  const swiping = document.querySelector('.swiping');
  if(walk > 200){
    //pause any video playing
    const vids = swiping.querySelectorAll('video');
    Array.from(vids).forEach(function(vid){
      vid['pause']();
    });
    removeEvents(swiping, track);
    moveToBack();
    swiping.classList.remove('swiping');
    console.log('walk over 200, lets moveToBack');
  } else {
    swiping.classList.add('wiggle');
  }
  walk = 0;
  isClicked = false;
  animateCard(swiping, walk);
}

function mouseLeaveEvent(e){
  if(isClicked){
    console.log('mouseleaveevent', e);
    const swiping = document.querySelector('.swiping');
    if(walk > trigger){
      removeEvents(swiping, track);
      moveToBack();
    } else {
      swiping.classList.add('wiggle');
    }
    swiping.classList.remove('swiping');
    walk = 0;
    isClicked = false;
    animateCard(swiping, walk);
  }
}

function mouseMoveEvent(e, card){
  if(isClicked){
    const swiping = document.querySelector('.swiping');
    const currentX = e.pageX;
    let x = currentX - swiping.offsetLeft;
    if (x > startX){
      walk = x - startX;
      animateCard(swiping, walk);
      
      //for debug only
      var update = document.querySelector('.walk');
      update.innerText = walk;
    }
  }
}

function animateCard(element, walk){
  var translate = (walk > maxWalk ? maxWalk : walk);
  var rotate = (translate / maxWalk) * 25;
  element.style.setProperty('transform', 'translateX(' + translate + 'px) rotate(' + rotate + 'deg)');
}

init(cards, deckSize);

//disable image dragging 
Array.from(cards).forEach(function (card){
// cards.forEach(card => {
  Array.from(card.querySelectorAll('img')).forEach(img => img.ondragstart = function(){return false;})
})
document.querySelectorAll('img').ondragstart = function() { return false; };



