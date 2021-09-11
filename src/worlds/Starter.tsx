import { Spinning, Floating, StandardEnvironment } from "spacesvr";
import TransparentFloor from "../ideas/TransparentFloor";
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
      <group position={[0, 0, -4]}>
        <Floating>
          <Spinning xSpeed={0.2} ySpeed={0.4} zSpeed={0.3}>
            <mesh>
              <torusKnotBufferGeometry args={[1, 0.2]} />
              <meshStandardMaterial color="blue" />
            </mesh>
          </Spinning>
        </Floating>
      </group>
      <InitWorld position-y={1} />
      <CloudySky color="white" />
      {/*<TransparentFloor opacity={0.7} />*/}
    </StandardEnvironment>
  );
}
