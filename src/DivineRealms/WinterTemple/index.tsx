import { StandardEnvironment } from "spacesvr";
import { Sky } from "@react-three/drei"
import PauseMenu from "styles/PauseMenu";
import Water from "../../ideas/Water";
import Temple from "./models/Temple3";
import { Debug } from "@react-three/cannon";

export default function WinterTemple() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [10, 2, 21], speed: 5, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      pauseMenu={<PauseMenu />}
      // disableGround
    >
      {/*<Debug color="red" scale={1}>*/}
        <group position-y={-1}>
          <Temple />
          <Water color="0x001e0f" speed={0.25} />
        </group>
        <Sky sunPosition={0.75} />
        <ambientLight />
      {/*</Debug>*/}
    </StandardEnvironment>
  )
}
