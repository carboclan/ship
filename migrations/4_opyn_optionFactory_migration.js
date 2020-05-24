var OptionFactory = artifacts.require("OptionsFactory");
var StringComparator = artifacts.require("StringComparator");
var OptionsExchange = artifacts.require("OptionsExchange");
// var Oracle = artifacts.require("Oracle");
async function doDeploy(deployer, network, accounts) {
    // let OptionsExchangeAddress = await OptionExchange.at("0x133aA105044c00912F5dCF0Ab69501F02073cb25");
    const libraryName = StringComparator.contractName;
    const libraryInstance = await StringComparator.at('0xA14CC012652e701A11fB28a4512ee2922EaddD48');
    OptionFactory.link(libraryName, libraryInstance.address);
    // await deployer.deploy(OptionsExchange,'0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30');
    // console.log(OptionsExchange.address)
    
    // Kovan Compound Price Oracle
    await deployer.deploy(OptionFactory, '0xF048311212a08EAEE7A55f1B77Fa95344c77cC54', '0x6998ed7daf969ea0950e01071aceeee54cccbab5');

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