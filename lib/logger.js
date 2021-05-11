require("colors");
exports.default = {
  success: (message) => {
    console.log(`${message}`.green);
  },
  failure: (message) => {
    console.log(`${message}`.red);
  },
  op: (message) => {
    console.log(`${message}`.bgWhite.black);
  },
};
