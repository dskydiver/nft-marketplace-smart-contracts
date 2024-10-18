import { ethers } from "hardhat"

async function main() {
  const [owner, user1, user2] = await ethers.getSigners()
  let baseURI =
    "ipfs://QmXvw4bP6znmxUQkBxKrRDHeoi2uTNYhQrXPKTiTL13Gsy/"

  const PDBs = await ethers.getContractFactory("PDBs")

  const pdbs = await PDBs.deploy('PDB Buds', 'PB', owner.address, 0, owner.address, ethers.parseEther('0.01'), 10000, baseURI)
  console.log("PDBs is deployed to: ", await pdbs.getAddress())

  await (
    await pdbs.connect(owner).mint(owner.address, 3, {
      value: ethers.parseEther("0.03"),
    })
  ).wait()

  console.log('PDBs minted ', (await pdbs.balanceOf(owner.address)).toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})