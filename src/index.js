function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  const openBrackets = expr.match(/[(]/g);
  const closeBrackets = expr.match(/[)]/g);
  const exprArray = expr.match(/[()\*\/+-]|\d+/g);

  if ((!openBrackets && closeBrackets) || (openBrackets && !closeBrackets))
    throw "ExpressionError: Brackets must be paired";
  if (openBrackets && closeBrackets) {
    if (openBrackets.length !== closeBrackets.length) {
      throw "ExpressionError: Brackets must be paired";
    }
  }

  for (item of exprArray) {
    if (!isNaN(item)) {
      stackNumbers.push(+item);
    } else {
      if (priority[item]) {
        if (priority[item] <= priority[lastItemInStack(stackSigns)]) {
          calc();
        }
      }
      if (item === ")") {
        while (lastItemInStack(stackSigns) !== "(") {
          calc();
        }
        stackSigns.pop();
        continue;
      }
      stackSigns.push(item);
    }
  }

  while (stackNumbers.length > 1) {
    calc();
  }

  return stackNumbers.pop();
}

let stackNumbers = [];
let stackSigns = [];

const signs = {
  "+": (a, b) => (lastItemInStack(stackSigns) === "-" ? a - b : a + b),
  "-": (a, b) => (lastItemInStack(stackSigns) === "-" ? a + b : a - b),
  "*": (a, b) => a * b,
  "/": (a, b) => {
    if (b === 0) {
      stackNumbers = [];
      stackSigns = [];
      throw new TypeError("TypeError: Division by zero.");
    }
    return a / b;
  }
};

const priority = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2
};

function lastItemInStack(stack) {
  return stack[stack.length - 1];
}

function calc() {
  let [b, a] = [stackNumbers.pop(), stackNumbers.pop()];
  stackNumbers.push(signs[stackSigns.pop()](a, b));
}

module.exports = {
  expressionCalculator
};
