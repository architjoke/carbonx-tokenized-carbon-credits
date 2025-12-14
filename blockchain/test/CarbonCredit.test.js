const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonCredit Contract", function () {
  let CarbonCredit;
  let carbonCredit;
  let owner;
  let oracle;
  let user;

  beforeEach(async function () {
    [owner, oracle, user] = await ethers.getSigners();

    CarbonCredit = await ethers.getContractFactory("CarbonCredit");
    carbonCredit = await CarbonCredit.deploy(owner.address);
    await carbonCredit.waitForDeployment();

    // grant ORACLE_ROLE to oracle
    const ORACLE_ROLE = await carbonCredit.ORACLE_ROLE();
    await carbonCredit.grantRole(ORACLE_ROLE, oracle.address);
  });

  /* ------------------------------------------------ */
  /* DEPLOYMENT                                      */
  /* ------------------------------------------------ */

  it("should deploy with correct owner", async function () {
    expect(await carbonCredit.owner()).to.equal(owner.address);
  });

  it("should set correct name & symbol", async function () {
    expect(await carbonCredit.name()).to.equal("Carbon Credit");
    expect(await carbonCredit.symbol()).to.equal("CO2");
  });

  /* ------------------------------------------------ */
  /* PROJECT SUBMISSION                               */
  /* ------------------------------------------------ */

  it("should allow oracle to submit a project", async function () {
    await expect(
      carbonCredit.connect(oracle).submitProject(
        "India - Solar Farm",
        10,      // area
        1000,    // CO2 saved
        85,      // confidence
        "ipfs://proofCID"
      )
    ).to.emit(carbonCredit, "ProjectSubmitted");
  });

  it("should reject project submission from non-oracle", async function () {
    await expect(
      carbonCredit.connect(user).submitProject(
        "Fake Project",
        5,
        500,
        40,
        "ipfs://fake"
      )
    ).to.be.reverted;
  });

  /* ------------------------------------------------ */
  /* VERIFICATION & MINTING                           */
  /* ------------------------------------------------ */

  it("should verify project and mint carbon credits", async function () {
    // submit project
    await carbonCredit.connect(oracle).submitProject(
      "Wind Project",
      20,
      2000,
      90,
      "ipfs://wind"
    );

    // verify project
    await expect(
      carbonCredit.connect(oracle).verifyProject(0)
    ).to.emit(carbonCredit, "ProjectVerified");

    // credits should be minted
    const balance = await carbonCredit.balanceOf(
      owner.address,
      0
    );

    expect(balance).to.be.gt(0);
  });

  it("should not verify project twice", async function () {
    await carbonCredit.connect(oracle).submitProject(
      "Hydro",
      15,
      1500,
      88,
      "ipfs://hydro"
    );

    await carbonCredit.connect(oracle).verifyProject(0);

    await expect(
      carbonCredit.connect(oracle).verifyProject(0)
    ).to.be.revertedWith("Already verified");
  });

  /* ------------------------------------------------ */
  /* EDGE CASES                                      */
  /* ------------------------------------------------ */

  it("should reject verification by non-oracle", async function () {
    await carbonCredit.connect(oracle).submitProject(
      "Forest",
      30,
      3000,
      92,
      "ipfs://forest"
    );

    await expect(
      carbonCredit.connect(user).verifyProject(0)
    ).to.be.reverted;
  });
});
