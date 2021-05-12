var inquirer = require("inquirer");
const { exists, isImage } = require("./file_util");

exports.setup = async () =>
  inquirer.prompt([
    {
      type: "checkbox",
      message: "Select Platfroms",
      name: "platforms",
      choices: [
        new inquirer.Separator(" = Supported Platforms = "),
        {
          name: "Instagram",
        },
        /* {
          name: "Twitter", // functionality is not implemented
        }, */
      ],
      validate: (answer) => {
        if (answer.length < 1) {
          return "You must choose at least one platform.";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Path to your new avatar",
      suffix: " (JPEG only)",
      name: "path",
      validate: async (answer) => {
        if (!answer.length) {
          return `Please enter the path to your picture`;
        }
        const fileExists = await exists(answer);
        if (!fileExists) {
          return "The entered path does not exist";
        }
        if (!isImage(answer)) {
          return "The file with this path is not an image";
        }
        return true;
      },
    },
  ]);

exports.askCredentials = async (platforms) =>
  inquirer.prompt(
    platforms.flatMap((platform) => [
      {
        prefix: `${platform} => `,
        type: "input",
        message: "Username",
        name: `${platform}_username`.toLocaleLowerCase(),
        validate: (answer) => {
          if (!answer.length) {
            return `Please enter your ${platform} username`;
          }
          return true;
        },
      },
      {
        prefix: `${platform} => `,
        type: "password",
        message: "Password",
        name: `${platform}_password`.toLocaleLowerCase(),
        validate: (answer) => {
          if (!answer.length) {
            return `Please enter your ${platform} password`;
          }
          return true;
        },
      },
    ])
  );
