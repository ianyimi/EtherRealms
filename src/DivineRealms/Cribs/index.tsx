import { StandardEnvironment, Fog } from "spacesvr";
import { Stars } from "@react-three/drei";
import { Debug } from "@react-three/cannon";
import PauseMenu from "styles/PauseMenu";
import Station from "./models/Station";
import Nfts from "./components/Nfts";
import * as THREE from "three";
import { PostProcessing } from "./components/PostProcessing";
import WorldState from "./components/WorldState";


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
        <WorldState>
          {/*<Stars />*/}
          <Station position-y={-1} />
          <PostProcessing />
          <Nfts />
        </WorldState>
      {/*</Debug>*/}
    </StandardEnvironment>
  );
}
