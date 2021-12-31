import Icebergs from "./models/Icebergs";
import Water from "./components/Water";
import DisplayCubes from "../Cubes/DisplayCubes";
5
export default function Glacier() {
  return (
    <group>
      {/*@ts-ignore*/}
      <DisplayCubes position={[15.72, 2.76, 8.65]} rotation={[-0.03, 0, 0.03]} />
      <Icebergs scale={30} position-y={-3} />
      <Water position-y={-1} />
    </group>
  )
}
