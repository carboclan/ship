var testOpyn = artifacts.require(
    "testOpyn");
module.exports = function(deployer) {
    deployer.deploy(testOpyn);
    // Additional contracts can be deployed here
};