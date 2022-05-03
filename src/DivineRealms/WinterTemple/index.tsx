import { StandardEnvironment, Fog } from "spacesvr";
import { Sky } from "@react-three/drei"
import PauseMenu from "styles/PauseMenu";
import Water from "../../ideas/Water";
import Temple from "./models/Temple10";
import Snow from "./components/Snow";
import CloudySky from "./components/CloudySky";
import { Debug } from "@react-three/cannon";
import * as THREE from "three";

export default function WinterTemple() {
  return (
    <StandardEnvironment
      dev={process.env.NODE_ENV === "development"}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [15, 4, 36.5], rot: Math.PI/6, speed: 7, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      pauseMenu={<PauseMenu />}
      // disableGround
    >
      {/*<Debug color="red" scale={1}>*/}
        <Temple scale={1.25} />
        <Water color="0x001e0f" speed={0.25} position-y={-0.5} />
        <CloudySky color="white" />
        {/*<Sky sunPosition={0.75} />*/}
        <ambientLight />
        <Fog color={new THREE.Color("white")} near={10} far={250} />
        <Snow particleNum={1000} speed={0.5} />
      {/*</Debug>*/}
    </StandardEnvironment>
  )
}
