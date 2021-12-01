import {useMatrixMat2} from "../../RealmScene/Matrix/components/matrix2";
import {GroupProps} from "@react-three/fiber";

export default function MatrixSky(props: { radius?: number } & GroupProps) {
  const { radius = 300, ...restProps } = props;
  const mat = useMatrixMat2(0.465);
  return (
    <group>
      <mesh material={mat}>
        <boxBufferGeometry args={[300, 5000, 300]} />
      </mesh>
    </group>
  )
}
