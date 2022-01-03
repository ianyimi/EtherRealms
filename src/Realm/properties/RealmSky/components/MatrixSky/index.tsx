import { useMatrixMat } from "./materials/matrix";
import { GroupProps } from "@react-three/fiber";
import { useRealm } from "../../../../components/RealmState";
import * as THREE from "three";

export default function MatrixSky(props: { color?: string, radius?: number } & GroupProps) {
  const { color = "green", radius = 300, ...restProps } = props;
  const { effects } = useRealm();
  const fogColor = effects?.color.toLowerCase()
  const mat = useMatrixMat(color, fogColor);
  return (
    <group>
      <mesh material={mat}>
        <boxBufferGeometry args={[300, 5000, 300]} />
      </mesh>
      <mesh>
        <boxBufferGeometry args={[350, 1950, 350]} />
        <meshBasicMaterial color={fogColor} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
