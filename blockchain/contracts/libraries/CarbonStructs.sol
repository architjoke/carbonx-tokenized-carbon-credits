// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

library CarbonStructs {
    struct Project {
        string location;
        uint256 areaHectares;
        uint256 co2Kg;
        uint8 confidence;
        string aiProofHash;
        bool verified;
    }
}
