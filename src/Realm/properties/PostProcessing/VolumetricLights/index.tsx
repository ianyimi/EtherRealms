import { SpotLight, useDepthBuffer } from "@react-three/drei"
import {useFrame, useThree} from "@react-three/fiber";
import {Object3D, Vector3} from "three";
import {useLimiter} from "spacesvr";

export default function VolumetricLights() {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const { camera } = useThree();
  const dummyObj = new Object3D();

  const limiter = useLimiter(30);
  useFrame(({ clock }) => {
    if (!limiter.isReady(clock)) return;
    dummyObj.position.lerp(new Vector3(camera.position.x, camera.position.y, camera.position.z-3), 0.1)
  })

  return (
    <group>
      <SpotLight depthBuffer={depthBuffer} color="#0c8cbf" position={[3, 3, 2]} target={dummyObj} />
      <SpotLight depthBuffer={depthBuffer} color="#b00c3f" position={[1, 3, 0]} />
    </group>
  )
}
