import { EffectComposer, SelectiveBloom, Vignette } from "@react-three/postprocessing";
import Fireflies from "../Fireflies";
import VolumetricLights from "../VolumetricLights";
import * as THREE from "three";
import { Fog } from "spacesvr";
import {MutableRefObject, useRef, useState} from "react";
import {useWorld} from "../WorldState";

export function PostProcessing() {
  const { bloomObjects, lights } = useWorld();
  return (
    <group>
      <Fog color={new THREE.Color("black")} near={0.1} far={90} />
      <Fireflies count={200} scale={20} color={"lightblue"} size={200} position-z={-37} />
      <VolumetricLights />
      <EffectComposer
        multisampling={0}
        disableNormalPass
      >
        <Vignette />
        <SelectiveBloom
          lights={lights}
          selection={bloomObjects}
          intensity={3}
          luminanceThreshold={0}
          // bloomRadius={0.05}
        />
      </EffectComposer>
    </group>
  )
}
