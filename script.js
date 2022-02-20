const buttons = document.querySelectorAll("button");
const displayElm = document.querySelector("#result");

let textToDisplay = "";
const symbol = ["+", "-", "*", "/"];

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayElm.style.backgroundColor = "";
    displayElm.style.color = "";

    const value = btn.innerText;
    const lastChar = textToDisplay[textToDisplay.length - 1];

    //allow 2 dots in the same operation

    //dont allow to click on any of operators in the beginning
    if (textToDisplay.length < 1 && symbol.includes(value)) return;

    //if operator already exists, replace it with the new one
    if (symbol.includes(lastChar) && symbol.includes(value)) {
      textToDisplay = textToDisplay.slice(0, -1);
    }

    //if . exist dont let use enter another .
    if (value === "." && textToDisplay.includes(".")) return;

    // textToDisplay += value;
    // display(textToDisplay);

    // AC clear everything from the display
    if (value === "AC") {
      return resetDisplay();
    }

    // shows the total calculated value
    if (value === "=") {
      //check if the last character is a symbol
      if (symbol.includes(lastChar)) {
        textToDisplay = textToDisplay.slice(0, -1);
      }
      return onTotal();
    }

    //cut the last character from the display
    if (value === "C") {
      textToDisplay = textToDisplay.slice(0, -1);
      return display(textToDisplay);
    }

    // display the value on the display
    textToDisplay += value;
    display(textToDisplay);
  });
});

const display = (toDisplay) => {
  displayElm.innerText = toDisplay || "0.00";
};

const onTotal = () => {
  const prankNumber = randomNumber();

  if (prankNumber > 0) {
    //do animation
    displayElm.style.backgroundColor = "red";
    displayElm.style.color = "white";

    //animation
    displayElm.classList.add("prank");

    //remove the class name after animation end
    displayElm.addEventListener("animationend", () => {
      displayElm.classList.remove("prank");
    });
  }

  const total = eval(textToDisplay) + prankNumber;
  console.log(prankNumber);

  display(total);
  textToDisplay = "";
};

const resetDisplay = () => {
  display("0.00");
  textToDisplay = "";
};

const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  return num < 6 ? num : 0;

  //   console.log(num);
};
