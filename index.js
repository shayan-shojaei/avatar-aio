const { program } = require("commander");
const { pickPlatforms, askCredentials } = require("./lib/inquirer");

program.version(
  require("./package").version,
  "-v, --version",
  "output the current version"
);

program.description("set a profile picture for your social media accounts");
program.parse();

let selectedPlatforms = [];
pickPlatforms()
  .then(({ platforms }) => {
    selectedPlatforms = platforms;
    askCredentials(platforms);
  })
  .then((credentials) => console.log(credentials))
  .catch((err) => {
    console.error("Unexpected error!");
    console.error(err);
  });
