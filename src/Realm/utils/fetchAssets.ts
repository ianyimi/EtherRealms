

// https://api.opensea.io/api/v1/assets?owner=${address}

export default async function fetchAssets(tokenId: number) {
  const assetContract = "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb";
  const data = await fetch(`https://api.opensea.io/api/v1/asset/${assetContract}/${tokenId}/`)
  if (!data.ok) {
    console.error("Error fetching contract data")
  }
  const contract = await data.json();
  console.log(contract.owner)
  const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${contract.owner.address}&order_by=sale_price&order_direction=desc&limit=50`);
  if (!response.ok) {
    console.error("Error fetching assets")
  }
  const assets = await response.json()
  return assets.assets;
}
