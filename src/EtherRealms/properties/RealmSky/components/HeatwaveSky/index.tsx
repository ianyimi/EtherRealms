// @ts-ignore
import * as culori from "culori";
import { GroupProps } from "@react-three/fiber";
import { Color } from "three";
import { useHeatwaveMat } from "./materials/heatwave";

type HeatwaveSky = {
  mainColor?: string;
  backgroundColor?: string;
  tertiaryColor?: string;
  speed?: number;
  permutations?: number;
  iterations?: number;
  radius?: number;
} & GroupProps;

export default function HeatwaveSky(props: HeatwaveSky) {
  const { mainColor = "lightblue", backgroundColor = "white", tertiaryColor = "pink", speed = 1, permutations = 10, iterations = 1, radius = 300, ...restProps } = props;
  const mat = useHeatwaveMat(mainColor, backgroundColor, tertiaryColor, speed, permutations, iterations);
  return (
    <group {...restProps} rotation-x={-Math.PI/2} name="cloudy-sky">
      <mesh material={mat}>
        <sphereBufferGeometry args={[radius, 50, 50]} />
      </mesh>
    </group>
  );
}
