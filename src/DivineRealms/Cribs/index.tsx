import { StandardEnvironment } from "spacesvr";
import Cribs from "./models/Cribs";
import { Stars } from "@react-three/drei";
import { Debug } from "@react-three/cannon";

export default function Home() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1, 50], speed: 10, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      // disableGround
    >
      <Debug scale={1} color="red">
        <Stars />
        <Cribs position-y={-32} />
        <ambientLight intensity={1} />
      </Debug>
    </StandardEnvironment>
  );
}
