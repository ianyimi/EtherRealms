import {GroupProps} from "@react-three/fiber";
import { useWorld } from "./WorldState";
import {useEffect, useRef} from "react";
import * as THREE from "three";

export default function Torus(props: GroupProps) {

  const { bloomObjects, setBloomObjects } = useWorld();
  const meshRef1 = useRef<THREE.Mesh>();
  const meshRef2 = useRef<THREE.Mesh>();

  useEffect(() => {
    setBloomObjects([...bloomObjects, meshRef1, meshRef2])
  }, [])

  return (
    <group rotation-x={Math.PI/2} {...props}>
      <mesh ref={meshRef1}>
        <torusBufferGeometry args={[25, 0.5, 15, 100]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh ref={meshRef2}>
        <sphereBufferGeometry args={[0.5, 30, 30]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  )
}