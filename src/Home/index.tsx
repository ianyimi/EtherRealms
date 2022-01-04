import { StandardEnvironment } from "spacesvr";
import Maze from "./models/Maze";
import Flashlight from "./components/Flashlight";

export default function Home() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 3, 0], controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      // disableGround
    >
      <Maze scale={0.1} position-y={-10} />
      <ambientLight intensity={0.1} />
      <Flashlight />
    </StandardEnvironment>
  );
}
