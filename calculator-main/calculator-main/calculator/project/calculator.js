class Calculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.shouldResetDisplay = false;
        this.displayInput = document.getElementById('displayInput');
        this.displayResult = document.getElementById('displayResult');
    }

    updateDisplay() {
        this.displayInput.textContent = this.currentInput;
        
        // Show preview calculation if we have all components
        if (this.previousInput && this.operator && this.currentInput !== '0') {
            try {
                const preview = this.performCalculation(
                    parseFloat(this.previousInput), 
                    parseFloat(this.currentInput), 
                    this.operator
                );
                this.displayResult.textContent = `= ${this.formatNumber(preview)}`;
            } catch (error) {
                this.displayResult.textContent = '';
            }
        } else {
            this.displayResult.textContent = '';
        }
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }

        if (number === '.' && this.currentInput.includes('.')) {
            return;
        }

        if (this.currentInput === '0' && number !== '.') {
            this.currentInput = number;
        } else {
            this.currentInput += number;
        }

        this.updateDisplay();
    }

    appendOperator(op) {
        if (this.operator && this.previousInput && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.operator = op;
        this.previousInput = this.currentInput;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    calculate() {
        if (!this.operator || !this.previousInput) {
            return;
        }

        try {
            const prev = parseFloat(this.previousInput);
            const current = parseFloat(this.currentInput);
            const result = this.performCalculation(prev, current, this.operator);

            this.currentInput = this.formatNumber(result);
            this.operator = '';
            this.previousInput = '';
            this.shouldResetDisplay = true;

            // Add animation to result
            this.displayResult.classList.add('result-animation');
            setTimeout(() => {
                this.displayResult.classList.remove('result-animation');
            }, 300);

        } catch (error) {
            this.currentInput = 'Error';
            this.shouldResetDisplay = true;
            this.displayResult.classList.add('error');
            setTimeout(() => {
                this.displayResult.classList.remove('error');
            }, 1000);
        }

        this.updateDisplay();
    }

    performCalculation(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    throw new Error('Division by zero');
                }
                return a / b;
            default:
                throw new Error('Unknown operator');
        }
    }

    formatNumber(num) {
        if (isNaN(num) || !isFinite(num)) {
            return 'Error';
        }

        // Handle very large or very small numbers
        if (Math.abs(num) > 999999999 || (Math.abs(num) < 0.000001 && num !== 0)) {
            return num.toExponential(6);
        }

        // Round to avoid floating point precision issues
        const rounded = Math.round(num * 1000000000) / 1000000000;
        
        // Format with appropriate decimal places
        if (rounded % 1 === 0) {
            return rounded.toString();
        } else {
            return rounded.toString();
        }
    }

    clearAll() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.shouldResetDisplay = false;
        this.displayResult.textContent = '';
        this.updateDisplay();
    }

    clearEntry() {
        this.currentInput = '0';
        this.updateDisplay();
    }

    deleteLast() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }
}

// Initialize calculator
const calc = new Calculator();

// Global functions for button clicks
function appendNumber(number) {
    calc.appendNumber(number);
}

function appendOperator(operator) {
    calc.appendOperator(operator);
}

function calculate() {
    calc.calculate();
}

function clearAll() {
    calc.clearAll();
}

function clearEntry() {
    calc.clearEntry();
}

function deleteLast() {
    calc.deleteLast();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        event.preventDefault();
        appendOperator('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// Initialize display
calc.updateDisplay();