import { GroupProps } from "@react-three/fiber";
import { Box, Sphere, Text } from "@react-three/drei";
import Nft from "../../components/Nft";
import { useRealm } from "Realm/components/RealmState";
import {ReactNode, useRef} from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

export default function DisplayCube(props: { assets: Record<string, any>[] } & GroupProps) {

  const { assets, ...restProps } = props;
  const { scene: { theme = "Red" } } = useRealm();
  const light = useRef()

  // useHelper(light, SpotLightHelper, "teal")

  const images: ReactNode[] = [];
  for (let i=0; i<assets.length; i++) {
    if (!assets[i]) continue;
    const src = assets[i].animation_url && (assets[i].animation_url).endsWith(".mp4") ? assets[i].animation_url : assets[i].image_url;
    images.push(
      <group rotation-y={2*i*Math.PI/4} key={i}>
        <group position-z={1.1}>
          <Nft asset={assets[i]} />
        </group>
        {/*<spotLight ref={light} position={[0, 1, 10]} intensity={0.1} distance={50} castShadow />*/}
      </group>
    )
  }

  return (
    <group name="displayCube" {...restProps}>
      {images}
      <Box args={[2, 2, 2]} castShadow receiveShadow>
        <meshStandardMaterial color={theme.toLowerCase()} />
      </Box>
    </group>
  )
}
