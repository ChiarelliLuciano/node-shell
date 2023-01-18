const fs = require("fs");
const request = require("request");

module.exports = {
  // PWD command display the Present Working Directory
  pwd: function (args, done) {
    let pwd = process.argv;
    const output = pwd[0];
    done(output);
  },
  // DATE command dsipalys the current date
  date: function (args, done) {
    let date = new Date().toString();
    done(date);
  },
  //LS command list directory contents
  ls: function (args, done) {
    fs.readdir(".", function (err, files) {
      if (err) throw err;
      let output = "";
      files.forEach(function (file) {
        output += file.toString() + "\n";
      });
      done(output);
    });
  },
  //ECHO command diplays text to the terminal window
  echo: function (args, done) {
    let result = "";
    args.forEach((arg) => {
      // check if the argumnet exist in enviroment variables ($)
      if (process.env[arg.slice(1)]) {
        result += process.env[arg.slice(1)];
      } else {
        result += arg + " ";
      }
    });
    done(result);
  },
  // CAT command display file contents in terminal window
  cat: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  // HEAD command displays the first 10 lines of a file
  head: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      // modify data to utf8
      let text = data.toString("utf8");
      let slicedText = text.split("\n").slice(0, 10).join("\n");
      done(slicedText);
    });
  },
  // TAIL command displays the last 10 lines of a file
  tail: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      // modify data to utf8
      let text = data.toString("utf8");
      let slicedText = text.split("\n").slice(-10).join("\n");
      done(slicedText);
    });
  },
  // SORT command sorts the contents of a text file, line by line.
  sort: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let output = data.toString().split("\n").sort().join("\n").trim();
      done(output);
    });
  },
  // returns the word count of a file
  wc: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let output = data.toString().split("\n").length.toString();
      done(output);
    });
  },
  // UNIQ command filters out the adjacent matching lines from the input file(that is required as an argument) and writes the filtered data to the output file. 
  uniq: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const filtered = data
        .toString()
        .split("\n")
        .reduce((acc, el) => {
          const lastItem = acc[acc.length - 1];
          if (lastItem !== el) acc.push(el);
          return acc;
        }, []);
      let output = filtered.join("\n");
      done(output);
    });
  },
  // CURL command enables data transfer over various network protocols. It communicates with a web or application server by specifying a relevant URL and the data that need to be sent or received.
  curl: function (url, done) {
    let urlString = url.toString();
    request(urlString, function (error, response, body) {
      console.error("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      let output = body; // Print the HTML for the Google homepage.
      done(output);
    });
  },
};
