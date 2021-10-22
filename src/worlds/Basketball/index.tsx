import {StandardEnvironment} from "spacesvr";
import {Debug} from "@react-three/cannon";
import CloudySky from "../../ideas/CloudySky";
import Court from "./models/Court";
import { Perf } from "r3f-perf";

export default function Basketball() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1, 0], controls: { disableGyro: true } }}
    >
      <Debug scale={1}>
        <group>
          <mesh position-z={-10}>
            <sphereBufferGeometry args={[3, 30, 30]} />
            <meshBasicMaterial color="green" />
          </mesh>
          <Court scale={0.0075} position-y={-1} />
          <ambientLight />
          <CloudySky color="grey" />
        </group>
      </Debug>
      {/*<Perf />*/}
    </StandardEnvironment>
  );
}