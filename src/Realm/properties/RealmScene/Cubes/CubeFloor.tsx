import { Reflector } from "@react-three/drei";
import { useRealm } from "Realm/components/RealmState";

export default function CubeFloor() {
  const { sky: { type } } = useRealm();
  return (
    <group name="mirrorFloor">
      {type !== "Matrix" && <Reflector
        resolution={1024}
        args={[500, 500]}
        mirror={0.4}
        mixBlur={0.5}
        mixStrength={0.25}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        position-y={-1}
      />}
    </group>
  )
}
