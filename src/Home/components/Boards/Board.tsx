import { Floating } from "spacesvr";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

export default function Board(props?: GroupProps) {
  return (
    <group {...props}>
      <Floating height={0.1} speed={5}>
        <group rotation-y={Math.PI/2}>
          <RoundedBox
            args={[15, 10, 0.25]}
            material={new THREE.MeshStandardMaterial({ color: "white" })}
          />
        </group>
      </Floating>
    </group>
  )
}