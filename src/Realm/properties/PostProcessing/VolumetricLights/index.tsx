import { SpotLight, useDepthBuffer } from "@react-three/drei"

export default function VolumetricLights() {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  return (
    <group>
      <SpotLight depthBuffer={depthBuffer} color="#0c8cbf" position={[3, 3, 2]} />
      <SpotLight depthBuffer={depthBuffer} color="#b00c3f" position={[1, 3, 0]} />
    </group>
  )
}
