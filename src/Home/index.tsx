import { StandardEnvironment, Fog } from "spacesvr";
import Gate from "./models/Gate";
import Boards from "./components/Boards";
// import Flashlight from "./components/Flashlight";
import { Debug } from "@react-three/cannon";
import { Box, Stars, Text } from "@react-three/drei";
import Water from "ideas/Water";
import Portal from "./Portal";
import MagicMirror from "ideas/MagicMirror";
import { Ramen, Soda, Farm, Heli } from './models/Models';
import BrandLogo from "./components/BrandLogo";
import PauseMenu from "styles/PauseMenu";
import * as THREE from "three";

const FONT = "https://d1p3v0j4bqcb21.cloudfront.net/fonts/Etherrealms.otf";

export default function Home() {
  return (
    <StandardEnvironment
      // dev={process.env.NODE_ENV === "development"}
      dev={false}
      canvasProps={{ camera: { far: 1000 } }}
      playerProps={{ pos: [-80, 1, 0], rot: -Math.PI/2, speed: 10, controls: { disableGyro: true } }}
      physicsProps={{ defaultContactMaterial: { friction: 0.01 } }}
      pauseMenu={<PauseMenu />}
      // disableGround
    >
      <Debug scale={1} color="red">
        <Stars radius={200} />
        <Gate scale={3} position-y={6} />
        <Water color="0x001e0f" position-y={-5} />
        <BrandLogo position={[0, 30, -57.5]} rotation-y={-Math.PI/2} />
        <Fog color={new THREE.Color("black")} near={25} far={150} />
        <Boards />
        {/*<Portal />*/}
        {/* @ts-ignore */}
        {/*<MagicMirror position={[0, 0, 0]} args={[10, 10]} rotation-y={-Math.PI/2}>*/}
        {/*  <color attach="background" args={['#000000']} />*/}
        {/*  <ambientLight intensity={1} />*/}
        {/*  <pointLight position={[20, 30, 10]} />*/}
        {/*  <pointLight position={[-10, -10, -10]} color="blue" />*/}
        {/*  <group rotation-y={-Math.PI/2}>*/}
        {/*    <Farm />*/}
        {/*    <Heli />*/}
        {/*  </group>*/}
        {/*</MagicMirror>*/}
        {/*<Flashlight />*/}
      </Debug>
    </StandardEnvironment>
  );
}
