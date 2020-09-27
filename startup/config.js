const config = require("config");
module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    console.log("fatal Error: jwtPrivateKey is not defined");
    process.exit(1);
  }
};
