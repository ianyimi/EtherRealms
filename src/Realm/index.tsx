import {StandardEnvironment} from "spacesvr";
import {Debug} from "@react-three/cannon";
import { Perf } from "r3f-perf";
import RealmState from "./components/RealmState";
import { RealmScene, RealmSky, PostProcessing } from "./properties";
import { SceneName, RlmScene, RlmSky, ImageFrame, RlmEffect } from "./utils/types";
import { Scenes } from "./utils/constants";

export interface RealmProps {
  id: string,
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

export default function Realm(props: { properties: RealmProps}) {
  const { properties } = props;
  const sceneObj = getScene(properties.scene as SceneName)
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1, 0], controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      // disableGround
    >
      <RealmState properties={{...properties, scene: {...sceneObj}}}>
        <RealmSky />
        <RealmScene />
        <PostProcessing />
      </RealmState>
    </StandardEnvironment>
  );
}
