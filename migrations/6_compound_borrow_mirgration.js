var CompoundBorrow = artifacts.require("CompoundBorrow");
async function doDeploy(deployer, network, accounts) {
    // Kovan account
    await deployer.deploy(CompoundBorrow, 
                         '0xf92fbe0d3c0dcdae407923b2ac17ec223b1084e4', //cEth
                         '0x1f5d7f3caac149fe41b8bd62a3673fe6ec0ab73b', //Comptroller
                         '0x6998ed7daf969ea0950e01071aceeee54cccbab5', //Price Oracle
                         '0xe7bc397dbd069fc7d0109c0636d06888bb50668c', //cDAI
                         '0xc4375b7de8af5a38a93548eb8453a498222c4ff2'  //DAI
                         )
}
module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await doDeploy(deployer, network, accounts);
    });
};