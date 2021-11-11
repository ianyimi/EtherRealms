import {GroupProps} from "@react-three/fiber";
import {ReactNode} from "react";
import {Euler, Vector3} from "three";

function BackgroundCube(props: { color?: string } & GroupProps) {
  const { color = "white", ...restProps } = props;
  return (
    <group name="backgroundCube" {...restProps}>
      <mesh>
        <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

export default function BackgroundsCubes() {
  const cubes: ReactNode[] = []
  for (let i=0; i<100; i++) {
    const theta = 2*Math.random()*Math.PI,
      phi = Math.random()*Math.PI/2,
      r = 100 + Math.random()*100;
    const posVec = new Vector3().setFromSphericalCoords(r, phi, theta);
    const rotVec = new Euler().setFromVector3(posVec);
    const scale = 1 + Math.random()*20;

    cubes.push(
      <BackgroundCube
        color="red"
        position={posVec}
        rotation={rotVec}
        scale={scale}
      />
    )
  }

  return (
    <group name="backgroundCubes">
      {cubes}
    </group>
  )
}
