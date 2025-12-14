// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface ICarbonCredit {
    function verifyProject(
        string calldata location,
        uint256 areaHectares,
        uint256 co2Kg,
        uint8 confidence,
        string calldata aiProofHash
    ) external returns (uint256);

    function mintCredits(
        uint256 projectId,
        address to,
        uint256 amount
    ) external;
}
