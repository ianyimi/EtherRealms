import InstancedTrees from "./components/InstancedTrees";
import Icebrgs from "./models/Icebrgs";
import Water from "./components/Water";
import DisplayCubes from "../Cubes/DisplayCubes";

export default function Glacier() {
  return (
    <group>
      {/*<InstancedTrees position-y={-10} />*/}
      <Water position-y={-1} />
      <Icebrgs scale={30} position-y={-3} />
      <DisplayCubes position={[15.72, 2.76, 8.65]} rotation={[-0.03, 0, 0.03]} />
    </group>
  )
}
