import { GroupProps } from "@react-three/fiber";
import { Box, Sphere, Text } from "@react-three/drei";
import Nft from "../../components/Nft";
import { useRealm } from "EtherRealms/components/RealmState";
import {ReactNode, useEffect, useRef} from "react";
import { Triplet, useBox } from "@react-three/cannon";
import { useHelper } from "@react-three/drei";
import {Euler, Quaternion, SpotLightHelper, Vector3} from "three";

export default function DisplayCube(props: { assets: Record<string, any>[] } & GroupProps) {

  const { assets, ...restProps } = props;
  const { scene: { theme = "Red" } } = useRealm();
  const group = useRef<THREE.Group>();
  const light = useRef();

  const images: ReactNode[] = [];
  for (let i=0; i<assets.length; i++) {
    if (!assets[i]) continue;
    images.push(
      <group rotation-y={2*i*Math.PI/4} key={i}>
        <group position-z={1.1}>
          <Nft asset={assets[i]} position-y={2} />
        </group>
        {/*<spotLight ref={light} position={[0, 1, 10]} intensity={0.1} distance={50} castShadow />*/}
      </group>
    )
  }

  const [collider, api] = useBox(() => ({ args: [2, 4, 2], rotation: restProps.rotation as Triplet }));
  useEffect(() => {
    if (group.current) {
      const colliderPos = new Vector3();
      const colliderQuat = new Quaternion();
      group.current.getWorldPosition(colliderPos);
      group.current.getWorldQuaternion(colliderQuat);
      api.position.set(colliderPos.x, colliderPos.y+1, colliderPos.z);
      const colliderRot = new Euler().setFromQuaternion(colliderQuat.normalize());
      api.rotation.set(colliderRot.x, colliderRot.y, colliderRot.z);
    }
  }, [group.current])

  return (
    <group name="displayCube">
      <group {...restProps}>
        <group ref={group}>
          {images}
          <mesh position-y={1} castShadow receiveShadow>
            <boxBufferGeometry args={[2, 4, 2]} />
            <meshStandardMaterial color={theme.toLowerCase()} />
          </mesh>
        </group>
      </group>
      <group>
        <mesh ref={collider} position-y={1}>
          <boxBufferGeometry args={[2, 4, 2]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </group>
    </group>
  )
}
