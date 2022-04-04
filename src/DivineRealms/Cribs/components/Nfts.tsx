import Nft from "../../components/Nft";
import { useWorld } from "./WorldState";
import { ReactNode, useEffect } from "react";
import fetchAssets from "../../../utils/fetchAssets";
import { animated, useSpring } from "@react-spring/three";
import { nftPositions } from "./utils/constants";

export default function Nfts() {
  const { assets, setAssets, setOwner, assetsFetched, setAssetsFetched } = useWorld();
  useEffect(() => {
    fetchAssets(2745, setAssetsFetched).then((data) => {
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
      <Nft asset={assets[i]} position={mesh.p} rotation={mesh.r} key={i} />
    )
  }

  return (
    <animated.group name="nfts" scale={scale}>
      {nfts}
      {/*<Nft asset={assets[2]} position={[5.45, 2, -52.5]} rotation-y={-Math.PI} />*/}
      {/*<Nft asset={assets[3]} position={[15.45, 2, -52.5]} rotation-y={-Math.PI} />*/}
    </animated.group>
  )
}
