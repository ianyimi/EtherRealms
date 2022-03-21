import { StandardEnvironment } from "spacesvr";
import Cribs from "./models/Cribs";
import { Stars } from "@react-three/drei";
import { Debug } from "@react-three/cannon";
import PauseMenu from "styles/PauseMenu";
import Platform from "./models/Platform";


export default function Home() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1, 50], speed: 10, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      pauseMenu={<PauseMenu />}
      // disableGround
    >
      <Debug scale={1} color="red">
        <Stars />
        {/*<Cribs position-y={-32} />*/}
        <Platform position={[0, -80, 0]} scale={5} />
        <ambientLight intensity={1} />
      </Debug>
    </StandardEnvironment>
  );
}
