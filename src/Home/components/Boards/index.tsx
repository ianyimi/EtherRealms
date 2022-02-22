import Board from "./Board";
import { animated, useSpring } from "react-spring/three";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export default function Boards() {

  const [inRange, setRange] = useState(false);
  const { posY } = useSpring({
    posY: inRange ? 1 : -15,
    config: {
      mass: 5
    }
  })

  const zeroVec = new Vector3(0, 0, 0);
  useFrame(({ camera }) => {
    if (!inRange && camera.position.distanceToSquared(zeroVec) < 4000) {
      setRange(true);
    } else if (inRange && camera.position.distanceToSquared(zeroVec) >= 4000) {
      setRange(false);
    }
  })

  return (
    <animated.group position-y={posY}>
      <Board position={[-30, 0, -25]} rotation-y={Math.PI/2} />
      <Board position={[-10, 0, -20]} rotation-y={Math.PI/4} />
      <Board position={[-10, 0, 20]} rotation-y={-Math.PI/4} />
      <Board position={[-30, 0, 25]} rotation-y={-Math.PI/2} />
    </animated.group>
  )
}