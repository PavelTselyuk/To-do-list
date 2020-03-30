'use strict';

init()
function init() {
  if (!localStorage.getItem('LocalStorageNotes')) {
    return;
  } else {
    let localStorageObj = JSON.parse(localStorage.getItem('LocalStorageNotes'));
    for(let key in localStorageObj){
      let li = document.createElement('li');
      li.className = "elem";
      

      li.prepend(createCheckbox());
      li.append(`${localStorageObj[key].value}`);
      li.append(createDeleteButton());

      
      crossOut(li.firstChild);
      if (localStorageObj[key].done) {
        li.classList.add ("doneElem");
        li.firstChild.setAttribute("checked", "checked");
      }
      parentDeleting(li.lastChild);

      li.setAttribute("data-LocalStorageId", key);

      document.getElementById('list').append(li);
    }
  }
}

  function createElemWithEnter(event) {
    if (event.keycode == '13' || event.which == '13') {
      createElem();
    }
  }


  function createElem() {
    let value = document.getElementById('elemName').value;
    let a = checkIfAleadyExists(value);

    if (a == false) {
      return;
    }

    let li = document.createElement('li');
    li.className = "elem";

    li.prepend(createCheckbox());
    li.append(`${value}`);
    li.append(createDeleteButton());

    let idInLocalStorage = createLocalStorageRecord(value, 0);
    crossOut(li.firstChild);
    parentDeleting(li.lastChild);
    li.setAttribute("data-LocalStorageId", idInLocalStorage);

    document.getElementById('list').append(li);

    document.getElementById('elemName').value = "";
  }


  function crossOut(inputElem) {
    inputElem.onchange = () => {
      let localStorageObj = JSON.parse(localStorage.getItem('LocalStorageNotes'));
      let idInLS = inputElem.parentElement.getAttribute('data-LocalStorageId');
      localStorageObj[idInLS].done = !localStorageObj[idInLS].done;

      inputElem.parentElement.classList.toggle("doneElem");
      localStorage.setItem('LocalStorageNotes', JSON.stringify(localStorageObj));
    }
  }

  function parentDeleting(buttonElem) {
    buttonElem.onclick = () => {
      let localStorageObj = JSON.parse(localStorage.getItem('LocalStorageNotes'));
      let idInLS = buttonElem.parentElement.getAttribute('data-LocalStorageId');
      delete localStorageObj[idInLS];

      buttonElem.parentElement.remove();
      localStorage.setItem('LocalStorageNotes', JSON.stringify(localStorageObj));
    }
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

  function checkIfAleadyExists(nameOfElem) {
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


  function createLocalStorageRecord(valueOfRec, index) {
    if (!localStorage.getItem('LocalStorageNotes')) {
      localStorage.setItem('LocalStorageNotes', JSON.stringify({}))
    }

    let localStorageObj = JSON.parse(localStorage.getItem('LocalStorageNotes'));
    while (true) {
      if (String(index) in localStorageObj) {
        index++;
        continue;
      } else {
        localStorageObj[index] = {
          value: valueOfRec,
          done: false,
        }
        break;
      }
    }

    localStorage.setItem('LocalStorageNotes', JSON.stringify(localStorageObj));
    return index;
  }



  let donebtns = document.querySelectorAll('.doneButton');
  for (let btn of donebtns) {
    crossOut(btn);
  }

  let deletebtns = document.querySelectorAll('.delete');
  for (let btn of deletebtns) {
    parentDeleting(btn);
  }
