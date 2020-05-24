pragma solidity >=0.4.22 <0.7.0;

interface Erc20 {
    function approve(address, uint256) external returns (bool);

    function transfer(address, uint256) external returns (bool);
}


interface CErc20 {
    function mint(uint256) external returns (uint256);

    function borrow(uint256) external returns (uint256);

    function borrowRatePerBlock() external view returns (uint256);

    function borrowBalanceCurrent(address) external returns (uint256);

    function repayBorrow(uint256) external returns (uint256);
}


interface CEth {
    function mint() external payable;

    function borrow(uint256) external returns (uint256);

    function repayBorrow() external payable;

    function borrowBalanceCurrent(address) external returns (uint256);
}


interface Comptroller {
    function markets(address) external returns (bool, uint256);

    function enterMarkets(address[] calldata)
        external
        returns (uint256[] memory);

    function getAccountLiquidity(address)
        external
        view
        returns (uint256, uint256, uint256);
}


interface PriceOracle {
    function getUnderlyingPrice(address) external view returns (uint256);
}


contract CompoundBorrow {
    CEth public cEth;
    Comptroller public comptroller;
    PriceOracle public priceOracle;
    CErc20 public cDai;
    Erc20 public dai;
    address public cEtherAddress;
    address public cDaiAddress;

    event Log(string, uint256);

    constructor(
        address payable _cEtherAddress, 
        address _comptrollerAddress,
        address _priceOracleAddress,
        address _cDaiAddress, 
        address _erc20Address 
        ) public {
       cEth = CEth(_cEtherAddress);
       comptroller = Comptroller(_comptrollerAddress);
       priceOracle = PriceOracle(_priceOracleAddress); 
       cDai = CErc20(_cDaiAddress); 
       dai = Erc20(_erc20Address);

       cEtherAddress = _cEtherAddress;
       cDaiAddress = _cDaiAddress;
    }

    function borrowErc20 (uint256 amount) public payable returns (bool) {
        // Supply ETH as collateral, get cETH in return
        cEth.mint.value(msg.value)();

        // Enter the ETH market so you can borrow another type of asset
        address[] memory cTokens = new address[](1);
        cTokens[0] = cEtherAddress;
        uint256[] memory errors = comptroller.enterMarkets(cTokens);
        if (errors[0] != 0) {
            revert("Comptroller.enterMarkets failed.");
        }

        // Get my account's total liquidity value in Compound
        (uint256 error, uint256 liquidity, uint256 shortfall) = comptroller
            .getAccountLiquidity(address(this));
        if (error != 0) {
            revert("Comptroller.getAccountLiquidity failed.");
        }
        require(shortfall == 0, "account underwater");
        require(liquidity > 0, "account has excess collateral");

        // Get the collateral factor for our collateral
        // (
        //   bool isListed,
        //   uint collateralFactorMantissa
        // ) = comptroller.markets(_cEthAddress);
        // emit Log('ETH Collateral Factor', collateralFactorMantissa);

        // Get the amount of DAI added to your borrow each block
        // uint borrowRateMantissa = cDai.borrowRatePerBlock();
        // emit Log('Current DAI Borrow Rate', borrowRateMantissa);

        // Get the DAI price in ETH from the Price Oracle,
        // so we can find out the maximum amount of DAI we can borrow.
        uint256 daiPriceInWei = priceOracle.getUnderlyingPrice(cDaiAddress);
        uint256 maxBorrowDaiInWei = liquidity / daiPriceInWei;

        // Borrowing near the max amount will result
        // in your account being liquidated instantly
        emit Log("Maximum DAI Borrow (borrow far less!)", maxBorrowDaiInWei);

        // Borrow DAI
        uint256 numDaiToBorrow = amount;
        uint256 numDaiToBorrowInWei = numDaiToBorrow * 1e18;

        require(numDaiToBorrowInWei < maxBorrowDaiInWei, "borrow exceed max allowed number");

        // Borrow DAI
        cDai.borrow(numDaiToBorrowInWei);
        emit Log("Borrow DAI amount", amount);

        return true;
    }

    function getBorrowBalance() public returns (uint256) {
        uint256 borrows = cDai.borrowBalanceCurrent(address(this));
        emit Log("Current DAI borrow amount", borrows);

        return borrows;
    }

    function myErc20RepayBorrow(uint256 amount) public returns (bool) {
        dai.approve(cDaiAddress, amount);
        uint256 error = cDai.repayBorrow(amount);

        require(error == 0, "CErc20.repayBorrow Error");
        return true;
    }
}
