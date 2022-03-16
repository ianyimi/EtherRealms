import { useRealm } from "../../../components/RealmState";
import BackgroundsCubes from "./BackgroundGeos";
import CubeFloor from "./CubeFloor";
import DisplayCubes from "./DisplayCubes";
import Ground from "./Ground";
import Grass from "./Grass";

export default function CubicDimension() {

  const { scene: { theme } } = useRealm();

  return (
    <group name="cubicDimension">
      <BackgroundsCubes color={theme} />
      <DisplayCubes position-y={-1} />
      <CubeFloor />
      <Ground />
      {/*<Grass scale={0.1} />*/}
    </group>
  )
}
