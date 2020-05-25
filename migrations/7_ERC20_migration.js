var ERC20 = artifacts.require("ERC20");
async function doDeploy(deployer, network, accounts) {
    // Kovan account
    await deployer.deploy(ERC20)
}
module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await doDeploy(deployer, network, accounts);
    });
};