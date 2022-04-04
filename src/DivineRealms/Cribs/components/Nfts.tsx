import Nft from "../../components/Nft";
import { useWorld } from "./WorldState";
import { ReactNode, useEffect } from "react";
import fetchAssets from "../../../utils/fetchAssets";
import { animated, useSpring } from "@react-spring/three";
import { nftPositions } from "./utils/constants";

const STATION_TOKEN_ID = "40539505412060235591267077459928418936006271470437343391270068673212139438081";

export default function Nfts() {
  const { assets, setAssets, setOwner, assetsFetched, setAssetsFetched } = useWorld();
  useEffect(() => {
    fetchAssets(STATION_TOKEN_ID, setAssetsFetched).then((data) => {
      if (setOwner) setOwner(data.owner);
      if (setAssets) setAssets(data.assets);
    })
  }, []);

  const { scale } = useSpring({
    scale: assetsFetched ? 1 : 0,
    config: {
      mass: 1
    }
  })

  const nfts: ReactNode[] = [];
  for (let i=0; i<Math.min(assets.length, nftPositions.length); i++) {
    const mesh = nftPositions[i];
    nfts.push(
      <Nft asset={assets[i]} index={i} position={mesh.p} rotation={mesh.r} key={i} />
    )
  }

  return (
    <animated.group name="nfts" scale={scale}>
      {nfts}
    </animated.group>
  )
}
