import { StandardEnvironment, Interactable, usePlayer } from "spacesvr";
import { Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useState } from "react";
import Raycast from "./components/Raycast";

export default function Index() {

  const [hover, setHover] = useState(false);
  const { matColor } = useSpring({
    matColor: hover ? "blue" : "red",
    config: {
      mass: 1
    }
  })

  return (
    <StandardEnvironment
      playerProps={{
        speed: 1.65,
        pos: [-5, 2, 0],
        rot: -Math.PI / 2,
        controls: { disableGyro: true },
      }}
      canvasProps={{
        camera: { far: 300 },
        dpr: 1.5,
        gl: { antialias: false },
      }}
      // dev={process.env.NODE_ENV === "development"}
      // simulationProps={{
      //   signalHost: "musehq.us-west-1.elasticbeanstalk.com",
      //   signalPort: 443,
      //   signalPath: "/signal",
      //   socketServer: "wss://musehq.us-west-1.elasticbeanstalk.com",
      //   frequency: 25,
      // }}
    >
      <ambientLight intensity={2} />
      <Raycast />
      <Interactable
        onHover={() => setHover(true)}
        onUnHover={() => setHover(false)}
      >
        <mesh>
          <boxBufferGeometry args={[1, 1, 1]} />
          <animated.meshBasicMaterial color={matColor} />
        </mesh>
      </Interactable>
      <Text
        color="black"
        fontSize={1}
        position-y={1}
        rotation-y={-Math.PI/2}
      >
        Hello World
      </Text>
    </StandardEnvironment>
  )
}