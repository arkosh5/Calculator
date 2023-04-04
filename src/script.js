// script.js
import Calculator from './Calculator.js';
import { createButtons } from './buttons.js';

const display = document.querySelector('.display');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('.button');
const themeToggle = document.querySelector('.theme-toggle');
const buttonsContainer = document.querySelector('.buttons');

const calculator = new Calculator(display, history, buttons, themeToggle);
createButtons(buttonsContainer);

buttonsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('button')) {
        const text = event.target.textContent;

        if (!isNaN(text)) {
            calculator.handleNumber(text);
            calculator.displayManager.updateDisplay(calculator.currentInput);
        } else {
            switch (text) {
                case 'AC':
                    calculator.handleClear();
                    calculator.displayManager.updateDisplay(calculator.currentInput);
                    calculator.displayManager.updateHistory(calculator.storedInput);
                    break;
                case '(':
                case ')':
                case '+':
                case '-':
                case '×':
                case '÷':
                    calculator.handleOperator(text);
                    calculator.displayManager.updateDisplay(calculator.currentInput);
                    break;
                case '=':
                    calculator.calculate();
                    calculator.displayManager.updateDisplay(calculator.currentInput);
                    calculator.displayManager.updateHistory(calculator.storedInput);
                    break;
                case '.':
                    calculator.handleDecimal();
                    calculator.displayManager.updateDisplay(calculator.currentInput);
                    break;
                case '%':
                    calculator.handlePercentage();
                    calculator.displayManager.updateDisplay(calculator.currentInput);
                    break;
                case 'sin':
                case 'cos':
                case 'tan':
                case 'sinh':
                case 'cosh':
                case 'tanh':
                case 'asin':
                case 'acos':
                case 'atan':
                case 'log':
                case 'exp':
                    calculator.handleMathFunction(text);
                    calculator.displayManager.updateDisplay(calculator.currentInput);
                    break;
                case 'MC':
                case 'MR':
                case 'MS':
                case 'M+':
                    calculator.handleMemory(text);
                    calculator.displayManager.updateDisplay(calculator.currentInput);
                    break;
                case 'Del':
                    calculator.handleDelete();
                    calculator.displayManager.updateDisplay(calculator.currentInput);
                    break;
            }
        }
    }
});


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    display.classList.toggle('dark');
    history.classList.toggle('dark');
    themeToggle.classList.toggle('dark');
    buttons.forEach((button) => button.classList.toggle('dark'));
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        calculator.handleNumber(key);
        calculator.displayManager.updateDisplay(calculator.currentInput);
    } else {
        switch (key) {
            case 'Escape':
                calculator.handleClear();
                calculator.displayManager.updateDisplay(calculator.currentInput);
                calculator.displayManager.updateHistory(calculator.storedInput);
                break;
            case 'Enter':
                calculator.calculate();
                calculator.displayManager.updateDisplay(calculator.currentInput);
                calculator.displayManager.updateHistory(calculator.storedInput);
                break;
            case '(':
            case ')':
            case '+':
            case '-':
            case '*':
            case '/':
                if (key === '*') {
                    calculator.handleOperator('×');
                } else if (key === '/') {
                    calculator.handleOperator('÷');
                } else {
                    calculator.handleOperator(key);
                }
                calculator.displayManager.updateDisplay(calculator.currentInput);
                break;
            case '%':
                calculator.handlePercentage();
                calculator.displayManager.updateDisplay(calculator.currentInput);
                break;
            case '.':
                calculator.handleDecimal();
                calculator.displayManager.updateDisplay(calculator.currentInput);
                break;
            case 'Delete':
            case 'Backspace':
                calculator.handleDelete();
                calculator.displayManager.updateDisplay(calculator.currentInput);
                break;
            case 'p':
                calculator.precision = (calculator.precision + 1) % 5;
                break;
        }
    }
});