import { Dispatch, SetStateAction } from "react";

// const CONTRACT_ADDRESS = "0xc631164b6cb1340b5123c9162f8558c866de1926" // DA
// const CONTRACT_ADDRESS = "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb" // CryptoPunks
const CONTRACT_ADDRESS = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" // BAYC
// const CONTRACT_ADDRESS = "0x495f947276749ce646f68ac8c248420045cb7b5e" // Divine Realms
const API_KEY = "yyfyE3yknqbNh_mywcFaiGiRpuwsUQtN";

export default async function fetchAssets(tokenId: number | string, setAssetsFetched: Dispatch<SetStateAction<boolean>>) {

  // const url = `https://api.opensea.io/api/v1/asset/${CONTRACT_ADDRESS}/${tokenId}/`;
  // console.log(url)
  // const data = await fetch(url)
  //   .catch(err => {
  //     console.error(err)
  //     console.log("closedSea")
  //   });
  // const contract = data && await data.json();
  // console.log(contract)
  //
  // const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${contract.owner.address}&order_by=sale_price&order_direction=desc&limit=20`)
  //   .catch(err => {
  //     console.error(err)
  //     console.log("closedSea")
  //   });
  // const walletData = response && await response.json();
  //
  // if (walletData && walletData.assets.length>0) {
  //   for (let i=0; i<walletData.assets.length; i++) {
  //     const asset = walletData.assets[i];
  //     const collectionData = await fetch(`https://api.opensea.io/api/v1/collection/${asset.collection.slug}`)
  //     if (!collectionData.ok) console.error("collection not found");
  //     const { collection } = await collectionData.json();
  //
  //     asset.totalSupply = collection.stats.total_supply;
  //   }
  //   setAssetsFetched(true);
  // }
  // return {
  //   owner: contract.owner,
  //   assets: walletData.assets
  // };

  // NFTPORT.XYZ API
  // const response = await fetch(`https://api.nftport.xyz/v0/accounts/${contract.owner.address}?chain=ethereum`, {
  //   "method": "GET",
  //   "headers": {
  //     "Content-Type": "application/json",
  //     "Authorization": `${process.env.NFT_PORT_API_KEY}`
  //   }
  // });
  // if (!response.ok) console.error("Error fetching contract data");
  // const assets = await response.json();
  // console.log(await assets);

  // ALCHEMY API
  const options: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}/getOwnersForToken`;
  const fetchURL = `${baseURL}?contractAddress=${CONTRACT_ADDRESS}&tokenId=${tokenId}`;
  const response = await fetch(fetchURL, options)
    .catch(error => console.log('error', error));
  const responseData = response && await response.json();
  // @ts-ignore
  const ownersData = responseData.owners.map(address =>
    `${address.substring(0, 2)}${address.substring(26)}`
  )
  console.log(ownersData)

  let walletData = [{}];
  if (ownersData.length > 0) {
    const baseURL2 = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}/getNFTs/`;
    const fetchURL2 = `${baseURL2}?owner=${ownersData[0]}`;
    const response2 = await fetch(fetchURL2, options)
      .catch(error => console.log('error', error));
    const response2Data = response2 && await response2.json();
    walletData = [];
    for (const nft of response2Data.ownedNfts) {
      walletData.push(
        {
          ...nft,
          id: {
            tokenId: parseInt(nft.id.tokenId).toString()
          }
        }
      )
    };
    console.log(walletData)
  }

  //
  // const nfts: any[] = [];
  // for (let i=0; i<Math.min(walletData.ownedNfts.length, 20); i++) {
  //   const nft = walletData.ownedNfts[i];
  //   nfts.push(
  //     await fetchMetadata(nft.contract.address, parseInt(nft.id.tokenId, 16))
  //   );
  // }
  // console.log(nfts);

  return {
    owners: ownersData,
    assets: walletData
  }

}

async function fetchMetadata(contractAddr: string, tokenId: number) {

  const options: RequestInit = {
    method: "GET",
    redirect: "follow"
  };

  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}/getNFTMetadata`;
  const tokenType = "erc721";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}&tokenType=${tokenType}`

  const response = await fetch(fetchURL, options)
    .catch(error => console.log('error', error));
  return response && await response.json();

}
