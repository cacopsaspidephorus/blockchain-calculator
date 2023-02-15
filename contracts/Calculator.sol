// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Calculator {
    using SafeMath for uint256;

    enum Operator {
        Addition,
        Subtraction,
        Multiplication,
        Division
    }

    event Calculation(
        address indexed user,
        uint256 timestamp,
        uint256 a,
        uint256 b,
        Operator indexed operator,
        bool indexed success,
        uint256 result
    );

    function add(uint256 a, uint256 b) external returns (bool success, uint256 result) {
        (success, result) = a.tryAdd(b);

        emit Calculation(msg.sender, block.timestamp, a, b, Operator.Addition, success, result);
    }

    function sub(uint256 a, uint256 b) external returns (bool success, uint256 result) {
        (success, result) = a.trySub(b);

        emit Calculation(msg.sender, block.timestamp, a, b, Operator.Subtraction, success, result);
    }

    function mul(uint256 a, uint256 b) external returns (bool success, uint256 result) {
        (success, result) = a.tryMul(b);

        emit Calculation(msg.sender, block.timestamp, a, b, Operator.Multiplication, success, result);
    }

    function div(uint256 a, uint256 b) external returns (bool success, uint256 result) {
        (success, result) = a.tryDiv(b);

        emit Calculation(msg.sender, block.timestamp, a, b, Operator.Division, success, result);
    }
}