import { StandardEnvironment, Fog } from "spacesvr";
import Cribs from "./models/Cribs";
import { Stars } from "@react-three/drei";
import { Debug } from "@react-three/cannon";
import PauseMenu from "styles/PauseMenu";
import Platform from "./models/Platform";
import Station from "./models/Station";
import * as THREE from "three";
import { PostProcessing } from "./components/PostProcessing";


export default function Home() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1.5, 0], speed: 10, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      pauseMenu={<PauseMenu />}
      // disableGround
    >
      {/*<Debug scale={1} color="red">*/}
        <ambientLight intensity={0.1} />
      {/*  <Stars />*/}
        {/*<Cribs position-y={-32} />*/}
        {/*<Platform position={[0, -16, 50]} scale={1} />*/}
        <Station position-y={-1} />
        <PostProcessing />
      {/*</Debug>*/}
    </StandardEnvironment>
  );
}
