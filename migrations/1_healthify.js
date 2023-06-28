var healthify= artifacts.require("./healthify.sol");

module.exports = function(deployer) {
    deployer.deploy(healthify);
};