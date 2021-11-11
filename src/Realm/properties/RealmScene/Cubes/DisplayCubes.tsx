import DisplayCube from "./DisplayCube";

export default function DisplayCubes() {

  const cubes = []
  for (let i=0; i<25; i++) {
    cubes.push(<DisplayCube  />)
  }
  return (
    <group>

    </group>
  )
}
