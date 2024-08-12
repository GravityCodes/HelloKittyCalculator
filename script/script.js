const display = document.querySelector("#display")
const displayText = document.querySelector("#display p")
const allClear = document.querySelector("#allclear")

const numButtons = document.querySelectorAll("#numbers button")

let firstNum = "";
let secondNum = 0;

// Operation functions
function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
}

function operate(num1,num2,func){
    return func(num1, num2)
}

//Calculator Loop




numButtons.forEach((num) => num.addEventListener('click', () => {
    firstNum += String(Number(num.textContent));
    displayText.textContent = firstNum;
}))

