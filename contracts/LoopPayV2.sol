// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {LoopPay} from "./LoopPay.sol";

/**
 * @title LoopPayV2
 * @notice Example upgrade with a new function to show versioning.
 */
contract LoopPayV2 is LoopPay {
    function version() external pure returns (string memory) {
        return "v2";
    }
}
