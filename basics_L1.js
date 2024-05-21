const crypto = require("crypto");

const input = process.argv.slice(2);

console.log(input);

if (input.length < 1) {
  console.log("Please provide an operation and necessary arguments.");
  process.exit(1);
}

const operation = input[0];
const num1 = parseFloat(input[1]); // retreving input from comment line of terminal
const num2 = parseFloat(input[2]);
let result = 0;

switch (operation) {
  case "add":
    result = num1 + num2;
    break;
  case "sub":
    result = num1 - num2;
    break;
  case "multi":
    result = num1 * num2;
    break;
  case "div":
    result = num1 / num2;
    break;
  case "sin":
    result = Math.sin(num1);
    break;
  case "cos":
    result = Math.cos(num1);
    break;
  case "tan":
    result = Math.tan(num1);
    break;
  case "random":
    if (input.length < 2) {
      console.log("Provide length for random number generation.");
    } else {
      const length = parseInt(input[1]);
      if (isNaN(length) || length <= 0) {
        console.log("Please provide a valid length.");
        process.exit(1);
      } else {
        const randomBytes = crypto.randomBytes(length);
        result = randomBytes.toString("binary");
      }
    }
    break;
  default:
    console.log(
      "Invalid operation. Supported operations are add, sub, mult, divide, sin, cos, tan, random."
    );
}

console.log(result);
