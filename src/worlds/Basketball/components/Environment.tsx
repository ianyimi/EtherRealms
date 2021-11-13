import Court from "../models/Court6";
import { Stars } from "@react-three/drei";
import Torus from "./Torus";

export default function Environment() {
  return (
    <group>
      <Court scale={0.5} position-y={-2} />
      <Stars count={1000} radius={0.5} fade />
      <Torus />
    </group>
  )
}