import { EffectComposer, SelectiveBloom, Vignette } from "@react-three/postprocessing";
import Fireflies from "../Fireflies";
import VolumetricLights from "../VolumetricLights";
import * as THREE from "three";
import { Fog } from "spacesvr";
import { useWorld } from "../WorldState";
import { useAudio } from "utils/useAudio";

export function PostProcessing() {
  const { bloomObjects, lights } = useWorld();

  useAudio("https://d1p3v0j4bqcb21.cloudfront.net/audio/ambientnight.mp3");

  return (
    <group>
      <Fog color={new THREE.Color("black")} near={0.1} far={75} />
      <Fireflies count={500} scale={30} color={"lightblue"} size={200} position-z={-37} />
      <VolumetricLights />
      <EffectComposer
        multisampling={0}
        disableNormalPass
      >
        <Vignette />
        <SelectiveBloom
          lights={lights}
          selection={bloomObjects}
          intensity={2.5}
          luminanceThreshold={0}
        />
      </EffectComposer>
    </group>
  )
}
