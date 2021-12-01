import { useRealm } from "../../components/RealmState";
import CloudySky from "./components/CloudySky";
import MatrixSky from "./components/MatrixSky";
import { Sky, Stars } from "@react-three/drei";

export function RealmSky() {

  const { sky } = useRealm();
  const day = sky === "Day",
    night = sky === "Night",
    matrix = sky === "Matrix";
  const cloudSky = !day && !night && !matrix;

  return (
    <group name="realmSky">
      {day && <Sky sunPosition={1} />}
      {night && <Stars count={1000} radius={300} factor={15} fade />}
      {matrix && <MatrixSky />}
      {cloudSky && <CloudySky color={sky.toLowerCase()} />}
    </group>
  )
}
