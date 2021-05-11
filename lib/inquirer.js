var inquirer = require("inquirer");

exports.pickPlatforms = async () =>
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
        {
          name: "Twitter",
        },
      ],
      validate: (answer) => {
        if (answer.length < 1) {
          return "You must choose at least one platform.";
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
