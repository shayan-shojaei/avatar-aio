const fs = require("fs");
const { IgApiClient } = require("instagram-private-api");
const ig = new IgApiClient();
const Logger = require("./logger").default;

exports.updateInstagram = async ({ username, password }, path) => {
  Logger.op("logging into Instagram ...");
  ig.state.generateDevice(username);
  await ig.simulate.preLoginFlow();
  await ig.account.login(username, password);
  Logger.op("logged in successfully. uploading image ...");
  const pic = await fs.promises.readFile(path);
  const res = await ig.account.changeProfilePicture(pic);
  if (res.status == "ok") {
    Logger.success("Instagram profile updated successfully!");
  } else {
    Logger.failure("Instagram process failed!");
  }
};
