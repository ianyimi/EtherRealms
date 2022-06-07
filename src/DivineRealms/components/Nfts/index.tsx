import Nft from "./Nft";
import { useWorld } from "../WorldState";
import { ReactNode } from "react";
import { animated, useSpring } from "@react-spring/three";
import { Vector3, Euler } from "three";

type NftsProps = {
  positions: {p: Vector3, r: Euler}[],
}

export default function Index(props: NftsProps) {
  const { positions } = props;
  const { assets, assetsFetched } = useWorld();

  const { scale } = useSpring({
    scale: assetsFetched ? 1 : 0,
    config: {
      mass: 1
    }
  })

  const nfts: ReactNode[] = [];
  for (let i=0; i<Math.min(assets?.length, positions.length); i++) {
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
