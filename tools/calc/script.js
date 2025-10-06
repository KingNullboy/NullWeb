let variables = {}; // Stores values like {A:5, B:10}

// ---------------- TABS ----------------
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        tabButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        tabContents.forEach(tc=>{
            tc.classList.toggle('active', tc.id===tab);
        });
    });
});

// ---------------- CALCULATOR ----------------
let current=''; let ans=0;
const currDisp = document.getElementById('calc-current');
const prevDisp = document.getElementById('calc-prev');

const calcButtons = [
    ['C','ANS','DEL','/'],
    ['7','8','9','*'],
    ['4','5','6','-'],
    ['1','2','3','+'],
    ['0','.','=','^'],
    ['sin(','cos(','tan(','√'],
    ['log(','ln(','(',')'],
    ['π','e','ANS','%']
];

const calcBtnContainer = document.getElementById('calc-buttons');
calcButtons.flat().forEach(v=>{
    const btn = document.createElement('button');
    btn.textContent=v;
    btn.dataset.value=v;
    if(['/','*','-','+','^'].includes(v)) btn.classList.add('operator');
    else btn.classList.add('func-btn');
    btn.addEventListener('click',()=>handleCalc(v));
    calcBtnContainer.appendChild(btn);
});

function handleCalc(val){
    if(val==='C'){current=''; updateCalc(); return;}
    if(val==='DEL'){current=current.slice(0,-1); updateCalc(); return;}
    if(val==='='){evalCalc(); return;}
    if(val==='ANS'){current+=ans; updateCalc(); return;}
    current+=val; updateCalc();
}
function updateCalc(){
    currDisp.textContent=current||'0';
    prevDisp.textContent='ANS: '+ans;
}
function evalCalc() {
    if (!current) return;
    try {
        let expr = current
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-')
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/√/g, 'Math.sqrt')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/\^/g, '**');

        // -------- Implicit multiplication --------
        expr = expr
            .replace(/(\d)(\()/g, '$1*$2')
            .replace(/(\))(\d|\()/g, '$1*$2')
            .replace(/(\d)(π|e)/g, '$1*$2')
            .replace(/(π|e)(\d)/g, '$1*$2')
            .replace(/(\d)([A-Z])/g, '$1*$2')   // 4A → 4*A
            .replace(/([A-Z])(\d)/g, '$1*$2')   // A4 → A*4
            .replace(/([A-Z])\(/g, '$1*(');     // A(2+3) → A*(2+3)

        // -------- Variable assignment --------
        if (/^[A-Z]\s*=/.test(expr)) {
            const [varName, valueExpr] = expr.split('=');
            const value = eval(replaceVars(valueExpr.trim()));
            variables[varName.trim()] = value;
            ans = value;
            current = value.toString();
            updateCalc();
            return;
        }

        // -------- Replace variable names in expression --------
        expr = replaceVars(expr);

        ans = eval(expr);
        current = ans.toString();
        updateCalc();
    } catch (e) {
        currDisp.textContent = 'Error';
    }
}

// Replace variables with their stored values
function replaceVars(exp) {
    for (const v in variables) {
        exp = exp.replace(new RegExp(`\\b${v}\\b`, 'g'), variables[v]);
    }
    return exp;
}

// Replace variables in expression
function replaceVars(exp){
    for(const v in variables){
        // Replace only standalone variable names
        exp = exp.replace(new RegExp(`\\b${v}\\b`,'g'), variables[v]);
    }
    return exp;
}
// ---------------- GRAPHING ----------------
const graphCanvas = document.getElementById('graph-canvas');
const graphCtx = graphCanvas.getContext('2d');
document.getElementById('graph-func').addEventListener('input',drawGraph);
function drawGraph(){
    const funcStr = document.getElementById('graph-func').value;
    const ctx = graphCtx;
    ctx.fillStyle='#111'; ctx.fillRect(0,0,graphCanvas.width,graphCanvas.height);

    ctx.strokeStyle='#0f0'; ctx.lineWidth=2; ctx.beginPath();

    const scaleX=25, scaleY=25;
    const offsetX=graphCanvas.width/2, offsetY=graphCanvas.height/2;

    for(let px=0; px<=graphCanvas.width; px++){
        const x=(px-offsetX)/scaleX;
        let y=0;
        try{
            let expr = funcStr.replace(/(\d)(x)/g,'$1*$2').replace(/(x)(\d)/g,'$1*$2')
                              .replace(/(\))(\()/g,'$1*$2');
            y=eval(expr.replace(/x/g,'('+x+')'));
        }catch(e){y=NaN;}
        const pyPos=offsetY - y*scaleY;
        if(px===0) ctx.moveTo(px,pyPos);
        else ctx.lineTo(px,pyPos);
    }
    ctx.stroke();

    // Draw axes
    ctx.strokeStyle='#555'; ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0,offsetY); ctx.lineTo(graphCanvas.width,offsetY);
    ctx.moveTo(offsetX,0); ctx.lineTo(offsetX,graphCanvas.height);
    ctx.stroke();
}

