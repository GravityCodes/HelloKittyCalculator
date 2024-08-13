const displayText = document.querySelector("#displayText");
const operations = document.querySelectorAll("#operators button");
const buttonFunctions = document.querySelectorAll("#functions button");
const zeroButton = document.querySelector("#zero");
const displayHistory = document.querySelector("#history p");
const numButtons = document.querySelectorAll("#numbers button");
const dot = document.querySelector("#dot");

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
let gotTotal = false;

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
    gotTotal = true;
    operation ="";
}

function allClearFunc() {
    gotTotal = false
    firstNum = "";
    secondNum = "";
    getSecondNum = false;
    displayText.textContent = "0";
    displayHistory.textContent = "";
}

//Calculate numbers 
operations.forEach((operator) => operator.addEventListener('click', () => {

    if(operator.id != "equal" && firstNum === ""){
        firstNum = "0"
        getSecondNum = true;
        gotTotal = false;
        displayHistory.textContent = `${firstNum} ${operatorSigns[operation]}`;
    }
    if(operator.id === "equal" && firstNum != "" && secondNum != "") {
        switchOperation(operation)
        displayHistory.textContent =`${firstNum} ${operatorSigns[operation]} ${secondNum} = `
        secondNum = ""
        firstNum = String(total)
        displayText.textContent = total
        operation = ""
        
    }
    else if (secondNum != "") {
        switchOperation(operation)
        secondNum = ""
        firstNum = String(total)
        displayText.textContent = total
        operation = operator.id
        displayHistory.textContent = ` ${firstNum} ${operatorSigns[operation]}`
    }
    else if(operator.id != "equal") {
        operation = operator.id;
        console.log(operatorSigns[operation]);
        getSecondNum = true;
        gotTotal = false;
        displayHistory.textContent = `${firstNum} ${operatorSigns[operation]} `;
    }
    
    
}))


//Get first number and second number
numButtons.forEach((num) => num.addEventListener('click', () => {
    if(gotTotal === true && operation === ""){
        allClearFunc();
        firstNum = String(Number(num.textContent));
        displayText.textContent = firstNum;
    }
    else if(!getSecondNum){
        firstNum += String(Number(num.textContent));
        displayText.textContent = firstNum;
    }
    else if(getSecondNum){
        secondNum += String(Number(num.textContent));
        displayText.textContent = secondNum;
    }
    
    
}));

zeroButton.addEventListener('click', () => {
    if(gotTotal === true){
        allClearFunc();
        firstNum = String(Number(zeroButton.textContent));;
        displayText.textContent = firstNum;
    }
    else if(!getSecondNum && firstNum != ""){
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
    if(gotTotal === true){
        allClearFunc();
    }
    else{
        switch(button.id){
            case "allclear":
                allClearFunc();
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
    }

})) 
    
// dot button logic

dot.addEventListener('click', () => {
    if(gotTotal === true){
        allClearFunc();
        firstNum = ".";
        displayText.textContent = firstNum;
    }
    else if(firstNum === "" || firstNum.includes(".") === false){
        console.log(firstNum.includes("."))
        firstNum += ".";
        displayText.textContent = firstNum;
    }
    else if(getSecondNum && (secondNum === "" || !secondNum.includes("."))){
        secondNum += ".";
        displayText.textContent = secondNum;
    }
})




