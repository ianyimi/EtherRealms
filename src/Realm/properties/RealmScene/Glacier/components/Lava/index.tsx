import {useLavaMat} from "./materials/lava";
import {GroupProps} from "@react-three/fiber";

export default function Lava(props: GroupProps) {
  const mat = useLavaMat();
  return (
    <group rotation-x={-Math.PI/2} {...props}>
      <mesh material={mat} />
    </group>
  )
}
