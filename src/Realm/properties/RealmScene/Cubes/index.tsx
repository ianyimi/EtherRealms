import { useRealm } from "../../../components/RealmState";
import BackgroundsCubes from "./BackgroundCubes";
import CubeFloor from "./CubeFloor";

export default function CubicDimension() {

  const { scene: { name } } = useRealm();
  const ACTIVE = name === "Cubes";

  return (
    ACTIVE ? (
      <group name="cubicDimension">
        <BackgroundsCubes />
        <CubeFloor />
      </group>
    ) : <></>
  )
}
