import {useMatrixMat} from "./materials/matrix";
import {GroupProps} from "@react-three/fiber";

export default function MatrixSky(props: { color?: string, radius?: number } & GroupProps) {
  const { color = "green", radius = 300, ...restProps } = props;
  const mat = useMatrixMat(color);
  return (
    <group>
      <mesh material={mat}>
        <boxBufferGeometry args={[300, 5000, 300]} />
      </mesh>
    </group>
  )
}
