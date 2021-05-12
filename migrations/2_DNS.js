const DNS = artifacts.require("./DNS.sol");

module.exports = function (deployer) {
  deployer.deploy(DNS);
};
