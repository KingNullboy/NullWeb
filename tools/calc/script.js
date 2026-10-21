const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// Calculator
let expression = '', answer = 0, memory = 0, history = [], historyIndex = -1;
const expressionDisplay = $('#calc-expression'), resultDisplay = $('#calc-result');
const keys = [['MC','MR','M+','C','⌫'],['sin','cos','tan','√','('],['7','8','9','÷',')'],['4','5','6','×','%'],['1','2','3','−','+'],['0','.','π','^','=']];
const buttonBox = $('#calc-buttons');
keys.flat().forEach((key) => { const button = document.createElement('button'); button.textContent = key; button.dataset.key = key; if ('÷×−+^%'.includes(key)) button.classList.add('operator'); if (key === '=') button.classList.add('equals'); if ('MC|C|⌫'.includes(key)) button.classList.add('clear'); buttonBox.append(button); });
function renderCalc(message) { expressionDisplay.textContent = expression || '0'; resultDisplay.textContent = message || (answer ? `= ${format(answer)}` : 'Ready when you are'); $('#calc-memory').textContent = `M: ${format(memory)}`; }
function format(value) { return Number.isInteger(value) ? String(value) : Number(value).toPrecision(10).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1'); }
function calculate(raw) {
  let source = raw.replaceAll('π', 'PI').replaceAll('√', 'sqrt').replaceAll('÷', '/').replaceAll('×', '*').replaceAll('−', '-').replaceAll('^', '**').replace(/\b(sin|cos|tan|sqrt|log|ln|abs)\b/g, 'Math.$1').replace(/\bln\b/g, 'Math.log').replace(/\blog\b/g, 'Math.log10').replace(/\bPI\b/g, 'Math.PI');
  if (!/^[0-9+\-*/%().,\sA-Za-z*]+$/.test(source) || /(?:constructor|window|document|eval|Function)/i.test(source)) throw Error('Invalid expression');
  source = source.replace(/(\d|\))(?=Math|\()/g, '$1*').replace(/(Math\.PI|\))(?=\d)/g, '$1*');
  return Function(`"use strict"; return (${source})`)();
}
function press(key) {
  if (key === 'C') { expression = ''; renderCalc(); return; }
  if (key === '⌫') { expression = expression.slice(0, -1); renderCalc(); return; }
  if (key === '=') { try { answer = calculate(expression); history.unshift(expression); historyIndex = -1; expression = format(answer); renderCalc(`= ${format(answer)}`); } catch { resultDisplay.textContent = 'Check that expression and try again'; } return; }
  if (key === 'MC') { memory = 0; renderCalc(); return; }
  if (key === 'MR') { expression += format(memory); renderCalc(); return; }
  if (key === 'M+') { try { memory += calculate(expression || String(answer)); } catch {} renderCalc(); return; }
  expression += ({sin:'sin(',cos:'cos(',tan:'tan(','√':'sqrt('}[key] || key); renderCalc();
}
buttonBox.addEventListener('click', (event) => press(event.target.dataset.key));
document.addEventListener('keydown', (event) => { if (event.target.matches('input,textarea,select')) return; if (event.key === 'Enter') press('='); else if (event.key === 'Escape') press('C'); else if (event.key === 'Backspace') press('⌫'); else if ('0123456789.+-*/%^()'.includes(event.key)) press(event.key === '*' ? '×' : event.key === '/' ? '÷' : event.key); else if (event.key === 'ArrowUp' && history.length) { expression = history[Math.min(++historyIndex, history.length - 1)]; renderCalc(); } else if (event.key === 'ArrowDown' && history.length) { expression = history[Math.max(--historyIndex, 0)] || ''; renderCalc(); } });
renderCalc();

// Tool tabs
$$('.tool-tab').forEach((button) => button.addEventListener('click', () => {
  $$('.tool-tab').forEach((tab) => { tab.classList.toggle('active', tab === button); tab.setAttribute('aria-selected', tab === button); });
  $$('.tab-panel').forEach((panel) => { panel.hidden = panel.id !== button.dataset.tab; });
  if (button.dataset.tab === 'graph') drawGraph();
}));

