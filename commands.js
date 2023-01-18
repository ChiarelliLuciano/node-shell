const fs = require("fs");
const request = require("request");

module.exports = {
  pwd: function (args, done) {
    let pwd = process.argv;
    const output = pwd[0];
    done(output);
  },
  date: function (args, done) {
    let date = new Date().toString();
    done(date);
  },
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
  cat: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
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
  sort: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let output = data.toString().split("\n").sort().join("\n").trim();
      done(output);
    });
  },
  wc: function (args, done) {
    const fileName = args.join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let output = data.toString().split("\n").length.toString();
      done(output);
    });
  },
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
