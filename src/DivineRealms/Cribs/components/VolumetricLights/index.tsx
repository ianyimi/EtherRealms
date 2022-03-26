import VolumetricLight from "./VolumetricLight";
import {DirectionalLightHelper, Euler, Object3D, Vector3} from "three";
import {useRef} from "react";
import {useHelper} from "@react-three/drei";
import {useThree} from "@react-three/fiber";

export default function VolumetricLights() {
  const { scene } = useThree();
  const light1 = useRef();
  // useHelper(light1, DirectionalLightHelper)

  const dummyObj = new Object3D()
  dummyObj.position.set(46, 14, -79)
  scene.add(dummyObj)

  return (
    <group>
      <group name="mainLight">
        <directionalLight ref={light1} position={[100, 40, -100]} intensity={0.15} target={dummyObj} />
        <mesh position={[46, 14, -79]}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>
      <VolumetricLight position={new Vector3(0.34, 3.7, -6.63)} />
      <VolumetricLight position={new Vector3(0.34, 3.7, -22.565)} />
      <VolumetricLight position={new Vector3(-0.34, 3.7, -14.21)} />
      <VolumetricLight position={new Vector3(-2.73, 3.7, -29.72)} rotation={new Euler(0, 1.58, 0)} />
      <VolumetricLight position={new Vector3(5.55, 3.7, -30.43)} rotation={new Euler(0, 1.58, 0)} />
      <VolumetricLight position={new Vector3(12.89, 3.7, -29.72)} rotation={new Euler(0, 1.58, 0)} />
      <VolumetricLight position={new Vector3(10.25, 3.7, -37.505)} />
      <VolumetricLight position={new Vector3(9.52, 3.7, -46.115)} />
      <VolumetricLight position={new Vector3(10.25, 3.7, -55.355)} />
    </group>
  )
}
