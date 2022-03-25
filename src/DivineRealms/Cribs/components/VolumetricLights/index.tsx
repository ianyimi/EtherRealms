import VolumetricLight from "./VolumetricLight";
import {Vector3} from "three";

export default function VolumetricLights() {
  return (
    <group>
      <VolumetricLight />
      <VolumetricLight position={new Vector3(0, 0, -15.935)} />
      <VolumetricLight position={new Vector3(-0.68, 0, -7.58)} />
    </group>
  )
}
