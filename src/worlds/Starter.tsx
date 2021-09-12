import { StandardEnvironment } from "spacesvr";
import CloudySky from "../ideas/CloudySky";
import InitWorld from "./helloWorld";

export default function Starter() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 500 } }}
      playerProps={{ pos: [0, 1, 0], controls: { disableGyro: true } }}
    >
      <ambientLight />
      <InitWorld />
      <CloudySky color="grey" />
    </StandardEnvironment>
  );
}
