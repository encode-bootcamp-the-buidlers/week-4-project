# Homework Report

## Team name: The Buidlers

## Team members:

- Tobias Leinss <caruso33@web.de>
- Lucien Akchoté <l.akchote@gmail.com>
- Alok Sahay <alok.sahay87@gmail.com>
- Ana G. Jordano <anagjordano@gmail.com>
- Vid Topolovec <weetopol@gmail.com>
- Sid Lamichhane <sid.lam.1997@gmail.com>


### GoatToken

- Ropsten address of deployed contract: 0x4e426e47d0ff0a6818838c5de16d70bff65d5615
- Transaction: 0xfbec16915d8ae2929d0e3c0a2f929636e1f21beeb7fed04e0415ea4318757ddf
- [Block Explorer](https://ropsten.etherscan.io/address/0x4e426e47d0ff0a6818838c5de16d70bff65d5615)

### Run local IPFS node and upload 10 images to this node

- peer ID:  12D3KooWJZWfa6tB5PJwAJJbXgm27Z3M2wHuYgEePHUmCY6k74Hp
- agent:    go-ipfsv0.13.0 desktop
- Links to images of all ten GOAT Tokens:
    1. https://ipfs.io/ipfs/Qmb9WzL9BDaSGJjRj59H9esi2k4PJQQPtGR9nT3R1R4ErT
    2. https://ipfs.io/ipfs/Qmd7n4ZLFuHfjkUSDVfeLCJX9gvbPGdEt35pZtp1dvNpf5
    3. https://ipfs.io/ipfs/Qmd63VhjRK3er8PFQURfsp6vV3bBiQbwZTpQ1wsKaiaGBx
    4. https://ipfs.io/ipfs/QmdQKYiwupHDTK3Wiu2hLaE9zj6YuB7jGoDTeouovYpgq2
    5. https://ipfs.io/ipfs/QmdvNmoHorPMCKkFQV4YHkxwpj9P9K2KXNkaZiqdbiYZbt
    6. https://ipfs.io/ipfs/QmUKXuqEuR4EyiSHmHHVEDD7T81bAoSCiLZdkL6325FgF6
    7. https://ipfs.io/ipfs/QmVLiUoBnEBDjgTX9Qepzs7mUWvz5LC9uZ8suhgRZEHppu
    8. https://ipfs.io/ipfs/QmWhizFTbfPPX3RxzQtjyL8DX1FARrXUXf4JW5iKSBht7p
    9. https://ipfs.io/ipfs/QmXnmQbtsLHmx8MG8x2K1PbLEoY2X76CZ75MCA4MyuXRvp
    10. https://ipfs.io/ipfs/QmYfybB7ZF84UbF3KWPdwVu1JTiEwP77Dnkfyaqpt8pVop

### Create a JSON and build metadata descriptions for 10 NFTs, each using a unique image

### Make a GET method in the API to get the metadata by id

Get metadata is implemented in Backend/src/app.controller.ts and Backend/src/app.service.ts

### Deploy a NFT Collection and mint 10 NFTs, and assign the API endpoint to the token URI

```shell
yarn ts-node scripts/deploy.ts localhost
yarn ts-node scripts/mint.ts CONTRACT_ADDRESS RECEIVER_ADDRESS ./nft_data/db.json localhost
```
### Integrate this NFT Collection contract and APIs in a frontend application to display NFTs metadata and images



