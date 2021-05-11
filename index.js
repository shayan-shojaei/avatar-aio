const { program } = require("commander");
const { setup, askCredentials } = require("./lib/inquirer");

program.version(
  require("./package").version,
  "-v, --version",
  "output the current version"
);

program.description("set a profile picture for all your social media accounts");
program.parse();

let selectedPlatforms = [];
let inputPath = "";
let inputCredentials = {};
setup()
  .then(({ platforms, path }) => {
    selectedPlatforms = platforms;
    inputPath = path;
    return askCredentials(platforms);
  })
  .then((credentials) => {
    selectedPlatforms.forEach((platform) => {
      inputCredentials[platform.toLocaleLowerCase()] = {
        username: credentials[`${platform}_username`.toLocaleLowerCase()],
        password: credentials[`${platform}_password`.toLocaleLowerCase()],
      };
    });
    console.log(inputCredentials);
  })
  .catch((err) => {
    console.error("Unexpected error!");
    console.error(err);
  });
