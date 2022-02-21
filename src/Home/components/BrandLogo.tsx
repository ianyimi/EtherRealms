import * as THREE from "three";
import { GroupProps, useLoader } from "@react-three/fiber";
import { useMemo } from "react";

export default function BrandLogo(props?: GroupProps) {

  const font = useLoader(THREE.FontLoader, "/fonts/Etherrealms.json");
  const size = 15
  const config = useMemo(() => ({
    font: font,
    size: size,
    height: size/5,
    curveSegments: 32,
    // bevelEnabled: true,
    // bevelThickness: 0.2,
    // bevelSize: 0.1,
    // bevelOffset: 0.1,
    // bevelSegments: 32
  }), [font])

  return (
    <group {...props}>
      <mesh>
        <textBufferGeometry args={["EtherRealms", config]} />
        <meshStandardMaterial metalness={0.2} roughness={0.3} color="brown" />
      </mesh>
    </group>
  )
}
