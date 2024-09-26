function add(firstNumber, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        throw Error("operandNotNumberException");
    } else {
        return firstNumber + secondNumber;
    }
}

function subtract(firstNumber, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        throw Error("operandNotNumberException");
    } else {
        return firstNumber - secondNumber;
    }
}

function multipy(firstNumber, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        throw Error("operandNotNumberException");
    } else {
        return firstNumber * secondNumber;
    }
}

function floorDivision(firstNumber, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        throw Error("operandNotNumberException");
    } else if (secondNumber === 0) {
        throw Error("divideByZeroException");
    } else {
        return firstNumber / secondNumber;
    }
}
function integerDivision(firstNumber, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        throw Error("operandNotNumberException");
    } else if (secondNumber === 0) {
        throw Error("divideByZeroException");
    } else {
        return Math.floor(firstNumber / secondNumber);
    }
}
export { add, subtract, multipy, floorDivision, integerDivision };
