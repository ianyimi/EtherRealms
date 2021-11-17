import { Reflector } from "@react-three/drei";

export default function CubeFloor() {
  return (
    <group name="mirrorFloor">
      <Reflector resolution={1024} args={[500, 500]} mirror={0.4} mixBlur={0.5} mixStrength={0.25} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-1} />
    </group>
  )
}