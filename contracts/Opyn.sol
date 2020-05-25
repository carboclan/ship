pragma solidity >=0.4.22 <0.7.0;

import './opyn/oToken.sol';
import './opyn/OptionsFactory.sol';
import './opyn/OptionsContract.sol';

contract Opyn {

    // Specify the amount of ETH collateral you want to put down in wei
    uint256 constant collateral = 1000000000000000000 * 5000000; //5M HIP
    // Assuming you want to be 200% collateralized
    uint256 constant collateralizationRatio = 200;

    

    function createERC20Option(address _optionsContract) public payable {
        oToken ocDai = oToken(_optionsContract);
        ERC20 erc20 = ERC20(0x11c7526822326eAEA47b0b3f77b67A5174C96C78); //KOVAN
    
        // This function tells you the maximum number of options you can safely issue at the minimum collateralization ratio (currently 160%)/ 
        // Note: It is reccomended that you create less than this amount of options. 
        uint256 maxNumOptions = ocDai.maxOTokensIssuable(collateral); // 6250
        uint256 numOptions = maxNumOptions * 160 / collateralizationRatio; //5000

        // This contract creates and receives 200% collateralized options against 1 ETH as collateral
        erc20.approve(address(ocDai), collateral);
        ocDai.createERC20CollateralOption(numOptions, collateral, address(this));
    }
    
    function createOptionsContract(address _optionsFactory) public returns (address) {
        OptionsFactory factory = OptionsFactory(_optionsFactory);

        //First add DAI
        //KOVAN
        factory.addAsset('DAI', 0xC4375B7De8af5a38a93548eb8453a498222C4fF2);
        factory.addAsset('HIP', 0x11c7526822326eAEA47b0b3f77b67A5174C96C78);

        //Optimization: Make the variables below configurable through Web3.
        // address optionContract = factory.createOptionsContract(
        //                         "ETH",
        //                         -18,
        //                         "cDAI",
        //                         -18,
        //                         -18,
        //                         1,
        //                         -10, 
        //                         "ETH",  
        //                         1574457816,
        //                         1574457800 
        //                         );
        address optionContract = factory.createOptionsContract(
                                   "DAI",
                                   -18,
                                   "HIP",
                                   -18,
                                   -18,
                                   1,
                                   -18,
                                   "DAI",
                                   1590390000, //Monday, May 25, 2020 12:00:00 AM
                                   16820

        );
        return address(optionContract);
    }
}