// pragma solidity 0.5.10;
pragma solidity >=0.4.22 <0.7.0;

contract MockCompoundOracle {
    constructor() public {
    }

    uint256 price = 5 * (10 ** 15);
    function getPrice(address asset) public view returns (uint) {
        return price;
    }

    function updatePrice(uint256 newPrice) public {
        price = newPrice;
    }
}
