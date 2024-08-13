const display = document.querySelector("#display")
const displayText = document.querySelector("#display p")
const allClear = document.querySelector("#allclear")
const operations = document.querySelectorAll("#operators button")
const buttonFunctions = document.querySelectorAll("#functions button")

const numButtons = document.querySelectorAll("#numbers button")

let firstNum = "";
let secondNum = "";
let operation = ""
let total = "";

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



operations.forEach((operator) => operator.addEventListener('click', () => {


    if(operator.id === "equal") {
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
                total = operate(Number(firstNum), Number(secondNum), divide);
                break;
        }
        secondNum = ""
        firstNum = total
        displayText.textContent = total
        
    }
    else {
        operation = operator.id;
        getSecondNum = true;
        console.log(operation)
    }
    
}))



numButtons.forEach((num) => num.addEventListener('click', () => {
    if(!getSecondNum){
        firstNum += String(Number(num.textContent));
        displayText.textContent = firstNum;
    }
    else if(getSecondNum){
        secondNum += String(Number(num.textContent));
        displayText.textContent = secondNum;
    }
    
    
}))
    
buttonFunctions.forEach((button) => button.addEventListener('click', () => {
    switch(button.id){
        case "allclear":
            firstNum = "";
            secondNum = "";
            getSecondNum = false;
            displayText.textContent = "";
            break;
        case "clear":
            getSecondNum ? secondNum = "" : firstNum = "";
            displayText.textContent = ""
            break;
        case "delete":
            getSecondNum ? secondNum.slice(0) : firstNum.slice(0);
            break;

    }

})) 
    





