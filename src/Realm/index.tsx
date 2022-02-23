import {StandardEnvironment} from "spacesvr";
import { Debug } from "@react-three/cannon";
import { Perf } from "r3f-perf";
import RealmState from "./components/RealmState";
import ConnectWallet from "./components/ConnectWallet";
import { RealmScene, RealmSky, PostProcessing } from "./properties";
import { SceneName, RlmScene, RlmSky, ImageFrame, RlmEffect } from "./utils/types";
import { getScene } from "./utils/constants";
import PauseMenu from "styles/PauseMenu";
import { MoralisProvider } from "react-moralis";
import { Preload } from "@react-three/drei";

export interface RealmProps {
  id: number,
  scene: RlmScene | SceneName,
  sky: RlmSky,
  imageFrames: ImageFrame,
  effects?: RlmEffect
}

const appId = "NOlSQswppn0DcsqCkZ2rSk1tZfUqUUpgSlD19k3d",
  serverUrl = "https://egsjdipavoga.usemoralis.com:2053/server";

export default function Realm(props: { properties: RealmProps }) {
  const { properties } = props;
  const sceneObj = getScene(properties.scene as SceneName)
  return (
    // <MoralisProvider appId={appId} serverUrl={serverUrl}>
    //   <ConnectWallet />
      <StandardEnvironment
        canvasProps={{ camera: { far: 1000 } }}
        playerProps={{ pos: sceneObj.start, controls: { disableGyro: true } }}
        physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
        pauseMenu={<PauseMenu />}
        // disableGround
      >
        {/*<Debug color="red" scale={1}>*/}
          <RealmState properties={{...properties, scene: {...sceneObj}}}>
            <RealmSky />
            <RealmScene />
            <PostProcessing />
            <Preload all />
          </RealmState>
        {/*</Debug>*/}
      </StandardEnvironment>
    // </MoralisProvider>
  );
}
