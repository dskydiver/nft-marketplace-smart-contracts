// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

interface IPDBs {
    function getRoyaltyFee() external view returns (uint256);

    function getRoyaltyRecipient() external view returns (address);
}
