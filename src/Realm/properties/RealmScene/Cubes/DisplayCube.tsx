import { GroupProps } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import Media from "../components/Media";

export default function DisplayCube(props: { sources: string[] } & GroupProps) {

  const { sources, ...restProps } = props;

  const images = [];
  for (let i=0; i<sources.length; i++) {
    images.push(
      <group rotation-y={2*i*Math.PI/4}>
        <Media src={sources[i]} position-z={1.1} />
      </group>
    )
  }

  return (
    <group name="displayCube" {...restProps}>
      {images}
      <Box args={[2, 2, 2]}>
        <meshBasicMaterial color="blue" />
      </Box>
    </group>
  )
}
