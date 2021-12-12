import { useRealm } from "../../../components/RealmState";
import Earth from "./components/Earth";
import Boundary from "./components/Boundary";
import MoonScape from "./models/Moonscape";
import DisplayCubes from "../Cubes/DisplayCubes";
import DisplayCube from "../Cubes/DisplayCubes/DisplayCube";

export default function Moon() {

  const { scene: { name, theme } } = useRealm();
  const links = [
    { animation_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi19.mp4", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi1.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi2.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi3.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi4.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi5.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi6.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi7.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi8.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi9.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi10.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi11.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi12.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi13.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi14.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi15.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi16.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi17.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi18.jpg", name: "WGMI INTERFACES" },
    { image_url: "https://d1p3v0j4bqcb21.cloudfront.net/images/wgmi/wgmi20.jpg", name: "WGMI INTERFACES" },
  ]

  return (
    <group>
      <Earth position={[0, 250, -400]} rotation={[Math.PI/1.75, 0, Math.PI/2]} scale={300} />
      <MoonScape position={[20, -15, 55]} scale={0.1} />
      {/*<Boundary />*/}
      <DisplayCubes position-y={-1} altAssets={links} />
      {/*<DisplayCube position-y={1} assets={links} />*/}
    </group>
  )
}
