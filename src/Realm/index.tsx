import {StandardEnvironment} from "spacesvr";
import {Debug} from "@react-three/cannon";
import { Perf } from "r3f-perf";
import RealmState from "./components/RealmState";
import { RealmScene, RealmSky, PostProcessing } from "./properties";

export interface RealmProps {
  id: string;
  scene: {
    name: string,
    type: string,
    size: string
  },
  sky: string,
  imageFrames: string,
  effects?: {
    type: string,
    color: string
  }
}

export default function Realm(props: { properties: RealmProps}) {
  const { properties } = props;
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1, 0], controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      // disableGround
    >
      <RealmState properties={{...properties}}>
        <RealmScene />
        <RealmSky />
        <PostProcessing />
      </RealmState>
    </StandardEnvironment>
  );
}
