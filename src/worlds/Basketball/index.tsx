import {StandardEnvironment} from "spacesvr";
import {Debug} from "@react-three/cannon";
import Ball from "./models/Ball1";
import { Perf } from "r3f-perf";
import Environment from "./components/Environment";
import WorldState from "./components/WorldState";
import PostProcessing from "./components/PostProcessing";

export default function Basketball() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1, 0], controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      // disableGround
    >
      <Debug scale={1}>
        <WorldState>
          <Environment />
          <Ball />
          <PostProcessing />
        </WorldState>
      </Debug>
      {/*<Perf />*/}
    </StandardEnvironment>
  );
}