// ---------------- BASE CONVERSION ----------------
const decInp=document.getElementById('base-dec');
const binInp=document.getElementById('base-bin');
const hexInp=document.getElementById('base-hex');
const octInp=document.getElementById('base-oct');

function updateBase(e){
    let val=parseInt(e.target.value || e.target.textContent);
    if(isNaN(val)) return;
    decInp.value=val;
    binInp.value=val.toString(2);
    hexInp.value=val.toString(16).toUpperCase();
    octInp.value=val.toString(8);
}
[decInp,binInp,hexInp,octInp].forEach(inp=>{
    inp.addEventListener('input',()=>{
        let v=inp.value;
        let n=parseInt(v, inp===binInp?2: inp===hexInp?16: inp===octInp?8:10);
        if(isNaN(n)) return;
        decInp.value=n;
        binInp.value=n.toString(2);
        hexInp.value=n.toString(16).toUpperCase();
        octInp.value=n.toString(8);
    });
});

// ---------------- MATRICES ----------------
const matrixInput=document.getElementById('matrix-input');
const matrixOut=document.getElementById('matrix-output');
document.getElementById('matrix-add').addEventListener('click',()=>{
    matrixOut.textContent='Matrix addition (placeholder)';
});
document.getElementById('matrix-mul').addEventListener('click',()=>{
    matrixOut.textContent='Matrix multiplication (placeholder)';
});
document.getElementById('matrix-det').addEventListener('click',()=>{
    matrixOut.textContent='Determinant (placeholder)';
});

// ---------------- STATISTICS ----------------
const statsInput=document.getElementById('stats-input');
const statsOut=document.getElementById('stats-output');
document.getElementById('stats-mean').addEventListener('click',()=>{
    let nums=statsInput.value.split(',').map(Number);
    let mean=nums.reduce((a,b)=>a+b,0)/nums.length;
    statsOut.textContent='Mean: '+mean;
});
document.getElementById('stats-std').addEventListener('click',()=>{
    let nums=statsInput.value.split(',').map(Number);
    let mean=nums.reduce((a,b)=>a+b,0)/nums.length;
    let std=Math.sqrt(nums.reduce((a,b)=>a+Math.pow(b-mean,2),0)/nums.length);
    statsOut.textContent='Std Dev: '+std;
});

// ---------------- KEYBOARD SUPPORT ----------------
document.addEventListener('keydown', e => {
    const key = e.key;

    // Letters A-Z for variables
    if (/^[A-Z]$/i.test(key)) {
        current += key.toUpperCase();
        updateCalc();
        e.preventDefault();
        return;
    }

    // Numbers and dot
    if (/\d/.test(key) || key === '.') {
        current += key;
        updateCalc();
        e.preventDefault();
        return;
    }

    // Operators
    if (['+', '-', '*', '/', '^', '%'].includes(key)) {
        current += key;
        updateCalc();
        e.preventDefault();
        return;
    }

    // Parentheses
    if (['(', ')'].includes(key)) {
        current += key;
        updateCalc();
        e.preventDefault();
        return;
    }

    // Equal sign (for variable assignment)
    if (key === '=') {
        current += '=';
        updateCalc();
        e.preventDefault();
        return;
    }

    // Enter = evaluate
    if (key === 'Enter') {
        evalCalc();
        e.preventDefault();
        return;
    }

    // Backspace = delete
    if (key === 'Backspace') {
        current = current.slice(0, -1);
        updateCalc();
        e.preventDefault();
        return;
    }
});