import Board from "./Board";
import { animated, useSpring } from "react-spring/three";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export default function Boards() {

  const [inRange, setRange] = useState(false);
  const { posY } = useSpring({
    posY: 1,
    config: {
      mass: 1
    }
  })

  const zeroVec = new Vector3(0, 0, 0);
  useFrame(({ camera }) => {
    // console.log(camera.position.distanceToSquared(new Vector3(0, 0, 0)))
    if (!inRange && camera.position.distanceToSquared(zeroVec) < 4000) {
      setRange(true);
    } else if (inRange) {
      setRange(false);
    }
  })

  return (
    <animated.group position-y={posY}>
      <Board position-x={-20} />
    </animated.group>
  )
}