import './style.css';

const time = 3000; // время анимации в мс
const step = 1;
let animated = false;

function outNum(num, elemSelector) {
  const elem = document.querySelector(elemSelector);
  let n = 0;
  const t = Math.round(time / (num / step));

  const interval = setInterval(() => {
    n += step;
    if (n >= num) {
      clearInterval(interval);
      n = num;
    }
    elem.innerHTML = n;
  }, t);
}

function checkScroll() {
  const elem = document.querySelector('#outCar');
  const rect = elem.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && !animated) {
    animated = true;
    outNum(100, '#outCar');
    outNum(320, '#outTo');
  }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);
