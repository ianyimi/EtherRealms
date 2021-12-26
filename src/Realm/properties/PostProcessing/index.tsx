import {EffectComposer, SelectiveBloom, Vignette} from "@react-three/postprocessing";
import { useRealm } from "../../components/RealmState";
import Fog from "./RlmFog";
import Fireflies from "./Fireflies";
import VolumetricLights from "./VolumetricLights";

export function PostProcessing() {

  const { effects } = useRealm();

  return (
    <group>
      <Fog />
      {/*<Fireflies count={100} scale={5} color="lightgreen" size={200} />*/}
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
