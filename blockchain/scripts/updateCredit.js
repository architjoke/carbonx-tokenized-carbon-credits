const hre = require("hardhat");

async function main() {
  const [oracle1, oracle2] = await hre.ethers.getSigners();

  console.log("Oracle 1:", oracle1.address);
  console.log("Oracle 2:", oracle2.address);

  // 🔴 REPLACE with deployed contract address
  const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const CarbonCredit = await hre.ethers.getContractAt(
    "CarbonCredit",
    CONTRACT_ADDRESS
  );

  /* ===============================
     STEP 1: Submit Project (Oracle 1)
     =============================== */
  const submitTx = await CarbonCredit
    .connect(oracle1)
    .submitProject(
      "Jaipur, Rajasthan",
      2,                 // area in hectares
      7800,              // CO₂ captured (kg)
      82,                // AI confidence
      "QmAIProofCID123"  // IPFS proof CID
    );

  const submitReceipt = await submitTx.wait();
  const projectId = submitReceipt.logs[0].args.projectId.toString();

  console.log("Project submitted. ID:", projectId);

  /* ===============================
     STEP 2: Oracle approvals
     =============================== */
  const approveTx1 = await CarbonCredit
    .connect(oracle1)
    .approveProject(projectId);
  await approveTx1.wait();

  console.log("Oracle 1 approved project");

  const approveTx2 = await CarbonCredit
    .connect(oracle2)
    .approveProject(projectId);
  await approveTx2.wait();

  console.log("Oracle 2 approved project");

  /* ===============================
     STEP 3: Mint carbon credits
     =============================== */
  const mintTx = await CarbonCredit
    .connect(oracle1)
    .mintCredits(
      projectId,
      oracle1.address,
      1000 // 1000 kg CO₂ credits
    );

  await mintTx.wait();
  console.log("Carbon credits minted");

  /* ===============================
     STEP 4: (Optional) Retire credits
     =============================== */
  const retireTx = await CarbonCredit
    .connect(oracle1)
    .retireCredits(projectId, 200);

  await retireTx.wait();
  console.log("200 credits retired (burned)");

  console.log("✅ FULL CARBON CREDIT LIFECYCLE COMPLETE");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
