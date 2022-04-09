import Nft from "../../components/Nft";
import { useWorld } from "./WorldState";
import { ReactNode, useEffect } from "react";
import fetchAssets from "../../../utils/fetchAssets";
import { animated, useSpring } from "@react-spring/three";
import { nftPositions } from "./utils/constants";

const NULL_ADDRESS =  "0x0000000000000000000000000000000000000000";
const DEPLOYER_WALLET = "0x59A08c0433D06080aA56E14D39B0300095A4fe34";
// const STATION_TOKEN_ID = "40539505412060235591267077459928418936006271470437343391270068673212139438081";
const STATION_TOKEN_ID = 1045;

export default function Nfts() {
  const { assets, setAssets, owners, setOwners, assetsFetched, setAssetsFetched } = useWorld();
  useEffect(() => {
    fetchAssets(STATION_TOKEN_ID, setAssetsFetched).then((data) => {
      if (setOwners) setOwners(data.owners);
      if (setAssets) setAssets(data.assets);
    })
  }, []);

  const { scale } = useSpring({
    scale: assetsFetched ? 1 : 0,
    config: {
      mass: 1
    }
  })

  const unowned = (owners.length === 0) || (owners[0] === NULL_ADDRESS) || (owners[0] === DEPLOYER_WALLET);
  const nfts: ReactNode[] = [];
  const nftCount = unowned ? nftPositions.length : Math.min(assets.length, nftPositions.length);
  console.log(nftCount)
  for (let i=0; i<nftCount; i++) {
    const mesh = nftPositions[i];
    nfts.push(
      <Nft asset={assets[i]} index={i} owned={!unowned} position={mesh.p} rotation={mesh.r} key={i} />
    )
  }

  return (
    <animated.group name="nfts" scale={scale}>
      {nfts}
    </animated.group>
  )
}
