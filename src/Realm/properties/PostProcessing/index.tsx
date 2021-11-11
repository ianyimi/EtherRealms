import {EffectComposer, SelectiveBloom, Vignette} from "@react-three/postprocessing";
import { useRealm } from "../../components/RealmState";
import Fog from "./RlmFog";

export function PostProcessing() {

  const { effects } = useRealm();

  return (
    <group>
      <Fog />
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
