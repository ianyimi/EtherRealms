import { useRealm } from "../../../components/RealmState";
import BackgroundsCubes from "./BackgroundCubes";
import CubeFloor from "./CubeFloor";
import DisplayCubes from "./DisplayCubes";

export default function CubicDimension() {

  const { scene: { name } } = useRealm();
  const ACTIVE = name === "Cubes";

  return (
    ACTIVE ? (
      <group name="cubicDimension">
        <BackgroundsCubes />
        <DisplayCubes />
        <CubeFloor />
      </group>
    ) : <></>
  )
}
