import Icebergs from "./models/Icebergs";
import Water from "ideas/Water";
import DisplayCubes from "../Cubes/DisplayCubes";
import Lava from "./components/Lava";
import { useRealm } from "../../../components/RealmState";

export default function Glacier() {

  const { scene: { theme = "0x001e0f" } } = useRealm();

  return (
    <group>
      {/*@ts-ignore*/}
      <DisplayCubes position={[15.72, 2.76, 8.65]} rotation={[-0.03, 0, 0.03]} />
      <Icebergs scale={30} position-y={-3} />
      <Water color={theme.toLowerCase()} position-y={-1} />
      {/*<Lava />*/}
    </group>
  )
}
