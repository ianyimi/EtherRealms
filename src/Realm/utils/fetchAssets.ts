// const CONTRACT_ADDRESS = "0xc631164b6cb1340b5123c9162f8558c866de1926"
const CONTRACT_ADDRESS = "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"

export default async function fetchAssets(tokenId: number) {
  const data = await fetch(`https://api.opensea.io/api/v1/asset/${CONTRACT_ADDRESS}/${tokenId}/`)
  if (!data.ok) {
    console.error("Error fetching contract data")
  }
  const contract = await data.json();
  const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${contract.owner.address}&order_by=sale_price&order_direction=desc&limit=20`);
  if (!response.ok) {
    console.error("Error fetching assets")
  }
  const assets = await response.json()
  return {
    owner: contract.owner,
    assets: assets.assets
  };
}
