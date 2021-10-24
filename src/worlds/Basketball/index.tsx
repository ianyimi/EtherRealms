import {StandardEnvironment} from "spacesvr";
import {Debug} from "@react-three/cannon";
import { Sky, Stars } from "@react-three/drei";
import CloudySky from "../../ideas/CloudySky";
import Court from "./models/Court6";
import Ball from "./models/Ball1";
import { Perf } from "r3f-perf";
import Torus from "./components/Torus";

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
        <group>
          <Court scale={0.5} position-y={-2} />
          <ambientLight />
          {/*<CloudySky color="grey" />*/}
          <Stars count={1000} radius={0.5} fade />
          <Ball />
          <Torus />
        </group>
      </Debug>
      {/*<Perf />*/}
    </StandardEnvironment>
  );
}
