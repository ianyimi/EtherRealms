

// https://api.opensea.io/api/v1/assets?owner=${address}

export default async function fetchAssets(accountId: string) {
  const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${accountId}&limit=50`);
  if (response.ok) {
    console.error("Error fetching assets")
  }
  const assets = await response.json()
  return assets.assets;
}