// Graph
const canvas = $('#graph-canvas'), context = canvas.getContext('2d');
function drawGraph() { const range = Number($('#graph-window').value), w = canvas.width, h = canvas.height, scale = w / (range * 2); context.fillStyle = '#0e0f0e'; context.fillRect(0, 0, w, h); context.strokeStyle = '#292b28'; context.lineWidth = 1; for (let i = -range; i <= range; i += range / 5) { const x = w / 2 + i * scale, y = h / 2 - i * scale; context.beginPath(); context.moveTo(x, 0); context.lineTo(x, h); context.moveTo(0, y); context.lineTo(w, y); context.stroke(); } context.strokeStyle = '#686c64'; context.beginPath(); context.moveTo(0, h / 2); context.lineTo(w, h / 2); context.moveTo(w / 2, 0); context.lineTo(w / 2, h); context.stroke(); context.strokeStyle = '#c8f169'; context.lineWidth = 2; context.beginPath(); let started = false; for (let px = 0; px <= w; px++) { const x = (px - w / 2) / scale; let y; try { y = calculate($('#graph-func').value.replace(/x/g, `(${x})`)); } catch { y = NaN; } const py = h / 2 - y * scale; if (!Number.isFinite(py) || Math.abs(py) > h * 3) { started = false; continue; } if (!started) context.moveTo(px, py); else context.lineTo(px, py); started = true; } context.stroke(); }
$('#graph-func').addEventListener('input', drawGraph); $('#graph-window').addEventListener('change', drawGraph); drawGraph();

// Base conversion
const baseInputs = $$('[data-base]'); baseInputs.forEach((input) => input.addEventListener('input', () => { const base = Number(input.dataset.base), value = parseInt(input.value, base); if (Number.isNaN(value)) return; baseInputs.forEach((other) => { if (other !== input) other.value = value.toString(Number(other.dataset.base)).toUpperCase(); }); }));

// Matrix tools
function parseMatrix(value) { const rows = value.trim().split('\n').map((row) => row.split(/[,\s]+/).map(Number)); if (!rows.length || rows.some((row) => row.length !== rows[0].length || row.some(Number.isNaN))) throw Error('Use rows of comma-separated numbers'); return rows; }
function matrixText(matrix) { return matrix.map((row) => row.map(format).join('   ')).join('\n'); }
function matrixAction(action) { try { const a = parseMatrix($('#matrix-a').value), b = parseMatrix($('#matrix-b').value); let output; if (action === 'add') { if (a.length !== b.length || a[0].length !== b[0].length) throw Error('Matrices must be the same size'); output = a.map((row, i) => row.map((value, j) => value + b[i][j])); } else if (action === 'multiply') { if (a[0].length !== b.length) throw Error('A columns must equal B rows'); output = a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0))); } else { if (a.length !== a[0].length) throw Error('A must be square'); const det = (m) => m.length === 1 ? m[0][0] : m[0].reduce((sum, value, i) => sum + value * (i % 2 ? -1 : 1) * det(m.slice(1).map((row) => row.filter((_, j) => j !== i))), 0); output = `det(A) = ${format(det(a))}`; } $('#matrix-output').textContent = typeof output === 'string' ? output : matrixText(output); } catch (error) { $('#matrix-output').textContent = error.message; } }
$$('[data-matrix-action]').forEach((button) => button.addEventListener('click', () => { $$('[data-matrix-action]').forEach((b) => b.classList.toggle('active', b === button)); matrixAction(button.dataset.matrixAction); }));

// Statistics
function stats(action = 'summary') { const values = $('#stats-input').value.split(/[,\s]+/).map(Number).filter(Number.isFinite).sort((a, b) => a - b); if (!values.length) return; const mean = values.reduce((a, b) => a + b, 0) / values.length, median = values[Math.floor(values.length / 2)], variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length; const items = action === 'spread' ? [['Range', values.at(-1) - values[0]], ['Min', values[0]], ['Max', values.at(-1)], ['Std dev', Math.sqrt(variance)]] : [['Count', values.length], ['Mean', mean], ['Median', median], ['Sum', values.reduce((a, b) => a + b, 0)]]; $('#stats-output').innerHTML = items.map(([name, value]) => `<div class="stat-card"><small>${name}</small><strong>${format(value)}</strong></div>`).join(''); }
$('#stats-input').addEventListener('input', () => stats()); $$('[data-stat]').forEach((button) => button.addEventListener('click', () => { $$('[data-stat]').forEach((b) => b.classList.toggle('active', b === button)); stats(button.dataset.stat); })); stats();
