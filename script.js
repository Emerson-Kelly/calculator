document.addEventListener('DOMContentLoaded', function () {
// Get the elements
const screen = document.getElementById('screen');
const keys = document.querySelectorAll('.calculator-key');

// Initialize the calculator object
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
};


// Update the display
function updateDisplay() {
    screen.textContent = calculator.displayValue;
}




});