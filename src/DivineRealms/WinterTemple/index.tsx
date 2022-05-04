import { StandardEnvironment, Fog } from "spacesvr";
import { Sky } from "@react-three/drei"
import PauseMenu from "styles/PauseMenu";
import Water from "../../ideas/Water";
import Temple from "./models/Temple";
import Snow from "./components/Snow";
import CloudySky from "./components/CloudySky";
import WorldState from "../components/WorldState";
import Nfts from "../components/Nfts";
import { nftPositions } from "../Cribs/utils/constants";
import { Debug } from "@react-three/cannon";
import * as THREE from "three";

// Station Token_ID
const TOKEN_ID = "40539505412060235591267077459928418936006271470437343391270068673212139438081";

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
        <WorldState tokenId={TOKEN_ID}>
          <Temple scale={1.25} />
          <Water color="0x001e0f" speed={0.25} position-y={-0.5} />
          <CloudySky color="white" />
          {/*<Sky sunPosition={0.75} />*/}
          <Nfts positions={nftPositions} />
          <ambientLight />
          <Fog color={new THREE.Color("white")} near={10} far={250} />
          <Snow particleNum={1000} speed={0.5} />
        </WorldState>
      {/*</Debug>*/}
    </StandardEnvironment>
  )
}
