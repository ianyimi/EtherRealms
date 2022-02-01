import { useRealm } from "../../components/RealmState";
import CloudySky from "./components/CloudySky";
import MatrixSky from "./components/MatrixSky";
import RainbowSky from "./components/RainbowSky";
import PortalSky from "./components/PortalSky";
import MilkyWaySky from "./components/MilkyWaySky";
import { Sky, Stars } from "@react-three/drei";

export function RealmSky() {

  const { sky: { type, primaryColor, secondaryColor } } = useRealm();
  const day = type === "Day",
    night = type === "Night",
    matrix = type === "Matrix",
    rainbow = type === "Rainbow",
    portal = type === "Portal",
    cloudy = type === "Cloudy",
    milkyway = type === "Milky Way";

  return (
    <group name="realmSky">
      {day && <Sky sunPosition={1} />}
      {night && <Stars count={1000} radius={300} factor={15} fade />}
      {rainbow && <RainbowSky />}
      {matrix && <MatrixSky color={primaryColor && primaryColor.toLowerCase()} />}
      {portal && <PortalSky mainColor={primaryColor && primaryColor.toLowerCase()} backgroundColor={secondaryColor && secondaryColor.toLowerCase()} />}
      {cloudy && <CloudySky color={primaryColor && primaryColor.toLowerCase()} />}
      {milkyway && <MilkyWaySky mainColor={primaryColor && primaryColor.toLowerCase()} backgroundColor={secondaryColor && secondaryColor.toLowerCase()} />}
    </group>
  )
}
