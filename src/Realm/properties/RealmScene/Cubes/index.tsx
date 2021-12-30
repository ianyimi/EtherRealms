import { useRealm } from "../../../components/RealmState";
import BackgroundsCubes from "./BackgroundGeos";
import CubeFloor from "./CubeFloor";
import Cubes from "./DisplayCubes";
import Grass from "./Grass";

export default function CubicDimension() {

  const { scene: { theme } } = useRealm();

  return (
    <group name="cubicDimension">
      <BackgroundsCubes color={theme} />
      <Cubes position-y={-1} />
      <CubeFloor />
      <Grass scale={0.1} />
    </group>
  )
}
