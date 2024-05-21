const fs = require("fs");

const path = require("path");

console.log(__filename);

// Retrieve the command-line arguments
const input = process.argv.slice(2);

if (input.length < 1) {
  console.log("Please provide an operation and necessary arguments.");
  process.exit(1);
}

const operation = input[0];
const fileName = input[1];

switch (operation) {
  case "list":
    // List files and directories in the current directory
    fs.readdir(".", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        process.exit(1);
      }

      //   console.log(files);

      console.log("Contents of the current directory:");
      files.forEach((file) => {
        const filePath = path.join(".", file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error("Error getting file stats:", err);
            return;
          }

          if (stats.isFile()) {
            console.log(`${file} [File]`);
          } else if (stats.isDirectory()) {
            console.log(`${file} [Directory]`);
          } else {
            console.log(`${file} [Other]`);
          }
        });
      });
    });
    break;

  case "create":
    fs.writeFile(fileName, "", (err) => {
      if (err) {
        console.error("Error creating the file:", err);
        process.exit(1);
      }
      console.log(`File '${fileName}' created`);
    });
    break;

  case "read":
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        process.exit(1);
      }
      console.log(`Contents of the file '${fileName}':`);
      console.log(data);
    });
    break;

  case "append":
    if (input.length < 3) {
      console.log('Usage: node index.js append "new content" test.txt');
      process.exit(1);
    }
    const content = input[1];
    const appendFileName = input[2];
    fs.appendFile(appendFileName, content + "\n", (err) => {
      if (err) {
        console.error("Error appending to the file:", err);
        process.exit(1);
      }
      console.log(`Content appended to the file '${appendFileName}'`);
    });
    break;

  case "delete":
    fs.unlink(fileName, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
        process.exit(1);
      }
      console.log(`File '${fileName}' deleted`);
    });
    break;

  case "rename":
    if (input.length < 3) {
      console.log("Usage: node index.js rename oldName newName");
      process.exit(1);
    }
    const newFileName = input[2];
    fs.rename(fileName, newFileName, (err) => {
      if (err) {
        console.error("Error renaming the file:", err);
        process.exit(1);
      }
      console.log(`File '${fileName}' renamed to '${newFileName}'`);
    });
    break;

  default:
    console.log(`Invalid operation '${operation}'`);
    break;
}
