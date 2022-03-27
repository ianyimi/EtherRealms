import Nft from "../../components/Nft";
import { useWorld } from "./WorldState";
import {useEffect} from "react";
import fetchAssets from "../../../utils/fetchAssets";
import { animated, useSpring } from "@react-spring/three";

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

  return (
    assets.length > 0 && <animated.group scale={scale}>
      <Nft asset={assets[3]} position={[5, 2, -10]} rotation-y={-Math.PI/2} />
    </animated.group>
  )
}
