// @ts-ignore
import * as culori from "culori";
import { GroupProps } from "@react-three/fiber";
import { Color } from "three";
import { useSkyMat } from "./materials/sky";

type GradientSky = {
  radius?: number;
} & GroupProps;

const getGLSLCol = (c: Color) => {
  const hex = c.getHex();
  return [
    ((hex >> 16) & 0xff) / 255,
    ((hex >> 8) & 0xff) / 255,
    (hex & 0xff) / 255,
  ];
};

export default function CloudySky(props: GradientSky) {
  const { radius = 300, ...restProps } = props;

  const mat = useSkyMat();

  return (
    <group {...restProps} rotation-x={-Math.PI/2} name="cloudy-sky">
      <mesh material={mat}>
        <sphereBufferGeometry args={[radius, 50, 50]} />
      </mesh>
    </group>
  );
}
