import { GroupProps } from "@react-three/fiber";
import { Box, Sphere, Text } from "@react-three/drei";
import Media from "../../components/Media";
import { useRealm } from "Realm/components/RealmState";
import {ReactNode, useRef} from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

export default function DisplayCube(props: { assets: Record<string, unknown>[] } & GroupProps) {

  const { assets, ...restProps } = props;
  const { scene: { theme = "Red" } } = useRealm();
  const light = useRef()

  // useHelper(light, SpotLightHelper, "teal")

  const images: ReactNode[] = [];
  for (let i=0; i<assets.length; i++) {
    if (!assets[i]) continue;
    const src = assets[i].animation_url && (assets[i].animation_url as string).endsWith(".mp4") ? assets[i].animation_url as string : assets[i].image_url as string;
    images.push(
      <group rotation-y={2*i*Math.PI/4} key={i}>
        <group position-z={1.1}>
          <Media src={src} link={assets[i].permalink as string} />
          <Text fontSize={0.1} color="black" position={[0, -0.9, -0.075]}>{assets[i].name as string}</Text>
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
