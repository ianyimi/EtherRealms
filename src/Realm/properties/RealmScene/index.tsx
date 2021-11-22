import { useRealm } from "../../components/RealmState";
import Cubes from "./Cubes"
import { usePlayer } from "spacesvr";
import { useEffect } from "react";
import Matrix from "./Matrix";

export function RealmScene() {

  const { scene: { name, type } } = useRealm();
  const { raycaster } = usePlayer();

  useEffect(() => {
    raycaster.far = 7;
  },[])

  return (
    <group>
      <ambientLight intensity={1} />
      {name === "Cubes" && <Cubes/>}
      {name === "Matrix" && <Matrix />}
    </group>
  )
}
