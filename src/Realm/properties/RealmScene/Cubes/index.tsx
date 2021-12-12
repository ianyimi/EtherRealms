import { useRealm } from "../../../components/RealmState";
import BackgroundsCubes from "./BackgroundGeos";
import CubeFloor from "./CubeFloor";
import Cubes from "./DisplayCubes";

export default function CubicDimension() {

  const { scene: { theme } } = useRealm();

  return (
    <group name="cubicDimension">
      {/*<BackgroundsCubes color={theme} />*/}
      <Cubes />
      {/*<CubeFloor />*/}
    </group>
  )
}
