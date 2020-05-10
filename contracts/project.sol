pragma solidity ^0.4.18;

contract dummy {
   address public projectLeadAddress;
   address[] public adminAddresses;
   address[] public memeberAddresses;

   modifier onlyPL() {
        require(msg.sender == projectLeadAddress);

        _;
    }

   constructor() public {
        projectLeadAddress = msg.sender;
    }

   function setNewPL(address newPL) external onlyPL {
        projectLeadAddress = newPL;
    }
}
