import {GroupProps} from "@react-three/fiber";

export default function DisplayCube(props: GroupProps) {
  return (
    <group name="displayCube">
      <mesh>
        <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  )
}
