import { StandardEnvironment } from "spacesvr";
import PauseMenu from "styles/PauseMenu";
import Temple1 from "./models/Temple1";

export default function WinterTemple() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [0, 1.5, 0], speed: 5, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      pauseMenu={<PauseMenu />}
      // disableGround
    >
      <Temple1 />
      <ambientLight />
    </StandardEnvironment>
  )
}
