import { useSphere } from "@react-three/cannon";


export default function Boundary() {
  const [sphere, api] = useSphere(() => ({ mass: 0, type: "Static", args: 1 }))
  return (
    <group>
      <mesh ref={sphere}>
        <sphereBufferGeometry />
        {/*<meshBasicMaterial visible={false} />*/}
      </mesh>
    </group>
  )
}
