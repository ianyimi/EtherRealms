// @ts-ignore
import * as culori from "culori";
import { GroupProps } from "@react-three/fiber";
import { Color } from "three";
import { usePortalMat } from "./materials/portal";

type PortalSky = {
  mainColor?: string;
  backgroundColor?: string;
  radius?: number
} & GroupProps;

export default function PortalSky(props: PortalSky) {
  const { mainColor = "lightblue", backgroundColor = "white", radius = 300, ...restProps } = props;
  const mat = usePortalMat(mainColor, backgroundColor);
  return (
    <group {...restProps} rotation-x={-Math.PI/2} name="cloudy-sky">
      <mesh material={mat}>
        <sphereBufferGeometry args={[radius, 50, 50]} />
      </mesh>
    </group>
  );
}
