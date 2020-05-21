var TestOpyn = artifacts.require("TestOpyn");
module.exports = function(deployer, network, accounts) {
    deployer.deploy(TestOpyn,{from: accounts[0]});
   };