import { SpotLight, useDepthBuffer, useHelper } from "@react-three/drei"
import { GroupProps, useFrame, useThree} from "@react-three/fiber";
import {Object3D, Vector3, DirectionalLightHelper, DirectionalLight, Euler} from "three";
import { useLimiter } from "spacesvr";
import {Dispatch, MutableRefObject, SetStateAction, useRef} from "react";
import * as THREE from "three";

type LightProps = {
  position?: Vector3,
  rotation?: Euler,
} & GroupProps

export default function VolumetricLight(props: LightProps) {

  const { position = new Vector3(), rotation = new Euler(), ...restProps } = props
  const { scene } = useThree();
  const mesh = useRef<THREE.Mesh>();
  const dummyObj = new Object3D();
  const dummyObj2 = new Object3D();
  const dummyObj3 = new Object3D();
  dummyObj.position.set(0.47, 0, -6.63);
  dummyObj2.position.set(0.19, 0, -6.63);
  dummyObj3.position.set(0.32, 0, -6.63);
  const dummyGroup = new THREE.Group();
  dummyGroup.add(dummyObj),
    dummyGroup.add(dummyObj2),
    dummyGroup.add(dummyObj3);
  dummyGroup.rotation.set(rotation.x, rotation.y, rotation.z)
  dummyGroup.position.set(position.x, position.y, position.z)

  const light1 = useRef();
  scene.add(dummyObj3)
  useHelper(light1, DirectionalLightHelper)
  // setObjectRefs([...objectRefs, mesh]);

  return (
    <group name="VolumetricLight" {...restProps}>
      <mesh ref={mesh} position={[0.34, 3.7, -6.63]}>
        <boxBufferGeometry args={[0.71, 0.06, 0.29]} />
        <meshStandardMaterial color={"white"} emissive={new THREE.Color("#ffffff")} emissiveIntensity={3} />
      </mesh>
      <directionalLight ref={light1} color="#ffffff" position={[0.32, 3.83, -6.63]} intensity={0.025} target={dummyObj3} castShadow />
      <SpotLight color="#ffffff" angle={Math.PI/10} position={[0.47, 3.83, -6.63]} target={dummyObj} castShadow />
      <SpotLight color="#ffffff" angle={Math.PI/10} position={[0.19, 3.83, -6.63]} target={dummyObj2} castShadow />
    </group>
  )
}
