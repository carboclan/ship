pragma solidity >=0.4.22 <0.7.0;

import './opyn/oToken.sol';
import './opyn/OptionsFactory.sol';
import './opyn/OptionsContract.sol';

contract Opyn {

    // Specify the amount of ETH collateral you want to put down in wei
    uint256 constant collateral = 1000000000000000000;
    // Assuming you want to be 200% collateralized
    uint256 constant collateralizationRatio = 200;

    function createERC20Option(address _optionsContract) public payable {
        oToken ocDai = oToken(_optionsContract);
    
        // This function tells you the maximum number of options you can safely issue at the minimum collateralization ratio (currently 160%)/ 
        // Note: It is reccomended that you create less than this amount of options. 
        uint256 maxNumOptions = ocDai.maxOTokensIssuable(collateral);
        uint256 numOptions = maxNumOptions * 160 / collateralizationRatio;

        // This contract creates and receives 200% collateralized options against 1 ETH as collateral
        ocDai.createETHCollateralOption.value(collateral)(numOptions, address(this));
    }
    
    function createOptionsContract(address _optionsFactory, string memory asset, address assetAddress) public returns (address) {
        OptionsFactory factory = OptionsFactory(_optionsFactory);

        //First add asset to supportAsset list
        factory.addAsset(asset, assetAddress);

        //Optimization: Make the variables below configurable through Web3.
        address optionContract = factory.createOptionsContract(
                                "ETH",
                                -18,
                                "cDAI",
                                -18,
                                -18,
                                1,
                                -10, 
                                "ETH",  
                                1574457816,
                                1574457800 
                                );
        return address(optionContract);
    }
}