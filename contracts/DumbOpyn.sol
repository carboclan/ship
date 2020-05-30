pragma solidity >=0.4.22 <0.7.0;

import "./ERC20/IERC20.sol";

contract DumbOpyn {

    struct Put {
        uint id;

        address creator;
        address executor;
        
        uint begin_exercise_period;
        uint end_exercise_period;

        IERC20 collateral_token;
        uint256 collateral_amount;

        IERC20 underlying_token;
        uint underlying_amount;
    }

    mapping (uint=>Put) puts;

    uint next_id;

    function newPut(address executor, uint begin_exercise_period, uint end_exercise_period, IERC20 collateral_token, uint collateral_amount, IERC20 underlying_token, uint underlying_amount) external {
        address creator = msg.sender;
        collateral_token.transferFrom(creator, address(this), collateral_amount);

        puts[next_id] = Put(
            next_id,
            creator,
            executor,
            begin_exercise_period,
            end_exercise_period,
            collateral_token,
            collateral_amount,
            underlying_token,
            underlying_amount
        );

        next_id = next_id + 1;
    }

    function exercisePut(uint id) external {
        Put memory put = puts[id];

        require (msg.sender == put.executor, "only the executor can exercise this option");

        require(block.timestamp > put.begin_exercise_period, "the exercise period has not begun yet");
        require(block.timestamp < put.end_exercise_period, "the exercise period is over");

        put.underlying_token.transferFrom(put.executor, put.creator, put.underlying_amount);

        // put.collateral_token.trasfer(put.executor, put.collateral_amount);

        // puts[id] = Put();
    }
}
