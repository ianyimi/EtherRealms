import {Vector3} from "three";
import {useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import { SpotLight, useDepthBuffer } from "@react-three/drei"
import {usePlayer} from "spacesvr";
import * as THREE from "three";

export default function VolumetricLights() {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const player = usePlayer();
  console.log(player)
  return (
    <group>
      <SpotLight depthBuffer={depthBuffer} color="#0c8cbf" position={[3, 3, 2]} />
      <SpotLight depthBuffer={depthBuffer} color="#b00c3f" position={[1, 3, 0]} />
    </group>
  )
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef<any>()
  // const viewport = useThree((state) => state.viewport)
  // useFrame((state) => {
  //   light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
  //   light.current.target.updateMatrixWorld()
  // })
  // useEffect(() => {
  //   if (!light.current) return;
  //   light.current.target.position = new Vector3(0, 0, 0)
  // }, [light.current])
  // @ts-ignore
  return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}
