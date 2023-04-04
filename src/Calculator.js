// calculator.js
import DisplayManager from './displayManager.js';
export default class Calculator {
    constructor(display, history, buttons, themeToggle) {
        this.display = display;
        this.history = history;
        this.buttons = buttons;
        this.themeToggle = themeToggle;
        this.currentInput = '';
        this.storedInput = '';
        this.currentOperator = '';
        this.memory = null;
        this.precision = 2;
        this.displayManager = new DisplayManager(this.display, history, buttons, themeToggle);
    }

    handleNumber = (number) => {
        if (this.currentInput.length < 14) {
            this.currentInput = this.currentInput + number;
        }
        this.displayManager.updateDisplay();
    };

    handleOperator = (operator) => {
        if (this.currentInput === '' && (operator === '+' || operator === '-' || operator === '×' || operator === '/')) return;
        this.currentInput += operator;
        this.displayManager.updateDisplay();
    };

    handleMathFunction = (func) => {
        if (this.currentInput === '') return;
        try {
            let value = parseFloat(this.currentInput);
            if (func === 'sin' || func === 'cos' || func === 'tan') {
                value = math[func](math.unit(value, 'deg'));
            } else if (func === 'asin' || func === 'acos') {
                if (value < -1 || value > 1) {
                    throw new Error('Invalid input for acos/asin');
                }
                value = math[func](value);
            } else if (func === 'atan') {
                value = math[func](value);
            } else {
                value = math[func](value);
            }
            this.currentInput = (value.unit ? value.toNumber('deg') : value).toFixed(this.precision).toString();
            this.displayManager.updateDisplay();
        } catch (error) {
            this.currentInput = 'Error';
            this.displayManager.updateDisplay();
        }
    };

    calculate = () => {
        if (this.currentInput === '') return;
        let expression = this.currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        expression = expression.replace(/(\d+(\.\d*)?|\.\d+)%/g, (match, p1) => parseFloat(p1) / 100);

        try {
            this.currentInput = math.evaluate(expression).toFixed(this.precision).toString();
            this.storedInput += `${this.currentInput.replace(/\*/g, '×').replace(/\//g, '÷')} = ${this.currentInput}\n`;
            this.displayManager.updateDisplay();
            this.displayManager.updateHistory(this.storedInput);
        } catch (error) {
            this.currentInput = 'Error';
            this.displayManager.updateDisplay();
        }
    };

    handleClear = () => {
        this.currentInput = '';
        this.storedInput = '';
        this.currentOperator = '';
        this.displayManager.updateDisplay();
        this.displayManager.updateHistory();
    };

    handleDecimal = () => {
        if (this.currentInput.includes('.')) return;
        this.currentInput = this.currentInput + '.';
        this.displayManager.updateDisplay();
    };
    handleDelete = () => {
        if (this.currentInput.length > 0) {
            this.currentInput = this.currentInput.slice(0, -1);
            this.displayManager.updateDisplay();
        }
    };

    handleMemory = (action) => {
        switch (action) {
            case 'MC':
                this.memory = null;
                break;
            case 'MR':
                if (this.memory !== null) {
                    this.currentInput = this.memory.toString();
                    this.displayManager.updateDisplay();
                }
                break;
            case 'MS':
                if (this.currentInput !== '') {
                    this.memory = parseFloat(this.currentInput);
                }
                break;
            case 'M+':
                if (this.memory !== null && this.currentInput !== '') {
                    this.memory += parseFloat(this.currentInput);
                }
                break;
        }
    };

    handlePercentage = () => {
        if (this.currentInput === '') return;

        const lastOperatorRegex = /[-+×÷]$/;
        const lastNumberRegex = /(\d+(\.\d*)?|\.\d+)$/;

        const lastOperatorMatch = this.currentInput.match(lastOperatorRegex);
        const lastNumberMatch = this.currentInput.match(lastNumberRegex);

        if (lastNumberMatch) {
            this.currentInput = this.currentInput.slice(0, -lastNumberMatch[0].length) + lastNumberMatch[0] + '%';
        } else {
            this.currentInput += '%';
        }

        this.displayManager.updateDisplay();
    };
}