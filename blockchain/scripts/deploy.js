async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const CarbonCredit = await ethers.getContractFactory("CarbonCredit");

  // ORACLE = deployer initially (we’ll update later)
  const contract = await CarbonCredit.deploy(deployer.address);
  await contract.waitForDeployment();

  console.log("CarbonCredit deployed to:", await contract.getAddress());
}

main().catch(console.error);
