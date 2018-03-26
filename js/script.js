const brownBar = document.querySelector('.brownbar');
const guarImage = document.querySelector('.guarantee__image');

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

function brownBarSlide() {
  const realHeight = brownBar.offsetTop - 500
  if (window.scrollY >= realHeight) {
    window.removeEventListener('scroll', brownBarSlide)
    brownBar.classList.add('js-brownbar--slide')
  }
}

function guarImagePop() {
  const realHeight = guarImage.offsetTop - 500
  if (window.scrollY >= realHeight) {
    window.removeEventListener('scroll', guarImagePop)
    guarImage.classList.add('js-guarantee__image--popin')
  }
}

window.addEventListener('scroll', debounce(brownBarSlide));
window.addEventListener('scroll', debounce(guarImagePop));