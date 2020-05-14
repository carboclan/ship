pragma solidity ^0.6.4;

contract dummy {
   address public projectLeadAddress;
   address[] public adminAddresses;
   address[] public memeberAddresses;

   modifier onlyPL() {
        require(msg.sender == projectLeadAddress, 'sender is not authorized');

        _;
    }

   constructor() public {
        projectLeadAddress = msg.sender;
    }

   function setNewPL(address newPL) external onlyPL {
        projectLeadAddress = newPL;
    }
}
