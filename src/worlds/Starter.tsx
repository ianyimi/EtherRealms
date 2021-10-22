import { StandardEnvironment } from "spacesvr";
import CloudySky from "../ideas/CloudySky";
import InitWorld from "./helloWorld";
import { Debug } from "@react-three/cannon";

export default function Starter() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 500 } }}
      playerProps={{ pos: [0, 1, 0], controls: { disableGyro: true } }}
    >
      <Debug scale={1}>
        <group>
          <ambientLight />
          <InitWorld />
          <CloudySky color="grey" />
        </group>
      </Debug>
    </StandardEnvironment>
  );
}
