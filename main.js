
document.querySelector('body').insertAdjacentHTML('beforebegin', '<div class="wrapper"></div>');

let wrapper = document.querySelector('.wrapper');

let keyboard = document.createElement('div');
keyboard.className = 'keyboard';

let textarea = document.createElement('textarea');
textarea.name = 'textarea_result';
textarea.cols = '60';
textarea.rows = '6';
textarea.id = 'result';

wrapper.append(keyboard);
wrapper.prepend(textarea);

let countRow = 5;
while(countRow > 0){
  let row = document.createElement('div');
  row.className = 'row';
  keyboard.prepend(row);
  countRow--;
}



let row = document.querySelectorAll('.row');
let key = document.createElement('div');
key.className = 'key';


row[0].append(key);

row.forEach(node => {
  let countKey = 9;
  while(countKey > 0){
    let key = document.createElement('div');
    key.className = 'key';
    node.append(key);
    countKey--;
  }
});

let addKeyRow0 = 4;
let addKeyRow1 = 6;
let addKeyRow2 = 4;
let addKeyRow3 = 2;

while(addKeyRow0 > 0){
  let key = document.createElement('div');
  key.className = 'key';
  row[0].append(key);
  addKeyRow0--;
}

while(addKeyRow1 > 0){
  let key = document.createElement('div');
  key.className = 'key';
  row[1].append(key);
  addKeyRow1--;
}

while(addKeyRow2 > 0){
  let key = document.createElement('div');
  key.className = 'key';
  row[2].append(key);
  addKeyRow2--;
}

while(addKeyRow3 > 0){
  let key = document.createElement('div');
  key.className = 'key';
  row[3].append(key);
  addKeyRow3--;
}




let row0 = document.querySelector(".row:nth-child(1)").querySelectorAll('.key');
row0.forEach( function(node,index){
  let keyRow = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace'];
  node.innerText = keyRow[index]; 
  // let keyName = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'];
  // let keyNode = document.createElement('span');
  // keyNode.className = keyName[index];
  // let keyRow = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace'];
  // node.innerText = keyRow[index];  
  // node.append(keyNode).innerText = keyRow[index]; 
  
});
document.querySelector(".row:nth-child(1)").querySelector('.key:last-child').className = 'key backspace';



let row1 = document.querySelector(".row:nth-child(2)").querySelectorAll('.key');
row1.forEach( function(node,index){
  let keyRow = ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\','Del'];
  node.innerText = keyRow[index];  
});
document.querySelector(".row:nth-child(2)").querySelector('.key:first-child').className = 'key tab';
document.querySelector(".row:nth-child(2)").querySelector('.key:last-child').className = 'key del';


let row2 = document.querySelector(".row:nth-child(3)").querySelectorAll('.key');
row2.forEach( function(node,index){
  let keyRow = ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'];
  node.innerText = keyRow[index];  
});
document.querySelector(".row:nth-child(3)").querySelector('.key:first-child').className = 'key capslock';
document.querySelector(".row:nth-child(3)").querySelector('.key:last-child').className = 'key enter';



let row3 = document.querySelector(".row:nth-child(4)").querySelectorAll('.key');
row3.forEach( function(node,index){
  let keyRow = ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Enter'];
  node.innerText = keyRow[index];  
});
document.querySelector(".row:nth-child(4)").querySelector('.key:first-child').className = 'key shift';
document.querySelector(".row:nth-child(4)").querySelector('.key:nth-last-child(2)').className = 'key arrow';
document.querySelector(".row:nth-child(4)").querySelector('.key:last-child').className = 'key shift-right';

let row4 = document.querySelector(".row:nth-child(5)").querySelectorAll('.key');
row4.forEach( function(node,index){
  let keyRow = ['Ctrl', 'Win', 'Alt', '', 'Alt', '◄', '▼', '►', 'Ctrl'];
  node.innerText = keyRow[index];  
});
document.querySelector(".row:nth-child(5)").querySelector('.key:first-child').className = 'key ctrl';
document.querySelector(".row:nth-child(5)").querySelector('.key:nth-child(2)').className = 'key win';
document.querySelector(".row:nth-child(5)").querySelector('.key:nth-child(3)').className = 'key alt';
document.querySelector(".row:nth-child(5)").querySelector('.key:nth-child(4)').className = 'key space';
document.querySelector(".row:nth-child(5)").querySelector('.key:nth-child(5)').className = 'key alt';
document.querySelector(".row:nth-child(5)").querySelector('.key:nth-child(6)').className = 'key arrow';
document.querySelector(".row:nth-child(5)").querySelector('.key:nth-child(7)').className = 'key arrow';
document.querySelector(".row:nth-child(5)").querySelector('.key:nth-child(8)').className = 'key arrow';
document.querySelector(".row:nth-child(5)").querySelector('.key:last-child').className = 'key ctrl';


