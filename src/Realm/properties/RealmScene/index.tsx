import { useRealm } from "../../components/RealmState";
import { usePlayer } from "spacesvr";
import { useEffect } from "react";
import Cubes from "./Cubes"
import Matrix from "./Matrix";
import Moon from "./Moon";

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
      {name === "Moon" && <Moon />}
    </group>
  )
}
