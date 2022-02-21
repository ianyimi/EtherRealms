import * as THREE from "three";
import { GroupProps, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";

export default function BrandLogo(props?: GroupProps) {

  const brand = useRef();
  const light = useRef();
  const font = useLoader(THREE.FontLoader, "/fonts/Etherrealms.json");
  const size = 15
  const config = useMemo(() => ({
    font: font,
    size: size,
    height: size/10,
    curveSegments: 32,
    // bevelEnabled: true,
    // bevelThickness: 0.2,
    // bevelSize: 0.1,
    // bevelOffset: 0.1,
    // bevelSegments: 32
  }), [font])

  return (
    <group {...props}>
      <mesh ref={brand} rotation-x={Math.PI/6}>
        <textBufferGeometry args={["EtherRealms", config]} />
        <meshStandardMaterial metalness={0.2} roughness={0.3} color="white" />
      </mesh>
      <ambientLight ref={light} intensity={0.625} />
      <EffectComposer
        multisampling={0}
        disableNormalPass
      >
        <SelectiveBloom
          lights={[light]}
          selection={[brand]}
          luminanceThreshold={0.25}
          bloomRadius={0.05}
        />
      </EffectComposer>
    </group>
  )
}
