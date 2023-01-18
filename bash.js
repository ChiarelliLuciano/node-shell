const fs = require("fs");
const commands = require("./commands");

// helper function to write the result on the console
function done(output) {
  process.stdout.write(output);
  process.stdout.write(`\n prompt > `);
}
// The event STDIN fires when user writes a line
process.stdin.on("data", function (data) {
  let cmd = data.toString().trim().split(" ");
  let params = cmd.slice(1);
  let cmdCommand = cmd[0];
  commands[cmdCommand](params, done);
});
