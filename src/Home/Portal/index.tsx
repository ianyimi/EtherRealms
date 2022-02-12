import { usePortalMat } from "./materials/portal";

export default function Portal() {

  const mat = usePortalMat();

  return (
    <group rotation-z={Math.PI/2} rotation-y={-Math.PI/2}>
      <mesh material={mat} >
        <planeBufferGeometry args={[10, 10]} />
      </mesh>
    </group>
  )
}
