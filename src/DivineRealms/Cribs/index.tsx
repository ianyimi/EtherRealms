import { StandardEnvironment } from "spacesvr";
import Cribs from "./models/Cribs";
import { Stars } from "@react-three/drei";

export default function Home() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [120, 1, 80], rot: Math.PI/2, speed: 10, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      // disableGround
    >
      {/*<Debug scale={1} color="red">*/}
      <Stars />
      <Cribs />
      {/*</Debug>*/}
    </StandardEnvironment>
  );
}
