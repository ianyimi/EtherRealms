import { GroupProps } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import Media from "../../components/Media";
import { useRealm } from "Realm/components/RealmState";
import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

export default function DisplayCube(props: { sources: string[] } & GroupProps) {

  const { sources, ...restProps } = props;
  const { scene: { theme = "Red" } } = useRealm();
  const light = useRef()

  useHelper(light, SpotLightHelper, "teal")

  const images = [];
  for (let i=0; i<sources.length; i++) {
    images.push(
      <group rotation-y={2*i*Math.PI/4} key={i}>
        <Media src={sources[i]} position-z={1.1} />
        <spotLight ref={light} position={[0, 1, 10]} intensity={0.1} distance={50} castShadow />
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
