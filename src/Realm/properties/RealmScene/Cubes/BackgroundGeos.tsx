import {GroupProps} from "@react-three/fiber";
import {ReactNode, useEffect} from "react";
import {Euler, Vector3} from "three";
import {RlmColor} from "../../../utils/types";
import {cache} from "./utils/cache";

function BackgroundGeo(props: { color?: string, radius: number, i: number } & GroupProps) {
  const { color = "white", radius = 0, i, ...restProps } = props;
  return (
    <group name="backgroundGeo" {...restProps}>
      {i===0 && <mesh>
        <boxBufferGeometry args={[0.5, 0.5, 0.5]}/>
        <meshBasicMaterial color={color}/>
      </mesh>}
      {i===1 && <mesh>
        <sphereBufferGeometry args={[0.25, 30, 30]}/>
        <meshBasicMaterial color={color}/>
      </mesh>}
      {i===2 && <mesh>
        <torusBufferGeometry args={[radius, 0.1, 15, 100]}/>
        <meshBasicMaterial color={color}/>
      </mesh>}
    </group>
  )
}

export default function BackgroundsGeos(props: { color?: RlmColor }) {
  const { color = "Red" } = props;
  const cubes: ReactNode[] = []
  const generate = false;

  if (generate) {
    const newCache = [];
    for (let i=0; i<35; i++) {
      const theta = Math.round(10000*2*Math.random()*Math.PI)/10000,
        phi = Math.round(10000*Math.random()*Math.PI/2.4)/10000,
        r = Math.round(100 + Math.random()*200);
      const posVec = new Vector3().setFromSphericalCoords(r, phi, theta);
      const rotVec = new Euler().setFromVector3(posVec);
      const scale = 25 + Math.round(Math.random()*75);
      const radius = 0.25 + Math.round(Math.random()*250)/1000;

      newCache.push({
        position: [posVec.x, posVec.y, posVec.z],
        rotation: [rotVec.x, rotVec.y, rotVec.z],
        scale: scale,
        radius: radius
      })

      cubes.push(
        <BackgroundGeo
          color={color.toLowerCase()}
          position={posVec}
          rotation={rotVec}
          scale={scale}
          radius={radius}
          i={i%3}
          key={i}
        />
      )
    }
    console.log(JSON.stringify(newCache))
  } else {
    const cachedData = JSON.parse(cache);
    // console.log(JSON.parse(cache))
    for (let i = 0; i < cachedData.length; i++) {
      const { position, rotation, scale, radius } = cachedData[i];
      // console.log(JSON.parse(JSON.stringify(position)))
      // console.log(scale)
      cubes.push(
        <BackgroundGeo
          color={color.toLowerCase()}
          position={[...position as [number, number, number]]}
          rotation={[...rotation as [number, number, number]]}
          scale={scale}
          radius={radius}
          i={i%3}
          key={i}
        />
      )
    }
  }

  return (
    <group name="backgroundGeos">
      {cubes}
    </group>
  )
}
