import { EffectComposer, SelectiveBloom, Bloom } from "@react-three/postprocessing";
import {useWorld} from "./WorldState";
import {useThree} from "@react-three/fiber";

export default function PostProcessing() {

  const { gl } = useThree();
  const { lights, bloomObjects } = useWorld();

  console.log(lights)
  console.log(bloomObjects)
  return (
    <EffectComposer
      multisampling={0}
      disableNormalPass
    >
      <Bloom
        intensity={1}
      />
      {/*<SelectiveBloom*/}
      {/*  lights={lights}*/}
      {/*  selection={bloomObjects}*/}
      {/*  exposure={1}*/}
      {/*  bloomStrength={5}*/}
      {/*  bloomRadius={0.5}*/}
      {/*/>*/}
    </EffectComposer>
  )
}
