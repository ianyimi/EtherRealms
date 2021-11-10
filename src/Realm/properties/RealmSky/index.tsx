import { useRealm } from "../../components/RealmState";
import CloudySky from "./components/CloudySky";
import { Sky, Stars } from "@react-three/drei";

export function RealmSky() {

  const { sky } = useRealm();
  const day = sky === "Day",
    night = sky === "Night";
  const cloudSky = !day && !night;

  return (
    <group name="SKY">
      {day && <Sky />}
      {night && <Stars count={1000} radius={0.5} fade />}
      {cloudSky && <CloudySky color={sky} />}
    </group>
  )
}
