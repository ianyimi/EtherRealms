/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { useRef } from 'react'
import { Sphere } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

const EARTH_URL = "https://d1p3v0j4bqcb21.cloudfront.net/textures/Terran+08+(Diffuse).png";
const CLOUDS_URL = "https://d1p3v0j4bqcb21.cloudfront.net/textures/Terran+08+(Clouds).png";
const SPECULAR_URL = "https://d1p3v0j4bqcb21.cloudfront.net/textures/Terran+08+(Specular).png";
const LIGHTS_URL = "https://d1p3v0j4bqcb21.cloudfront.net/textures/Terran+08+(Lights+Urban).png";

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const earthTex = useLoader(THREE.TextureLoader, EARTH_URL);
  const cloudsTex = useLoader(THREE.TextureLoader, CLOUDS_URL);
  const lightsTex = useLoader(THREE.TextureLoader, LIGHTS_URL);
  const displacementTex = useLoader(THREE.TextureLoader, SPECULAR_URL);

  return (
    <group ref={group} {...props} name="earth">
      <Sphere args={[1, 30, 30]} name="terrain">
        <meshStandardMaterial
          map={earthTex}
          // displacementMap={displacementTex}
          // displacementScale={0.05}
        />
      </Sphere>
      <Sphere args={[1.0025, 30, 30]} name="lights">
        <meshStandardMaterial
          map={lightsTex}
          fog={false}
          transparent
        />
      </Sphere>
      <Sphere args={[1.01, 30, 30]} name="clouds">
        <meshStandardMaterial
          map={cloudsTex}
          transparent
        />
      </Sphere>
    </group>
  )
}

