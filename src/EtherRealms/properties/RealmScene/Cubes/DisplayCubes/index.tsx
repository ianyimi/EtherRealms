import DisplayCube from "./DisplayCube";
import fetchAssets from "utils/fetchAssets";
import { useEffect, useRef } from "react";
import { useRealm } from "../../../../components/RealmState";
import { GroupProps } from "@react-three/fiber";
import * as THREE from "three";
import { animated, useSpring } from "react-spring/three";

export default function DisplayCubes(props: { radius?: number, altAssets?: Record<string, any>[] } & GroupProps) {

  const group = useRef<THREE.Group>();
  const { radius = 10, altAssets } = props;
  const { id, assets, setAssets, owner, setOwner, currentUser, assetsFetched, setAssetsFetched } = useRealm();
  useEffect(() => {
    fetchAssets(id, setAssetsFetched).then((data) => {
      if (setOwner) setOwner(data.owner);
      if (setAssets) setAssets(data.assets);
    })
  }, []);
  console.log(assets)

  const { scale } = useSpring({
    scale: assetsFetched ? 1 : 0,
    config: {
      mass: 3
    }
  })

  const cubes = []
  if (assets && !altAssets) {
    for (let i=0; i<assets.length; i+=4) {
      cubes.push(
        <group rotation-y={assets.length%4 === 0 ? 2*i*Math.PI/(assets.length) : 2*i*Math.PI/(assets.length-1)} key={i}>
          <animated.group scale={scale} position-z={0-radius}>
            <DisplayCube assets={[assets[i], assets[i+1] || null, assets[i+2] || null, assets[i+3] || null]} position-y={1} />
          </animated.group>
        </group>
      )
    }
  } else if (altAssets) {
    for (let i=0; i<altAssets.length; i+=4) {
      cubes.push(
        <group rotation-y={altAssets.length%4 === 0 ? 2*i*Math.PI/(altAssets.length) : 2*i*Math.PI/(altAssets.length-1)} key={i}>
          <animated.group scale={scale} position-z={0-radius}>
            <DisplayCube assets={[altAssets[i], altAssets[i+1] || null, altAssets[i+2] || null, altAssets[i+3] || null]} />
          </animated.group>
        </group>
      )
    }
  }
  return (
    <group name="displayCubes"  {...props}>
      {cubes}
    </group>
  )
}
