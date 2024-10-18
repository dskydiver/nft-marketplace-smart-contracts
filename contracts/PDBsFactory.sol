// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "./PDBs.sol";

/// @title KaiKongs Factory
/// @author dskydiver
/// @notice users can create new collections
contract PDBssFactory {
    mapping(address => address[]) public nfts;

    mapping(address => bool) private _PDBsNFT;

    event CreatedNFTCollection(address indexed creator, address indexed nft);

    function createCollection(
        string memory _name,
        string memory _symbol,
        uint256 _royaltyFee,
        address _royaltyRecipient,
        uint256 _mintPrice,
        uint256 _maxSupply,
        string memory baseURI_
    ) external {
        PDBs nft = new PDBs(
            _name,
            _symbol,
            msg.sender,
            _royaltyFee,
            _royaltyRecipient,
            _mintPrice,
            _maxSupply,
            baseURI_
        );

        nfts[msg.sender].push(address(nft));
        _PDBsNFT[address(nft)] = true;
        emit CreatedNFTCollection(msg.sender, address(nft));
    }

    function importCollection(address _address) external {
        nfts[msg.sender].push(_address);
        _PDBsNFT[_address] = true;
        emit CreatedNFTCollection(msg.sender, _address);
    }

    function getUserCollections(
        address account
    ) external view returns (address[] memory) {
        return nfts[account];
    }

    function isPDBsNFT(address _nft) external view returns (bool) {
        return _PDBsNFT[_nft];
    }
}
