const fs = require("fs");
const request = require("request");

module.exports = {
  pwd: function (cmd, done) {
    let pwd = process.argv;
    const output = pwd[0];
    done(output);
  },
  date: function (cmd, done) {
    let date = new Date().toString();
    done(date);
  },
  ls: function (cmd, done) {
    fs.readdir(".", function (err, files) {
      let output = "";
      if (err) throw err;
     files.forEach(function (file) {
        output += file.toString() + "\n";
      });
      done(output);
    });
  },
  echo: function (data, done) {
    let str = data.toString().split(" ").slice(1).join(" ");
    done(str)
  },
  cat: function (fullPath, done) {
    const fileName = fullPath.toString().split(" ").slice(1).join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let str = data.toString().split(" ").join(" ");
      done(str)
    });
  },
  head: function (data, done) {
    const fileName = data.toString().split(" ").slice(1).join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let text = data.toString("utf8");
      let slicedText = text.split("\n").slice(0, 5).join("\n");
      done(slicedText);
    });
  },
  tail: function (data, done) {
    const fileName = data.toString().split(" ").slice(1).join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let text = data.toString("utf8");
      let slicedText = text.split("\n").slice(-5).join("\n");
      done(slicedText);
    });
  },
  sort: function (data, done) {
    const fileName = data.toString().split(" ").slice(1).join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let output = data.toString().split("\n").sort().join("\n").trim()
      done(output);
    });
  },
  wc: function (data, done) {
    const fileName = data.toString().split(" ").slice(1).join(" ");
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let output = data.toString().split("\n").length.toString();
      done(output);
    });
  },
  uniq: function (data, done) {
    const fileName = data.toString().split(" ").slice(1).join(" ");
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
    let urlString = url.toString().split(" ").slice(1).join(" ");
    request(urlString, function (error, response, body) {
      console.error("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      let output = body; // Print the HTML for the Google homepage.
      done(output);
    });
  },
};
