pragma solidity >=0.4.22 <0.7.0;

import './opyn/oToken.sol';

contract TestOpyn {

    // Specify the amount of ETH collateral you want to put down in wei
    uint256 constant collateral = 1000000000000000000;
    // Assuming you want to be 200% collateralized
    uint256 constant collateralizationRatio = 200;

    function test() public payable {
        oToken ocDai = oToken(0x57cC8708eFEB7f7D42E4d73ab9120BC275f1DB59);
    
        // This function tells you the maximum number of options you can safely issue at the minimum collateralization ratio (currently 160%)/ 
        // Note: It is reccomended that you create less than this amount of options. 
        uint256 maxNumOptions = ocDai.maxOTokensIssuable(collateral);
        uint256 numOptions = maxNumOptions * 160 / collateralizationRatio;

        // This contract creates and receives 200% collateralized options against 1 ETH as collateral
        ocDai.createETHCollateralOption.value(collateral)(numOptions, address(this));
    }
    
}