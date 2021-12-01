import { useRealm } from "../../../components/RealmState";
import Earth from "./components/Earth";
import Boundary from "./components/Boundary";
import MoonScape from "./models/Moonscape";
import DisplayCubes from "../Cubes/DisplayCubes";
import DisplayCube from "../Cubes/DisplayCubes/DisplayCube";

export default function Moon() {

  const { scene: { name, theme } } = useRealm();
  const links = [
    { animation_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/psychedelicsv2.mp4", name: "???" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/psych1.jpeg", name: "???" },
    { animation_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/psychedelicsv1.mp4", name: "???" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/psych2.jpeg", name: "???" }
  ]

  return (
    <group>
      <Earth position={[0, 250, -400]} rotation={[Math.PI/1.75, 0, Math.PI/2]} scale={300} />
      <MoonScape position={[20, -15, 55]} scale={0.1} />
      {/*<Boundary />*/}
      <DisplayCubes position-y={-1} />
      {/*<DisplayCube position-y={1} assets={links} />*/}
    </group>
  )
}
