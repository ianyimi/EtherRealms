import { useRealm } from "../../../components/RealmState";
import { Floor } from "../components/Floor";
import BackgroundsCubes from "./BackgroundCubes";

export default function CubicDimension() {

  const { scene: { name } } = useRealm();
  const ACTIVE = name === "Cubes";

  return (
    ACTIVE ? (
      <group name="cubicDimension">
        <BackgroundsCubes />
        <Floor />
      </group>
    ) : <></>
  )
}
