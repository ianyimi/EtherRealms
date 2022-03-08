import Court from "../models/Court6";
import { Stars } from "@react-three/drei";
import Torus from "./Torus";
import Fgdbg2 from "../models/Fgdbg2";

export default function Environment() {
  return (
    <group>
      {/*<Court scale={0.5} position-y={-2} />*/}
      <Stars count={1000} radius={0.5} fade />
      {/*<Torus />*/}
      <Fgdbg2 position-y={-10} />
    </group>
  )
}