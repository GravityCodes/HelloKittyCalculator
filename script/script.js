const displayText = document.querySelector("#displayText");
const operations = document.querySelectorAll("#operators button");
const buttonFunctions = document.querySelectorAll("#functions button");
const zeroButton = document.querySelector("#zero");
const displayHistory = document.querySelector("#history p");
const numButtons = document.querySelectorAll("#numbers button");

let firstNum = "";
let secondNum = "";
let operation = ""
let total = "";


const operatorSigns = {
    plus: "+",
    minus: "-",
    multiply: "x",
    divide: "÷"
}

let getSecondNum = false;

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

function switchOperation(operation){
    switch(operation){
        case "plus":
            total = operate(Number(firstNum), Number(secondNum), add);         
            break;
        case "minus":
            total = operate(Number(firstNum), Number(secondNum), subtract);
            break;
        case "multiply":
            total = operate(Number(firstNum), Number(secondNum), multiply);
            break;
        case 'divide':
            total = Math.round(operate(Number(firstNum), Number(secondNum), divide) * 100) /100;
            break;
    }
}

//Calculate numbers 
operations.forEach((operator) => operator.addEventListener('click', () => {

    if(operator.id === "equal" && firstNum != "" && secondNum != "") {
        switchOperation(operation)
        displayHistory.textContent =`${firstNum} ${operatorSigns[operation]} ${secondNum} = `
        secondNum = ""
        firstNum = total
        displayText.textContent = Number(total).toFixed(2)
        operation = ""
        
    }
    else if (secondNum != "") {
        switchOperation(operation)
        secondNum = ""
        firstNum = total
        displayText.textContent = total
        operation = operator.id
        displayHistory.textContent = ` ${firstNum} ${operatorSigns[operation]}`
    }
    else if(operator.id != "equal") {
        operation = operator.id;
        getSecondNum = true;
        displayHistory.textContent = `${firstNum} ${operatorSigns[operation]} `;
    }
    
}))


//Get first number and second number
numButtons.forEach((num) => num.addEventListener('click', () => {
    if(!getSecondNum){
        firstNum += String(Number(num.textContent));
        displayText.textContent = firstNum;
    }
    else if(getSecondNum){
        secondNum += String(Number(num.textContent));
        displayText.textContent = secondNum;
    }
    
    
}));

zeroButton.addEventListener('click', () => {
    if(!getSecondNum && firstNum != ""){
        firstNum += String(Number(zeroButton.textContent));
        displayText.textContent = firstNum;
    }
    else if(getSecondNum && secondNum != ""){
        secondNum += String(Number(zeroButton.textContent));
        displayText.textContent = secondNum;
    }
})
    
//All clear, Clear and delete logic
buttonFunctions.forEach((button) => button.addEventListener('click', () => {
    switch(button.id){
        case "allclear":
            firstNum = "";
            secondNum = "";
            getSecondNum = false;
            displayText.textContent = "0";
            displayHistory.textContent = "";
            break;
        case "clear":
            getSecondNum ? secondNum = "" : firstNum = "";
            displayText.textContent = "0";
            break;
        case "delete":
            if(getSecondNum) {
                secondNum = secondNum.replace(secondNum[secondNum.length-1], '');
                displayText.textContent = secondNum;
                console.log(secondNum)
            }
            else{
                firstNum = firstNum.replace(firstNum[firstNum.length-1], '');
                displayText.textContent = firstNum;
                console.log(firstNum)
            }
            break;

    }

})) 
    




