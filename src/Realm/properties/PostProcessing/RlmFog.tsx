import { Fog } from "spacesvr";
import { useRealm } from "../../components/RealmState";
import * as THREE from "three";

export default function RlmFog() {

  const { effects } = useRealm();
  const ACTIVE = effects && effects.name === "Fog";

  return (
    <group>
      {ACTIVE && <Fog color={new THREE.Color(effects?.color)} near={75} far={250} />}
    </group>
  )
}