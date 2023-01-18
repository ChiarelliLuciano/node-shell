const fs = require("fs");
const commands = require("./commands");
// Un prompt como output

function done(output) {
    process.stdout.write(output);
    process.stdout.write(`\n prompt >`);
}

// El evento STDIN 'data' se dispara cuando el usuario escribe una línea
process.stdin.on("data", function (data) {
  let cmd = data.toString().trim();
  let cmdCommand = cmd.split(" ")[0];
  commands[cmdCommand](cmd, done);
});



// process.stdin.on("data", function (data) {
//   let cmd = data.toString().trim();
//   let cmdCommand = cmd.split(" ")[0];
//   commands[cmdCommand](cmd);
//   process.stdout.write("\nprompt > ");
// });
