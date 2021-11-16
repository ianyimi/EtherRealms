import { useRealm } from "../../../components/RealmState";
import BackgroundsCubes from "./BackgroundCubes";
import CubeFloor from "./CubeFloor";
import Cubes from "./DisplayCubes";

export default function CubicDimension() {

  const { scene: { name, theme } } = useRealm();
  const ACTIVE = name === "Cubes";

  return (
    ACTIVE ? (
      <group name="cubicDimension">
        <BackgroundsCubes color={theme} />
        <Cubes />
        <CubeFloor />
      </group>
    ) : <></>
  )
}
