import {EffectComposer, SelectiveBloom, Vignette} from "@react-three/postprocessing";
import {useWorld} from "./WorldState";
import {useThree} from "@react-three/fiber";

export default function PostProcessing() {

  const { lights, bloomObjects } = useWorld();

  console.log(bloomObjects)
  return (
    <EffectComposer
      multisampling={0}
      disableNormalPass
    >
      <Vignette />
      <SelectiveBloom
        lights={lights}
        selection={bloomObjects}
        luminanceThreshold={0.25}
        bloomRadius={0.05}
      />
    </EffectComposer>
  )
}
