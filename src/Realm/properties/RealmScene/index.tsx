import { useRealm } from "../../components/RealmState";
import Cubes from "./Cubes"

export function RealmScene() {

  const { scene: { name, type, size } } = useRealm();

  return (
    <group>
      <ambientLight intensity={1} />
      <Cubes />
    </group>
  )
}
