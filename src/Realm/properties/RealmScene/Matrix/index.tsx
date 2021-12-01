import { useMatrixMat } from "./components/matrix";
import { useMatrixMat2 } from "./components/matrix2";
import { useParticleMaterial } from "./components/particleMat";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {Box} from "@react-three/drei";
import {MeshBasicMaterial} from "three";

export default function Matrix() {

  const matrixMat = useMatrixMat(0.456);
  const matrixMat2 = useMatrixMat2(0.456);
  const particleMat = useParticleMaterial();

  const tex = useLoader(THREE.TextureLoader, "https://d1p3v0j4bqcb21.cloudfront.net/images/matrix.png")

  return (
    <group position-z={-2}>
      {/*<Box args={[1,1,1]} material={new MeshBasicMaterial({color: new THREE.Color("blue")})} />*/}
      <mesh material={matrixMat}>
        <planeBufferGeometry args={[5, 5]} />
        {/*<meshBasicMaterial map={tex} />*/}
      </mesh>
    </group>
  )
}
