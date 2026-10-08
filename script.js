function sum(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function divide(a,b){
    return a/b;
}

function multiply(a,b){
    return a*b;
}

function operate(firstNo,secondNo,operation){

    switch (operation){
        case '+':
            return parseFloat( sum(+firstNo,+secondNo).toFixed(10));
        case '-':
            return parseFloat(subtract(+firstNo,+secondNo).toFixed(10));
        case '/':
            if(secondNo==="0"){
                return "ERROR";
            }else{
            return parseFloat(divide(+firstNo,+secondNo).toFixed(10))};
        case '*':
            return parseFloat(multiply(+firstNo,+secondNo).toFixed(10));

    }
}
const resultDisplay=document.querySelector(".calculations");
const clickedButtons=[...document.querySelectorAll(".digits")];
const clickedSigns=[...document.querySelectorAll(".operators")];
const firstValue= document.querySelector(".first-value");
const secondValue=document.querySelector(".second-value");
const operatorSign=document.querySelector(".operator-sign");
const equalSign=document.querySelector(".evaluator");
const clearBtn=document.querySelector(".clearing-button");
const floatPoint=document.querySelector(".decimal");
const backspaceIcon=document.querySelector(".backspace");
const keyboardDigits=['1','2','3','4','5','6','7','8','9','0'];
const keyboardSigns=['/','*','+','-'];
const keyboardDecimal=['.'];
const keyboardEqualSigns=['Enter','='];
const keyboardBackspace=['Backspace'];

let firstNumber='';
let secondNumber='';
let operator='';
let justCalculated=false;


function handleDigits(key){
    if(justCalculated){
            resultDisplay.textContent='';
            firstNumber='';
            firstValue.textContent= firstNumber;
            operator='';
            operatorSign.textContent=operator;
            secondNumber='';
            secondValue.textContent=secondNumber;
            justCalculated=false;
            
         }
            if(operator === ''){
               
                firstNumber += `${key}`;
                firstValue.textContent= firstNumber;
              

            }
            else{
                
                secondNumber += `${key}`;
                secondValue.textContent= secondNumber;
            }
}
function handleOperators(key){
    if (firstNumber==='')return;
        if(secondNumber!==''){
            let results=operate(firstNumber,secondNumber,operator);
            firstNumber=`${results}`;
            resultDisplay.textContent=results;
            firstValue.textContent=firstNumber;
            operator=key;
            operatorSign.textContent=operator;
            secondNumber='';
            secondValue.textContent=secondNumber;
        

        }
            operator= key;
            operatorSign.textContent=operator;
}
function handleDecimal(){
     if(operator===''){
        if(!(firstNumber.includes("."))){
                firstNumber+='.';
                firstValue.textContent=firstNumber;
        }
        
    }else{
        if(!(secondNumber.includes("."))){
            secondNumber+='.';
            secondValue.textContent=secondNumber;
            }
            }
}
function handleEqualSign(){
     if(firstNumber!==''&& secondNumber!==''){
            resultDisplay.textContent=operate(firstNumber,secondNumber,operator);
            justCalculated=true;
        }

}
function handleClearBtn(){
        resultDisplay.textContent='';
        secondValue.textContent='';
        operator='';
        secondNumber='';
        firstNumber='';
        firstValue.textContent='';
        operatorSign.textContent='';
}
function handleBackspace(){
    if(operator===''){

        let arrayNo=firstNumber.split('');
        arrayNo.splice(-1,1);
        let remainder=arrayNo.join('');
        firstNumber=remainder;
        firstValue.textContent=remainder;
    }else if(operator!==''&&secondNumber===''){
        operator='';
        operatorSign.textContent=operator;
    }else{
            let arrayNo=secondNumber.split('');
            arrayNo.splice(-1,1);
            let remainder=arrayNo.join('');
            secondNumber=remainder;
            secondValue.textContent=remainder;
    }
}



function updateValues(){
    clickedButtons.forEach((item)=>
        item.addEventListener("click",(event)=>{
        const key=event.currentTarget.textContent;
            handleDigits(key);
            })
    
    )

        clickedSigns.forEach((item)=>{

         item.addEventListener("click",(event)=>{
         const key=event.currentTarget.textContent;
            handleOperators(key);
            })
        })
        floatPoint.addEventListener("click",()=>{

          handleDecimal();

        })

        equalSign.addEventListener("click",()=>{
           handleEqualSign();
        })
        clearBtn.addEventListener("click",()=>{
            handleClearBtn();
          
        })
        backspaceIcon.addEventListener("click",()=>{
            handleBackspace();
        })

       
        document.addEventListener("keydown",(event)=>{
            const key =event.key;
            if(keyboardDigits.includes(key)){
                   
                handleDigits(key);

            }
            else if(keyboardSigns.includes(key)){
                handleOperators(key);

            }
            else if(keyboardDecimal.includes(key)){
             handleDecimal();
            }
            else if(keyboardEqualSigns.includes(key)){
               handleEqualSign();
            }
            else if(keyboardBackspace.includes(key)){
                handleBackspace();
            }

        })   
}

updateValues();