import {GroupProps} from "@react-three/fiber";

export default function Torus(props: GroupProps) {
  return (
    <group rotation-x={Math.PI/2} {...props}>
      <mesh>
        <torusBufferGeometry args={[25, 0.5, 15, 100]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  )
}