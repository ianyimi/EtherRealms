import DisplayCube from "./DisplayCube";
import { displayPositions, imageSources } from "../utils/constants";

const COUNT = 5

export default function DisplayCubes() {

  const cubes = []
  for (let i=0; i<COUNT; i++) {
    cubes.push(
      <group rotation-y={2*i*Math.PI/COUNT}>
        <group position-z={-10}>
          <DisplayCube sources={imageSources[i]} position-y={1} />
        </group>
      </group>
    )
  }
  return (
    <group>
      {cubes}
    </group>
  )
}
