pragma solidity ^0.4.21;

contract Owner {
    address public owner;
    function owned() public {
        owner = msg.sender;
    }
     modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }
}

contract ERC20Token {
    string public name;
    string public symbol;
    uint8 public decimals = 8;  
    uint256 public totalSupply;

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);

    
    function ERC20Token(uint256 initialSupply, string tokenName, string tokenSymbol) public {
        totalSupply = initialSupply * 10 ** uint256(decimals); 
        balanceOf[msg.sender] = totalSupply;            
        name = tokenName;                                   
        symbol = tokenSymbol;                               
    }

    function _transfer(address _from, address _to, uint _value) internal {
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);

        uint prevBalance = balanceOf[_from] + balanceOf[_to];
        balanceOf[_from] = balanceOf[_from] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        emit Transfer(_from, _to, _value);
        assert(balanceOf[_from] + balanceOf[_to] == prevBalance);
    }

    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value); // Checking to see if the sender has balance >= value. 
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value; // Burning the tokens.
        totalSupply = totalSupply - _value;
        emit Burn(msg.sender, _value);
        return true;
    }


    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value); // Checking to see if the sender has balance >= value.
        balanceOf[_from] = balanceOf[_from] - _value; // Burning the tokens
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value; // Burning allowance
        totalSupply = totalSupply - _value;                              
        emit Burn(_from, _value);
        return true;
    }
}

contract HIPToken is Owner, ERC20Token {
    mapping (address => bool) private frozenAccount;
    mapping (address => bool) private thawAccount;

    event FrozenFunds(address target, bool frozen);
    event ThawedFunds(address target, bool thawed);
    
    function HIPToken(uint256 initialSupply, string tokenName, string tokenSymbol) 
    
    ERC20Token(initialSupply, tokenName, tokenSymbol) payable public {}
    
    function _transferFrom(address _from, address _to, uint _value) internal {
        require (balanceOf[_from] >= _value);           
        require (balanceOf[_to] + _value > balanceOf[_to]); 
        require(!frozenAccount[_from]); // Check if sender's account is frozen
        require(!frozenAccount[_to]); // Check if recipient's account is frozen

        balanceOf[_from] = balanceOf[_from] - _value;                         
        balanceOf[_to] = balanceOf[_to] + _value;   
        emit Transfer(_from, _to, _value);
    }

    function freeze(address target, bool froze) onlyOwner public {
        frozenAccount[target] = froze;
        emit FrozenFunds(target, froze);
    }
    
    function thaw(address target, bool thawed) onlyOwner public {
        thawAccount[target] = thawed;
        emit ThawedFunds(target, thawed);
    }
}

