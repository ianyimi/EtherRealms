import { useRealm } from "../../../components/RealmState";
import Earth from "./components/Earth";
import MoonScape from "./models/Moonscape";

export default function Moon() {

  const { scene: { name, theme } } = useRealm();

  return (
    <group>
      <Earth position={[0, 250, -400]} rotation={[Math.PI/1.75, 0, Math.PI/2]} scale={300} />
      <MoonScape position={[20, -15, 55]} scale={0.1} />
    </group>
  )
}
