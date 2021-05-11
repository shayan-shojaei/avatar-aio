const fs = require("fs");
const _isImage = require("is-image");
exports.exists = async (path) => {
  try {
    await fs.promises.access(path);
    return true;
  } catch {
    return false;
  }
};

exports.isImage = (path) => _isImage(path);
