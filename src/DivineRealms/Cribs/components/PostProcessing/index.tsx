import { EffectComposer, SelectiveBloom, Vignette } from "@react-three/postprocessing";
import Fireflies from "../Fireflies";
import VolumetricLights from "../VolumetricLights";
import * as THREE from "three";
import { Fog } from "spacesvr";
import {MutableRefObject, useRef, useState} from "react";

export function PostProcessing() {
  return (
    <group>
      {/*<Fog color={new THREE.Color("black")} near={0.1} far={30} />*/}
      <Fireflies count={100} scale={5} color={"lightblue"} size={200} />
      <VolumetricLights />
      <EffectComposer
        multisampling={0}
        disableNormalPass
      >
        {/*<Vignette />*/}
        {/*<SelectiveBloom*/}
        {/*  lights={lights}*/}
        {/*  selection={bloomObjects}*/}
        {/*  luminanceThreshold={0.25}*/}
        {/*  bloomRadius={0.05}*/}
        {/*/>*/}
      </EffectComposer>
    </group>
  )
}
