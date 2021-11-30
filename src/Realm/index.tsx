import {StandardEnvironment} from "spacesvr";
import { Debug } from "@react-three/cannon";
import { Perf } from "r3f-perf";
import RealmState from "./components/RealmState";
import ConnectWallet from "./components/ConnectWallet";
import { RealmScene, RealmSky, PostProcessing } from "./properties";
import { SceneName, RlmScene, RlmSky, ImageFrame, RlmEffect } from "./utils/types";
import { Scenes } from "./utils/constants";
import { MoralisProvider } from "react-moralis";
import { Preload } from "@react-three/drei";

export interface RealmProps {
  id: number,
  scene: RlmScene | SceneName,
  sky: RlmSky,
  imageFrames: ImageFrame,
  effects?: RlmEffect
}

function getScene(name: SceneName): RlmScene {
  for (const scene of Scenes) {
    if (scene.name === name) {
      return scene
    }
  }
  console.log("No Scene Found... Default Loaded.");
  return Scenes[0]
}

const appId = "NOlSQswppn0DcsqCkZ2rSk1tZfUqUUpgSlD19k3d",
  serverUrl = "https://egsjdipavoga.usemoralis.com:2053/server";

export default function Realm(props: { properties: RealmProps}) {
  const { properties } = props;
  const sceneObj = getScene(properties.scene as SceneName)
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ConnectWallet />
      <StandardEnvironment
        dev={process.env.NODE_ENV === "development"}
        canvasProps={{ camera: { far: 1000 } }}
        playerProps={{ pos: [0, 1, 0], controls: { disableGyro: true } }}
        physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
        // disableGround
      >
        <Debug color="red" scale={1}>
          <RealmState properties={{...properties, scene: {...sceneObj}}}>
            <RealmSky />
            <RealmScene />
            <PostProcessing />
            <Preload all />
          </RealmState>
        </Debug>
      </StandardEnvironment>
    </MoralisProvider>
  );
}
