import { usePlane } from "@react-three/cannon"


export default function Ground() {
  const [ref, api] = usePlane(() => ({ args: [100, 100], position: [0, 1, 0], rotation: [-Math.PI/2, 0, 0] }))
  return (
    <group>
      <mesh ref={ref}>
        <planeBufferGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  )
}
