const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const toggleModeBtn = document.getElementById('toggle-mode');
const memory = {
  value: 0,
  clear: function() { this.value = 0; },
  recall: function() { return this.value; },
  add: function(val) { this.value += val; },
  subtract: function(val) { this.value -= val; }
};
let lastAnswer = 0;
let isDegrees = true;

function formatNumber(num) {
  // Add commas for thousands (for display only)
  if (typeof num === 'number' && !isNaN(num)) {
    return num.toLocaleString('en-US', {maximumFractionDigits: 12});
  }
  return num;
}

function parseDisplay(expr) {
  // remove commas and replace ^ with **
  return expr.replace(/,/g, '').replace(/\^/g, '**').replace(/π/g, Math.PI).replace(/e/g, Math.E);
}

function safeEval(expr) {
  try {
    return Function('"use strict";return (' + expr + ')')();
  } catch {
    return 'Error';
  }
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

function degToRad(d) {
  return d * (Math.PI / 180);
}

function calculateScientificFunc(func, val) {
  val = parseFloat(val);
  if (isNaN(val)) return 'Error';

  if (isDegrees && ['sin','cos','tan'].includes(func)) {
    val = degToRad(val);
  }

  switch(func) {
    case 'sin': return Math.sin(val);
    case 'cos': return Math.cos(val);
    case 'tan': return Math.tan(val);
    case 'log': return Math.log10(val);
    case 'ln': return Math.log(val);
    case 'sqrt': return Math.sqrt(val);
    case 'abs': return Math.abs(val);
    case 'floor': return Math.floor(val);
    case 'ceil': return Math.ceil(val);
    case 'exp': return Math.exp(val);
    default: return 'Error';
  }
}

function applyFactorial(expr) {
  // replace x! with factorial(x)
  return expr.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));
}

function getLastNumber(expr) {
  // grab last number from display for scientific func use
  const match = expr.match(/(\d+\.?\d*)$/);
  return match ? match[0] : '';
}

function replaceLastNumber(expr, replacement) {
  return expr.replace(/(\d+\.?\d*)$/, replacement);
}

toggleModeBtn.addEventListener('click', () => {
  isDegrees = !isDegrees;
  toggleModeBtn.textContent = isDegrees ? 'Mode: DEG' : 'Mode: RAD';
});

document.getElementById('mc').addEventListener('click', () => {
  memory.clear();
});
document.getElementById('mr').addEventListener('click', () => {
  display.value += memory.recall();
});
document.getElementById('mplus').addEventListener('click', () => {
  const val = safeEval(parseDisplay(display.value));
  if (!isNaN(val)) memory.add(val);
});
document.getElementById('mminus').addEventListener('click', () => {
  const val = safeEval(parseDisplay(display.value));
  if (!isNaN(val)) memory.subtract(val);
});
document.getElementById('ans').addEventListener('click', () => {
  display.value += lastAnswer;
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');
    const func = btn.getAttribute('data-func');

    if (val !== null) {
      display.value += val;
    } else if (func !== null) {
      if (func === 'pi' || func === 'e') {
        display.value += (func === 'pi' ? 'π' : 'e');
      } else {
        // apply func to last number only
        let expr = display.value.trim();
        let lastNum = getLastNumber(expr);
        if (!lastNum) return;

        let result = calculateScientificFunc(func, lastNum);
        if (result === 'Error' || isNaN(result)) {
          display.value = 'Error';
          return;
        }
        // replace last number with result
        display.value = replaceLastNumber(expr, result);
      }
    } else if (btn.id === 'clear') {
      display.value = '';
    } else if (btn.id === 'backspace') {
      display.value = display.value.slice(0, -1);
    } else if (btn.id === 'equals') {
      let expr = display.value.trim();
      expr = applyFactorial(expr);
      let result = safeEval(parseDisplay(expr));
      if (result === 'Error' || isNaN(result)) {
        display.value = 'Error';
      } else {
        lastAnswer = result;
        display.value = formatNumber(result);
      }
    }
  });
});