import {GroupProps} from "@react-three/fiber";
import {ReactNode, useEffect} from "react";
import {Euler, Vector3} from "three";
import {RlmColor} from "../../../utils/types";
import {cache} from "../utils/cache";

function BackgroundCube(props: { color?: string } & GroupProps) {
  const { color = "white", ...restProps } = props;
  return (
    <group name="backgroundCube" {...restProps}>
      {/*<mesh>*/}
      {/*  <boxBufferGeometry args={[0.5, 0.5, 0.5]} />*/}
      {/*  <meshBasicMaterial color={color} />*/}
      {/*</mesh>*/}
      {/*<mesh>*/}
      {/*  <sphereBufferGeometry args={[0.25, 30, 30]} />*/}
      {/*  <meshStandardMaterial color={color} />*/}
      {/*</mesh>*/}
      <mesh>
        <torusBufferGeometry args={[0.25+0.25*Math.random(), 0.1, 15, 100]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

export default function BackgroundsCubes(props: { color?: RlmColor }) {
  const { color = "Red" } = props;
  const cubes: ReactNode[] = []
  const generate = true;

  if (generate) {
    const newCache = [];
    for (let i=0; i<45; i++) {
      const theta = Math.round(10000*2*Math.random()*Math.PI)/10000,
        phi = Math.round(10000*Math.random()*Math.PI/2.4)/10000,
        r = Math.round(100 + Math.random()*200);
      const posVec = new Vector3().setFromSphericalCoords(r, phi, theta);
      const rotVec = new Euler().setFromVector3(posVec);
      const scale = 25 + Math.round(Math.random()*75);

      newCache.push({
        position: [posVec.x, posVec.y, posVec.z],
        rotation: [rotVec.x, rotVec.y, rotVec.z],
        scale: scale
      })

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
    // console.log(JSON.stringify(newCache))
  } else {
    const cachedData = JSON.parse(cache);
    for (let i = 0; i < 45; i++) {
      const { position, rotation, scale } = cachedData[i];
      // console.log(JSON.parse(JSON.stringify(position)))
      // console.log(scale)
      cubes.push(
        <BackgroundCube
          color={color.toLowerCase()}
          position={[position.x, position.y, position.z]}
          rotation={[rotation.x, rotation.y, rotation.z]}
          scale={scale}
          key={i}
        />
      )
    }
  }

  return (
    <group name="backgroundCubes">
      {cubes}
    </group>
  )
}
