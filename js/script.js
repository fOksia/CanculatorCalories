'use strict';

const result = document.querySelector('.calculating__result span');
let sex = 'female',
    height, weight, age, 
    ratio = 1.375;

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
      } else {
        sex = elem.getAttribute('id');
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

