'use strict';

const result = document.querySelector('.calculating__result span');

let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
  sex = localStorage.getItem('sex');
} else {
  sex = 'female';
  localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
  ratio = localStorage.getItem('ratio');
} else {
  ratio = 1.375;
  localStorage.setItem('ratio', 1.375);
}

function setStaticElement(selector, activeClass) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(elem => {
    elem.classList.remove(activeClass);
    console.log(elem);
    if ( elem.getAttribute('id') === localStorage.getItem('sex') ) {
      elem.classList.add(activeClass);
    }

    if ( elem.getAttribute('data-ratio') === localStorage.getItem('ratio') ) {
      elem.classList.add(activeClass);
    }
  });
}

setStaticElement('#gender div', 'calculating__choose-item_active');
setStaticElement('.calculating__choose_big div', 'calculating__choose-item_active');

function setResult() {
  if (sex && height && weight && age && ratio) {
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  } else {
    result.textContent = '____';
  }
}

setResult();

function getStaticElement(parent) {
  const elems = document.querySelectorAll(`${parent} div`);

  elems.forEach(elem => {
    elem.addEventListener('click', () => {
      elems.forEach(elem => {
        elem.classList.remove('calculating__choose-item_active');
      });
      elem.classList.add('calculating__choose-item_active');

      if (parent === '.calculating__choose_big') {
        ratio = elem.getAttribute('data-ratio');
        localStorage.setItem('ratio', elem.getAttribute('data-ratio'));
      } else {
        sex = elem.getAttribute('id');
        localStorage.setItem('sex', elem.getAttribute('id'));
      }

      setResult(); 
    });
  });
}

getStaticElement('#gender');
getStaticElement('.calculating__choose_big');

function getDynamicElement(elem) {
  const input = document.querySelector(elem);
  input.addEventListener('input', () => {

    if (input.value.match(/\D/g)) {
      input.style.border = '1px solid red';
    } else {
      input.style.border = 'none';
    }

    switch (input.getAttribute('id')) {
      case 'height':
        height = +input.value;
        break;
      case 'weight':
        weight = +input.value;
        break;
      case 'age':
        age = +input.value;
        break;
    }
    setResult();
  });

}

getDynamicElement('#height');
getDynamicElement('#weight');
getDynamicElement('#age');

