// calculator.js

let memory = 0;
let display = document.getElementById('display');
let shiftActive = false;

function clearDisplay() {
  display.value = '0';
}

function memoryClear() {
  memory = 0;
}

function memoryRecall() {
  display.value = memory.toString();
}

function memoryAdd() {
  memory += parseFloat(display.value) || 0;
}

function memorySubtract() {
  memory -= parseFloat(display.value) || 0;
}

function backspace() {
  display.value = display.value.slice(0, -1) || '0';
}

function appendNumber(number) {
  if (display.value === '0' && number !== '.') {
    display.value = number;
  } else {
    display.value += number;
  }
}

function appendOperator(operator) {
  const lastChar = display.value.slice(-1);
  if (['+', '-', '*', '/', '**'].includes(lastChar)) {
    display.value = display.value.slice(0, -1) + operator;
  } else {
    display.value += operator;
  }
}

function appendSymbol(symbol) {
  display.value += symbol;
}

    // --- PI ---//

// --- Trigonometric --- //
function calculateTrig(func) {
  try {
    let value = parseFloat(display.value);
    let radians = value * Math.PI / 180;
    let result = func(radians);
    display.value = result.toString();
  } catch (e) {
    display.value = 'Error';
  }
}

function calculateSin() {
  calculateTrig(Math.sin);

}
function calculateCos() {
  calculateTrig(Math.cos);
}
function calculateTan() {
  calculateTrig(Math.tan);
}

function calculateInverseTrig(func) {
  try {
    let value = parseFloat(display.value);
    let result = func(value) * 180 / Math.PI;
    display.value = result.toString();
  } catch (e) {
    display.value = 'Error';
  }
}

function calculateArcsin() {
  calculateInverseTrig(Math.asin);
}
function calculateArccos() {
  calculateInverseTrig(Math.acos);
}
function calculateArctan() {
  calculateInverseTrig(Math.atan);
}

// --- Hyperbolic ---
function calculateSinh() {
  try {
    display.value = Math.sinh(parseFloat(display.value)).toString();
  } catch {
    display.value = 'Error';
  }
}
function calculateCosh() {
  try {
    display.value = Math.cosh(parseFloat(display.value)).toString();
  } catch {
    display.value = 'Error';
  }
}
function calculateTanh() {
  try {
    display.value = Math.tanh(parseFloat(display.value)).toString();
  } catch {
    display.value = 'Error';
  }
}

// --- Logarithmic and Powers ---
function calculateLog() {
  try {
    let v = parseFloat(display.value);
    if (v <= 0) throw '';
    display.value = Math.log10(v).toString();
  } catch {
    display.value = 'Error';
  }
}
function calculateLn() {
  try {
    let v = parseFloat(display.value);
    if (v <= 0) throw '';
    display.value = Math.log(v).toString();
  } catch {
    display.value = 'Error';
  }
}
function calculateTenPower() {
  try {
    display.value = Math.pow(10, parseFloat(display.value)).toString();
  } catch {
    display.value = 'Error';
  }
}

function calculateSquare() {
  try {
    let v = parseFloat(display.value);
    display.value = (v ** 2).toString();
  } catch {
    display.value = 'Error';
  }
}

function calculateSqrt() {
  try {
    let v = parseFloat(display.value);
    if (v < 0) throw '';
    display.value = Math.sqrt(v).toString();
  } catch {
    display.value = 'Error';
  }
}

function calculateInverseSqrt() {
  try {
    let v = parseFloat(display.value);
    if (v <= 0) throw '';
    display.value = (1 / Math.sqrt(v)).toString();
  } catch {
    display.value = 'Error';
  }
}

// --- Miscellaneous ---
function calculateAbs() {
  try {
    display.value = Math.abs(parseFloat(display.value)).toString();
  } catch {
    display.value = 'Error';
  }
}

function calculateReciprocal() {
  try {
    let v = parseFloat(display.value);
    if (v === 0) throw '';
    display.value = (1 / v).toString();
  } catch {
    display.value = 'Error';
  }
}

function calculateFactorial() {
  try {
    let n = parseInt(display.value);
    if (n < 0 || !Number.isInteger(n)) throw '';
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    display.value = result.toString();
  } catch {
    display.value = 'Error';
  }
}

function calculatePercent() {
  try {
    display.value = (parseFloat(display.value) / 100).toString();
  } catch {
    display.value = 'Error';
  }
}

function calculateResult() {
  try {
    let result = Function(`return (${display.value})`)();
    display.value = result.toString();
  } catch {
    display.value = 'Error';
  }
}


document.addEventListener('keydown', function (e) {
  const key = e.key;
  
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    appendNumber(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculateResult();
  } else if (key === 'Backspace') {
    e.preventDefault();
    backspace();
  } else if (key === 'Delete') {
    clearDisplay();
  } else if (key === '^') {
    appendOperator('**');
  } else if (key === '%') {
    calculatePercent();
  } else if (key === '!') {
    calculateFactorial();
  } else if (key === 's') {
    calculateSin();
  } else if (key === 'S') {
    calculateArcsin();
  } else if (key === 'c') {
    calculateCos();
  } else if (key === 'C') {
    calculateArccos();
  } else if (key === 't') {
    calculateTan();
  } else if (key === 'T') {
    calculateArctan();
  } else if (key === 'l') {
    calculateLog();
  } else if (key === 'L') {
    calculateLn();
  }
});

