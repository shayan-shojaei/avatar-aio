const { program } = require("commander");
const { setup, askCredentials } = require("./lib/inquirer");
const { updateInstagram } = require("./lib/instagram_util");

program.version(
  require("./package").version,
  "-v, --version",
  "output the current version"
);

program.description("set a profile picture for all your social media accounts");
program.parse();

(async () => {
  try {
    let inputCredentials = {};
    const { platforms, path } = await setup();
    const credentials = await askCredentials(platforms);
    platforms.forEach((platform) => {
      inputCredentials[platform.toLocaleLowerCase()] = {
        username: credentials[`${platform}_username`.toLocaleLowerCase()],
        password: credentials[`${platform}_password`.toLocaleLowerCase()],
      };
    });
    if (Object.keys(inputCredentials).includes("instagram")) {
      await updateInstagram(inputCredentials["instagram"], path);
    }
  } catch (err) {
    console.error("Unexpected error!");
    console.error(err);
  } finally {
    process.exit(0);
  }
})();
