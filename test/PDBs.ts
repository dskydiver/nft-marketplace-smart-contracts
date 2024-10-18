import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"
import hre from "hardhat"

describe("PDBs", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployPDBsFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners()

    const PDBs = await hre.ethers.getContractFactory("PDBs")
    const pdbs = await PDBs.deploy('Test', 'T', owner.address, 0, owner.address, hre.ethers.parseEther('1.0'), 10000, 'ipfs://QmXvw4bP6znmxUQkBxKrRDHeoi2uTNYhQrXPKTiTL13Gsy/')

    return { pdbs, owner, otherAccount }
  }

  describe("Deployment", function () {
    it("Should set the right params", async function () {
      const { pdbs } = await loadFixture(deployPDBsFixture)

      expect(await pdbs.baseURI()).to.equal('ipfs://QmXvw4bP6znmxUQkBxKrRDHeoi2uTNYhQrXPKTiTL13Gsy/')
    })

    it("Should set the right owner", async function () {
      const { pdbs, owner } = await loadFixture(deployPDBsFixture)

      expect(await pdbs.owner()).to.equal(owner.address)
    })

    it("Should receive and store the funds to lock", async function () {
      const { pdbs } = await loadFixture(
        deployPDBsFixture
      )

      expect(await pdbs.totalSupply()).to.equal(
        0
      )
    })

    it("Should fail if the base uri is not right format", async function () {
      // We don't use the fixture here because we want a different deployment
      const PDBs = await hre.ethers.getContractFactory("PDBs")
      const [owner, otherAccount] = await hre.ethers.getSigners()
      await expect(PDBs.deploy('Test', 'T', owner.address, 0, owner.address, hre.ethers.parseEther('1.0'), 10000, 'https://ipfs://QmXvw4bP6znmxUQkBxKrRDHeoi2uTNYhQrXPKTiTL13Gsy/')).to.be.revertedWith(
        "must start with 'ipfs://'"
      )
    })
  })

  describe("Mints", function () {
    describe("Validations", function () {
      it("Should revert with the right error ", async function () {
        const { pdbs, otherAccount } = await loadFixture(deployPDBsFixture)

        await expect(pdbs.connect(otherAccount).mint(otherAccount.address, 5, { value: hre.ethers.parseEther('5.0') })).to.be.revertedWith(
          "You can only mint 3 at once."
        )
      })
    })
  })
})
