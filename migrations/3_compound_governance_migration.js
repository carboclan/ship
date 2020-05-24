var Comp = artifacts.require("Comp");
var GovernorAlpha = artifacts.require("GovernorAlpha");
async function doDeploy(deployer, network, accounts) {
    // Kovan account
    await deployer.deploy(Comp, '0x5224abe5757eCe7c9BE1bc72102Ed1E7F02D8003');
    // Guardian address is my address for now on Kovan
    await deployer.deploy(GovernorAlpha, '0x5fE368A673309534b7801b404a2A4e0dD488c67A', Comp.address, '0x5224abe5757eCe7c9BE1bc72102Ed1E7F02D8003')

    // Rinkeby
    // await deployer.deploy(Comp, )
    
}
// module.exports = function(deployer, network, accounts) {
//     //deployer.deploy(StringComparator,{from: accounts[0]});
//     deployer.link(0x6604195CF1d576C6e924D1baEbc8f9c4a4CC7A95, OptionFactory);
//     deployer.deploy(OptionFactory,{from: accounts[0]});
//    };
module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await doDeploy(deployer, network, accounts);
    });
};

// var TestOpyn = artifacts.require("TestOpyn");
// module.exports = function(deployer, network, accounts) {
//     deployer.deploy(TestOpyn,{from: accounts[0]});
//    };