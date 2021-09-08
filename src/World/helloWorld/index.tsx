import {useEffect, useRef, useState} from "react";
import {animated, useSpring} from "@react-spring/three";
import {Interactable, useLimiter, usePlayer} from "spacesvr";
import {useFrame} from "@react-three/fiber";
import {Text} from "@react-three/drei";
import * as THREE from "three";
import {Object3D} from "three";

export default function Index() {

  const spinningBox = useRef();
  const [hover, setHover] = useState(false);
  const [select, setSelect] = useState(false);
  const { matColor, posY } = useSpring({
    matColor: hover ? "blue" : "red",
    posY: select ? 2 : 0,
    config: {
      mass: 1
    }
  })

  const { raycaster } = usePlayer();
  useEffect(() => {
    console.log(raycaster)
    if (raycaster) raycaster.far = 10;
  }, [raycaster])

  const limiter = useLimiter(45);
  useFrame(({ clock }) => {
    if (!limiter.isReady(clock) || !spinningBox.current) return;
    (spinningBox.current as Object3D).rotation.x = clock.getElapsedTime()/2;
    (spinningBox.current as Object3D).rotation.y = clock.getElapsedTime()/2;
  })

  return (
    <group>
      <ambientLight intensity={0.5} />
      <Text
        color="black"
        fontSize={1}
        position-y={1}
        rotation-y={-Math.PI/2}
      >
        Hello World
      </Text>
      <Interactable
        onHover={() => setHover(true)}
        onUnHover={() => setHover(false)}
        onClick={() => setSelect(!select)}
      >
        <animated.group position-y={posY}>
          <mesh ref={spinningBox}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <animated.meshBasicMaterial color={matColor} />
          </mesh>
        </animated.group>
      </Interactable>
      <mesh name="sphere">
        <sphereBufferGeometry args={[10, 30, 30]} />
        <meshStandardMaterial color="blue" opacity={0.25} transparent={true} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-x={-Math.PI/2}>
        <planeBufferGeometry args={[100, 100]} />
        <meshBasicMaterial color="green" />
      </mesh>
    </group>
  )
}