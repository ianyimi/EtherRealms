import Nft from "./Nft";
import { useWorld } from "../Cribs/components/WorldState";
import { ReactNode, useEffect } from "react";
import fetchAssets from "../../utils/fetchAssets";
import { animated, useSpring } from "@react-spring/three";
import { Vector3, Euler } from "three";

type NftsProps = {
  tokenId: string,
  positions: {p: Vector3, r: Euler}[]
}

export default function Nfts(props: NftsProps) {
  const { tokenId, positions } = props;
  const { assets, setAssets, setOwner, assetsFetched, setAssetsFetched } = useWorld();
  useEffect(() => {
    fetchAssets(tokenId, setAssetsFetched).then((data) => {
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
  for (let i=0; i<Math.min(assets.length, positions.length); i++) {
    const mesh = positions[i];
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
