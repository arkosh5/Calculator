export function createButtons(container) {
    const buttons = [
        { label: 'MC', class: 'memory' },
        { label: 'MR', class: 'memory' },
        { label: 'MS', class: 'memory' },
        { label: 'M+', class: 'memory' },
        { label: 'sin', class: 'math-function' },
        { label: 'cos', class: 'math-function' },
        { label: 'tan', class: 'math-function' },
        { label: 'sinh', class: 'math-function' },
        { label: 'cosh', class: 'math-function' },
        { label: 'tanh', class: 'math-function' },
        { label: 'asin', class: 'math-function' },
        { label: 'acos', class: 'math-function' },
        { label: 'atan', class: 'math-function' },
        { label: 'log', class: 'math-function' },
        { label: 'exp', class: 'math-function' },
        { label: 'Del', class: 'delete' },
        { label: '(', class: 'orange' },
        { label: ')', class: 'orange' },
        { label: 'AC', class: 'orange' },
        { label: '%', class: 'orange' },
        { label: '7', class: '' },
        { label: '8', class: '' },
        { label: '9', class: '' },
        { label: '÷', class: 'orange' },
        { label: '4', class: '' },
        { label: '5', class: '' },
        { label: '6', class: '' },
        { label: '×', class: 'orange' },
        { label: '1', class: '' },
        { label: '2', class: '' },
        { label: '3', class: '' },
        { label: '-', class: 'orange' },
        { label: '0', class: '' },
        { label: '.', class: '' },
        { label: '=', class: 'orange' },
        { label: '+', class: 'orange' },

    ];

    buttons.forEach((button) => {
        const label = button.label;
        const className = button.class;
        const btnElement = document.createElement('div');
        btnElement.classList.add('button');
        if (className) {
            btnElement.classList.add(className);
        }
        btnElement.textContent = label;
        container.appendChild(btnElement);
    });
}
