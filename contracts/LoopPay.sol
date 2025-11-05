// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title LoopPay (Upgradeable, UUPS)
 * @notice Minimal skeleton for recurring payments logic. Upgradeable via UUPS.
 */
contract LoopPay is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    mapping(address => address) public payeeOf;

    event PayeeUpdated(address indexed payer, address indexed payee);

    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
    }

    function setPayee(address payee) external {
        payeeOf[msg.sender] = payee;
        emit PayeeUpdated(msg.sender, payee);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    uint256[49] private __gap;
}
