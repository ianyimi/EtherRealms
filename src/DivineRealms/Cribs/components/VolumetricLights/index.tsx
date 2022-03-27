import VolumetricLight from "./VolumetricLight";
import { Euler, Vector3} from "three";

export default function VolumetricLights() {
  return (
    <group>
      {/*<VolumetricLight position={new Vector3(0.34, 3.7, -6.63)} />*/}
      {/*<VolumetricLight position={new Vector3(0.34, 3.7, -22.565)} />*/}
      <VolumetricLight position={new Vector3(-0.34, 3.7, -14.21)} />
      {/*<VolumetricLight position={new Vector3(-2.73, 3.7, -29.72)} rotation={new Euler(0, 1.58, 0)} />*/}
      <VolumetricLight position={new Vector3(5.55, 3.7, -30.43)} rotation={new Euler(0, 1.58, 0)} />
      {/*<VolumetricLight position={new Vector3(12.89, 3.7, -29.72)} rotation={new Euler(0, 1.58, 0)} />*/}
      {/*<VolumetricLight position={new Vector3(10.25, 3.7, -37.505)} />*/}
      <VolumetricLight position={new Vector3(9.52, 3.7, -46.115)} />
      {/*<VolumetricLight position={new Vector3(10.25, 3.7, -55.355)} />*/}
    </group>
  )
}
