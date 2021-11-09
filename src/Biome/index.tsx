import {StandardEnvironment} from "spacesvr";
import {Debug} from "@react-three/cannon";
import { Perf } from "r3f-perf";
// import PostProcessing from "./properties/PostProcessing";

interface BiomeProps {
  type: string,
  scene: {
    name: string,
    size: string
  },
  sky: string,
  effects: string | undefined,
  imgFrames: string
}

export default function Biome(props: BiomeProps) {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1, 0], controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      // disableGround
    >
      {/*<Biome />*/}
    </StandardEnvironment>
  );
}
