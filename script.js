const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let currentOperator = "";
let shouldClearDisplay = false;
let hasDecimal = false;

display.textContent = "0"; 

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;

        if (!isNaN(buttonText)) {  
            if (shouldClearDisplay || display.textContent === "0") {
                display.textContent = "";
                shouldClearDisplay = false;
            }
            display.textContent += buttonText;
        } else if (buttonText === ".") {  
            if (!hasDecimal && display.textContent !== "") {
                display.textContent += ".";
                hasDecimal = true;
            }
        } else if (buttonText === "C") {  
            resetCalculator();
        } else if (buttonText === "=") {
            if (currentOperator && currentInput) {
                const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
                display.textContent = result;
                currentInput = result.toString();
                currentOperator = "";
                shouldClearDisplay = true;
                hasDecimal = false;
            }
            else if (buttonText === "tan") {
                const angle = parseFloat(display.textContent);
                const radians = toRadians(angle);
            
                if (Math.abs(angle % 180) === 90) {
                    display.textContent = "Error";
                } else {
                    display.textContent = Math.tan(radians).toFixed(6);
                }
            }
            
            
        } else if (buttonText === "π") {  
            display.textContent = Math.PI.toFixed(6);
            shouldClearDisplay = true;
        } else if (buttonText === "e") {  
            display.textContent = Math.E.toFixed(6);
            shouldClearDisplay = true;
        } else if (buttonText === "+/-") { 
            display.textContent = (parseFloat(display.textContent) * -1).toString();
        } else if (buttonText === "%") { 
            display.textContent = (parseFloat(display.textContent) / 100).toString();
        } else if (buttonText === "x²") {
            display.textContent = Math.pow(parseFloat(display.textContent), 2).toString();
        } else if (buttonText === "x³") {  
            display.textContent = Math.pow(parseFloat(display.textContent), 3).toString();
       
        } else if (buttonText === "sin") {
            display.textContent = Math.sin(toRadians(parseFloat(display.textContent))).toFixed(6);
        } else if (buttonText === "cos") {  
            display.textContent = Math.cos(toRadians(parseFloat(display.textContent))).toFixed(6);
        } else if (buttonText === "tan") {  
            display.textContent = Math.tan(toRadians(parseFloat(display.textContent))).toFixed(6);
        } else {  
            if (currentInput && currentOperator) {
                const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
                display.textContent = result;
                currentInput = result.toString();
            } else {
                currentInput = display.textContent;
            }
            currentOperator = buttonText;
            shouldClearDisplay = true;
            hasDecimal = false;
        }
    });
});

function calculate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num2 !== 0 ? num1 / num2 : "Error";
        case "**":  
            return Math.pow(num1, num2);
        default:
            return num1;
            
    }
    
}

function resetCalculator() {
    display.textContent = "0";
    currentInput = "";
    currentOperator = "";
    shouldClearDisplay = false;
    hasDecimal = false;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
