// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./interfaces/ICarbonCredit.sol";
import "./libraries/CarbonStructs.sol";
import "./roles/CarbonRoles.sol";

contract CarbonCredit is ERC1155, CarbonRoles, ICarbonCredit {
    using Strings for uint256;

    /* ========== STATE ========== */

    uint256 public projectCounter;
    uint256 public constant CREDIT_TOKEN_ID = 1;

    mapping(uint256 => CarbonStructs.Project) public projects;
    mapping(uint256 => uint256) public projectCreditsMinted;

    /* ========== EVENTS ========== */

    event ProjectVerified(
        uint256 indexed projectId,
        string location,
        uint256 co2Kg,
        uint8 confidence,
        string aiProofHash
    );

    event CreditsMinted(
        uint256 indexed projectId,
        address indexed to,
        uint256 amount
    );

    /* ========== CONSTRUCTOR ========== */

    constructor(address initialOwner)
        ERC1155("https://api.example.com/metadata/{id}.json")
        Ownable(initialOwner)
    {
        // make deployer the first verifier
        verifiers[initialOwner] = true;
    }

    /* ========== CORE LOGIC ========== */

    function verifyProject(
        string calldata location,
        uint256 areaHectares,
        uint256 co2Kg,
        uint8 confidence,
        string calldata aiProofHash
    ) external override onlyVerifier returns (uint256) {
        require(confidence >= 70, "Low AI confidence");

        projectCounter++;
        uint256 projectId = projectCounter;

        projects[projectId] = CarbonStructs.Project({
            location: location,
            areaHectares: areaHectares,
            co2Kg: co2Kg,
            confidence: confidence,
            aiProofHash: aiProofHash,
            verified: true
        });

        emit ProjectVerified(
            projectId,
            location,
            co2Kg,
            confidence,
            aiProofHash
        );

        return projectId;
    }

    function mintCredits(
        uint256 projectId,
        address to,
        uint256 amount
    ) external override onlyVerifier {
        require(projects[projectId].verified, "Project not verified");
        require(
            projectCreditsMinted[projectId] + amount <= projects[projectId].co2Kg,
            "Exceeds verified CO2"
        );

        projectCreditsMinted[projectId] += amount;
        _mint(to, CREDIT_TOKEN_ID, amount, "");

        emit CreditsMinted(projectId, to, amount);
    }

    /* ========== VIEW HELPERS ========== */

    function uri(uint256 id) public pure override returns (string memory) {
        return string(
            abi.encodePacked(
                "https://api.example.com/metadata/",
                id.toString(),
                ".json"
            )
        );
    }
}
