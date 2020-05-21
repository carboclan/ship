// pragma solidity ^0.5.10;
pragma solidity >=0.4.22 <0.7.0;

abstract contract CTokenInterface {
    /*** User Interface ***/
    address public underlying;
    uint256 public initialExchangeRateMantissa;

    function transfer(address dst, uint amount) virtual external returns (bool);
    function transferFrom(address src, address dst, uint amount) virtual external returns (bool);
    function approve(address spender, uint amount) virtual external returns (bool);
    function allowance(address owner, address spender) virtual external view returns (uint);
    function balanceOf(address owner) virtual external view returns (uint);
    function balanceOfUnderlying(address owner) virtual external returns (uint);
    function getAccountSnapshot(address account) virtual external view returns (uint, uint, uint, uint);
    function borrowRatePerBlock() virtual external view returns (uint);
    function supplyRatePerBlock() virtual external view returns (uint);
    function totalBorrowsCurrent() virtual external returns (uint);
    function borrowBalanceCurrent(address account) virtual external returns (uint);
    function borrowBalanceStored(address account) virtual public view returns (uint);
    function exchangeRateCurrent() virtual public returns (uint);
    function exchangeRateStored() virtual public view returns (uint);
    function getCash() virtual external view returns (uint);
    function accrueInterest() virtual public returns (uint);
    function seize(address liquidator, address borrower, uint seizeTokens) virtual external returns (uint);
}