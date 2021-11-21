import { useRealm } from "../../components/RealmState";
import Cubes from "./Cubes"
import { usePlayer } from "spacesvr";
import {useEffect} from "react";

export function RealmScene() {

  const { scene: { name, type, size } } = useRealm();
  const { raycaster } = usePlayer();

  useEffect(() => {
    raycaster.far = 7;
  },[])

  return (
    <group>
      <ambientLight intensity={1} />
      {name === "Cubes" && <Cubes/>}
    </group>
  )
}
