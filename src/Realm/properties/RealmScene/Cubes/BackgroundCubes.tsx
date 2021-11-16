import {GroupProps} from "@react-three/fiber";
import {ReactNode} from "react";
import {Euler, Vector3} from "three";
import {RlmColor} from "../../../utils/types";

function BackgroundCube(props: { color?: string } & GroupProps) {
  const { color = "white", ...restProps } = props;
  return (
    <group name="backgroundCube" {...restProps}>
      {/*<mesh>*/}
      {/*  <boxBufferGeometry args={[0.5, 0.5, 0.5]} />*/}
      {/*  <meshBasicMaterial color={color} />*/}
      {/*</mesh>*/}
      <mesh>
        <sphereBufferGeometry args={[0.25, 30, 30]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

export default function BackgroundsCubes(props: { color?: RlmColor }) {
  const { color = "Red" } = props;
  const cubes: ReactNode[] = []
  for (let i=0; i<45; i++) {
    const theta = 2*Math.random()*Math.PI,
      phi = Math.random()*Math.PI/2.4,
      r = 100 + Math.random()*200;
    const posVec = new Vector3().setFromSphericalCoords(r, phi, theta);
    const rotVec = new Euler().setFromVector3(posVec);
    const scale = 25 + Math.random()*75;

    cubes.push(
      <BackgroundCube
        color={color.toLowerCase()}
        position={posVec}
        rotation={rotVec}
        scale={scale}
        key={i}
      />
    )
  }

  return (
    <group name="backgroundCubes">
      {cubes}
    </group>
  )
}
