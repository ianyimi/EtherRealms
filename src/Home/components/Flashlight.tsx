import { SpotLight, useDepthBuffer, useHelper } from "@react-three/drei";
import { Object3D, Vector3, SpotLightHelper } from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useLimiter, usePlayer } from "spacesvr";

export default function Flashlight() {

  const { scene } = useThree();
  const flashlight = useRef<any>();
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const player = usePlayer();
  const dummyObj = new Object3D();
  scene.add(dummyObj);
  const targetVec = new Vector3();

  // useHelper(flashlight, SpotLightHelper, "red")

  const limiter = useLimiter(45);
  useFrame(({ camera, clock }) => {
    if (limiter.isReady(clock) || !flashlight.current) return;
    flashlight.current.position.lerp(camera.position, 0.1);
    player.raycaster.ray.at(2, targetVec);
    dummyObj.position.lerp(targetVec, 0.1);
  })

  return (
    <group>
      <SpotLight
        ref={flashlight}
        color="#ffffff"
        depthBuffer={depthBuffer}
        target={dummyObj}
        angle={0.5}
        distance={50}
        intensity={1.5}
        penumbra={1}
        decay={1}
        castShadow
      />
    </group>
  )
}
