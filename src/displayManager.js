// displayManager.js
export default class DisplayManager {
    constructor(display, history, buttons, themeToggle) {
        this.display = display;
        this.history = history;
        this.buttons = buttons;
        this.themeToggle = themeToggle;
    }
    updateDisplay = (value) => {
        this.display.textContent = value;
    };

    updateHistory = (value) => {
        this.history.textContent = value;
    };
}