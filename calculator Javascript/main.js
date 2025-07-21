let displayContent = '0'; //This is a text variable that holds exactly what is shown on the screen. It starts at '0'.
let firstOperand = null;
let currentOperator = null;
let resetDisplay = false;

function appendToDisplay(value) {
    if (resetDisplay) {
        displayContent = '';
        resetDisplay = false;
    }
    
    if (value === '.' && (displayContent.includes('.') || displayContent.includes(' '))) {
        return;
    }

    if (displayContent === '0' && value !== '.') {
        displayContent = value;
    } else {
        displayContent += value;
    }
    updateDisplay();
}

function handleOperator(operator) {
    if (resetDisplay) {
        firstOperand = parseFloat(displayContent);
        currentOperator = operator;
        displayContent += ' ' + operator + ' ';
        resetDisplay = false;
        updateDisplay();
        return;
    }

    const parts = displayContent.split(' ');
    
    if (parts.length > 1 && !isNaN(parseFloat(parts[parts.length - 1]))) {
        const a = parseFloat(firstOperand);
        const b = parseFloat(parts[parts.length - 1]);
        const result = calculate(a, b, currentOperator);
        
        displayContent = result.toString() + ' ' + operator + ' ';
        firstOperand = result;
        currentOperator = operator;
    } else {
        firstOperand = parseFloat(displayContent);
        currentOperator = operator;
        displayContent += ' ' + operator + ' ';
    }
    updateDisplay();
}

function equals() {
    if (firstOperand === null || currentOperator === null) {
        return;
    }

    const parts = displayContent.split(' ');
    const secondOperand = parseFloat(parts[parts.length - 1]);
    
    if (isNaN(secondOperand)) {
        return; // Prevent calculation if the second operand is not a valid number
    }

    const result = calculate(firstOperand, secondOperand, currentOperator);
    
    displayContent = result.toString();
    firstOperand = result;
    currentOperator = null;
    resetDisplay = true;
    updateDisplay();
}

function calculate(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
            if (b === 0) return 'Error';
            return a / b;
        case '%': return a % b;
        default: return b;
    }
}

function clearDisplay() {
    displayContent = '0';
    firstOperand = null;
    currentOperator = null;
    resetDisplay = false;
    updateDisplay();
}

function backspace() {
    if (displayContent === '0') {
        return;
    }
    
    const lastChar = displayContent.slice(-1);
    
    if (lastChar === ' ') {
        displayContent = displayContent.slice(0, -3);
        currentOperator = null;
        firstOperand = null;
    } else {
        displayContent = displayContent.slice(0, -1);
    }
    
    if (displayContent === '') {
        displayContent = '0';
    }
    
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = displayContent;
}

// Initialize calculator
clearDisplay();