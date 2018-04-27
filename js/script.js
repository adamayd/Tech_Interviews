const selectBrownBar = 'brownbar';
const selectGuarImage = 'guarantee__image';
const brownBar = document.querySelector(`.${selectBrownBar}`);
const guarImage = document.querySelector(`.${selectGuarImage}`);

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout - setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// function debounceEvent (callback, time) {
//   let interval;
//   console.log('debouncing')
//   return (...args) => {
//     clearTimeout(interval);
//     interval = setTimeout(() => {
//       interval = null;
//       callback(...args);
//     }, time)
//   }
// 

function animateOnScroll(elementToMove, origSelector) {
  console.log('am i debounced?')
  const realHeight = elementToMove.offsetTop - 500;
  if (window.scrollY >= realHeight) {
    window.removeEventListener('scroll', arguments[2]);
    elementToMove.classList.add(`js-${origSelector}`);
  }
}

const funcBrown = debounce(() => animateOnScroll(brownBar, selectBrownBar, funcBrown));
window.addEventListener('scroll', funcBrown);
const funcGuar = debounce(() => animateOnScroll(guarImage, selectGuarImage, funcGuar));
window.addEventListener('scroll', funcGuar);