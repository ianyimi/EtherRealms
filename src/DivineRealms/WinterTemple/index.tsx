import { StandardEnvironment } from "spacesvr";
import { Sky } from "@react-three/drei"
import PauseMenu from "styles/PauseMenu";
import Water from "../../ideas/Water";
import Temple1 from "./models/Temple1";

export default function WinterTemple() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [12, 1, 40], speed: 5, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      pauseMenu={<PauseMenu />}
      // disableGround
    >
      <group position-y={-1}>
        <Temple1 />
        <Water color="0x001e0f" speed={0.25} />
      </group>
      <Sky sunPosition={0.75} />
      <ambientLight />
    </StandardEnvironment>
  )
}
