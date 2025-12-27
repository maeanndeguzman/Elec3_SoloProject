const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button"); // ✅ only calculator buttons
const historyList = document.getElementById("history");
const clearHistoryBtn = document.getElementById("clearHistory");

let currentInput = "";

/* Calculator buttons */
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            currentInput = "";
            display.value = "";
        }
        else if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
        else if (value === "=") {
            try {
                const result = eval(currentInput);
                addHistory(currentInput, result);
                currentInput = result.toString();
                display.value = currentInput;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        }
        else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

/* Add history */
function addHistory(expression, result) {
    const li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li);
}

/* ✅ History Clear = clear history + clear display */
clearHistoryBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
    currentInput = "";
    display.value = "";
});

/* Keyboard support */
document.addEventListener("keydown", (e) => {
    const allowedKeys = "0123456789+-*/.%";

    if (allowedKeys.includes(e.key)) {
        currentInput += e.key;
        display.value = currentInput;
    }
    else if (e.key === "Enter") {
        try {
            const result = eval(currentInput);
            addHistory(currentInput, result);
            currentInput = result.toString();
            display.value = currentInput;
        } catch {
            display.value = "Error";
            currentInput = "";
        }
    }
    else if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }
    else if (e.key === "Escape") {
        currentInput = "";
        display.value = "";
    }
});
