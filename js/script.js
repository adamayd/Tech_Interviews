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

// function brownBarSlide() {
//   const realHeight = brownBar.offsetTop - 500
//   if (window.scrollY >= realHeight) {
//     window.removeEventListener('scroll', brownBarSlide)
//     brownBar.classList.add('js-brownbar--slide')
//   }
// }

function animateOnScroll(elementToMove, origSelector) {
  // console.log(elementToMove);
  const realHeight = elementToMove.offsetTop - 500
  if (window.scrollY >= realHeight) {
    console.log('trying to remove event listener')
    console.log(elementToMove, origSelector)
    window.removeEventListener('scroll', () => animateOnScroll(brownBar, selectBrownBar));
    elementToMove.classList.add(`js-${origSelector}`)
  }
}

// window.addEventListener('scroll', debounce(animateOnScroll(brownBar)));
// window.addEventListener('scroll', debounce(animateOnScroll(guarImage)));
window.addEventListener('scroll', () => animateOnScroll(brownBar, selectBrownBar));
window.addEventListener('scroll', () => animateOnScroll(guarImage, selectGuarImage));