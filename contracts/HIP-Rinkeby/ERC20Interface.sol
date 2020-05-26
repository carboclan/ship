// pragma solidity ^0.4.21;
pragma solidity >=0.4.22 <0.7.0;

// Copied from https://theethereum.wiki/w/index.php/ERC20_Token_Standard
abstract contract ERC20Interface {
    string public constant name = "HIP Token";
    string public constant symbol = "HIP";
    uint8 public constant decimals = 8;

    function totalSupply() virtual public view returns (uint);

    function balanceOf(address tokenOwner) virtual public view returns (uint balance);

    function allowance(address tokenOwner, address spender) virtual public view returns (uint remaining);

    function transfer(address to, uint tokens) virtual public returns (bool success);

    function approve(address spender, uint tokens) virtual public returns (bool success);

    function transferFrom(address from, address to, uint tokens) virtual public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

}
