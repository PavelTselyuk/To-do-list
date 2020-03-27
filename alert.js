'use strict';

function createElemWithEnter(event) {
  if (event.keycode == '13' || event.which == '13') {
    createElem();
  }
}

function createElem() {
  let value = document.getElementById('elemName').value;
  let a = checkIfAleadyExists(value);

  if (a == false){
    return;
  }

  let li = document.createElement('li');
  li.className = "elem";

  li.prepend(createCheckbox());
  li.append(`${value}`);
  li.append(createDeleteButton());

  crossOut(li.firstChild);
  parentDeleting(li.lastChild);

  document.getElementById('list').append(li);

  document.getElementById('elemName').value = "";
}


function crossOut(inputElem) {
  inputElem.onchange = () => inputElem.parentElement.classList.toggle("doneElem");
}

function parentDeleting(buttonElem) {
  buttonElem.onclick = () => buttonElem.parentElement.remove();
}

function createCheckbox() {
  let input = document.createElement('input');
  input.setAttribute("type", "checkbox");
  input.className = "doneButton";
  return input;
}

function createDeleteButton() {
  let button = document.createElement('button');
  button.setAttribute("type", "button");
  button.className = "delete";
  button.append('Удалить');
  return button;
}

function checkIfAleadyExists(nameOfElem){
  let elemsNames = document.getElementsByClassName('elem');
  let addStill = true;
  for (let elem of elemsNames) {
    if (nameOfElem == elem.childNodes[1].textContent) {
      addStill = confirm("Уже есть такой(-ие) элемент(-ы), все равно добавить?");
      break;
    }
  }
  return addStill;
}



let donebtns = document.querySelectorAll('.doneButton');
for (let btn of donebtns) {
  crossOut(btn);
}

let deletebtns = document.querySelectorAll('.delete');
for (let btn of deletebtns) {
  parentDeleting(btn);
}