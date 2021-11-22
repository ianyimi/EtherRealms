import { useMatrixMat } from "./components/matrix";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";

export default function Matrix() {

  const matrixMat = useMatrixMat(0.456);

  const tex = useLoader(THREE.TextureLoader, "https://d1p3v0j4bqcb21.cloudfront.net/images/matrix.png")

  return (
    <group position-z={-2}>
      <mesh>
        <planeBufferGeometry args={[2, 2]} />
        <meshBasicMaterial map={tex} />
      </mesh>
    </group>
  )
}