import { useTrimeshCollision } from "spacesvr";
import * as THREE from "three";


export default function Boundaries() {
  useTrimeshCollision(new THREE.TorusGeometry(100, 5, 5, 20, 2*Math.PI)
    .clone()
    .rotateX(Math.PI/2)
  )
  return <></>
}
