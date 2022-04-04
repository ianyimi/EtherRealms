import { SpotLight, useDepthBuffer, useHelper } from "@react-three/drei"
import { GroupProps, useFrame, useThree} from "@react-three/fiber";
import { Object3D, Vector3, DirectionalLightHelper, DirectionalLight, Euler, SpotLightHelper, AudioAnalyser } from "three";
import { useLimiter, Audio } from "spacesvr";
import { Dispatch, MutableRefObject, Ref, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from "three";
import {useWorld} from "../WorldState";

type LightProps = {
  position?: Vector3,
  rotation?: Euler,
} & GroupProps

export default function VolumetricLight(props: LightProps) {

  const { lights, setLights } = useWorld();
  const { position = new Vector3(), rotation = new Euler(), ...restProps } = props
  const { scene } = useThree();
  const mesh = useRef<THREE.Mesh>();
  const light = useRef<THREE.Group>();
  const dummyObj = new Object3D();
  const dummyObj2 = new Object3D();
  const dummyObj3 = new Object3D();
  dummyObj.position.set(0.13+position.x, position.y-5, position.z);
  dummyObj2.position.set(-0.15+position.x, position.y-5, position.z);
  dummyObj3.position.set(-0.02+position.x, position.y-5, position.z);

  const light1 = useRef();
  scene.add(dummyObj3)
  // useHelper(light1, DirectionalLightHelper)

  // @ts-ignore
  const spLight1 = useRef<SpotLight | undefined>();
  // @ts-ignore
  const spLight2 = useRef<SpotLight | undefined>();

  // useHelper(spLight1, SpotLightHelper)
  // useHelper(spLight2, SpotLightHelper)

  useEffect(() => {
    setLights([...lights, light1]);
  }, [])
  useEffect(() => {
    if (!light.current) return;
    light.current.lookAt(position.x, position.y-5, position.z);
  }, [position])

  return (
    <group name="VolumetricLight" position={position} rotation={rotation} {...restProps}>
      <mesh ref={mesh}>
        <boxBufferGeometry args={[0.71, 0.06, 0.29]} />
        <meshStandardMaterial color={"white"} emissive={new THREE.Color("#ffffff")} emissiveIntensity={3} />
      </mesh>
      <group ref={light}>
        <Audio url="https://d1p3v0j4bqcb21.cloudfront.net/audio/lightflicker.mp3" volume={0.5} rollOff={2} />
      </group>
      <directionalLight ref={light1} color="#ffffff" position={[-0.02, 0.13, 0]} intensity={0.005} target={dummyObj3} castShadow />
      <SpotLight ref={spLight1} color="#ffffff" angle={Math.PI/10} position={[0.13, 0, 0]} target={dummyObj} castShadow />
      <SpotLight ref={spLight2} color="#ffffff" angle={Math.PI/10} position={[-0.15, 0, 0]} target={dummyObj2} castShadow />
    </group>
  )
}
