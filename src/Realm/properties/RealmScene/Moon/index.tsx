import { useRealm } from "../../../components/RealmState";
import Earth from "./components/Earth";

export default function Moon() {

  const { scene: { name, theme } } = useRealm();

  return (
    <group>
      <Earth position={[0, 275, -400]} rotation={[Math.PI/2, 0, Math.PI/2]} scale={300} />
    </group>
  )
}
