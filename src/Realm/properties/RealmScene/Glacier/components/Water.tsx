import { Water } from "three/examples/jsm/objects/Water";
import * as THREE from "three";
import {GroupProps, useFrame} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {useLimiter} from "spacesvr";
import {useRealm} from "../../../../components/RealmState";

export default function WaterPlane(props: GroupProps) {

  const group = useRef();
  const { scene: { theme = "0x001e0f" } } = useRealm();
  const waterGeometry = new THREE.PlaneGeometry( 750, 750 );

  const water = new Water(waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load( 'https://d1p3v0j4bqcb21.cloudfront.net/images/waternormals.jpeg',
        function ( texture ) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: theme.toLocaleLowerCase(),
      distortionScale: 3.7,
      side: THREE.DoubleSide,
      fog: true
    }
  );

  water.rotation.x = - Math.PI / 2;

  const limiter = useLimiter(45);
  useFrame(({ clock}, delta) => {
    if (!limiter.isReady(clock) || !group.current) return;
    // @ts-ignore
    (group.current.children[0].material as THREE.ShaderMaterial).uniforms["time"].value += delta;
  })

  useEffect(() => {
    // @ts-ignore
    if (group.current) {
      // @ts-ignore
      group.current.children.length===0 && group.current.add(water);
      console.log(group.current)
    }
  }, [group.current])

  return (
    <group ref={group} {...props} />
  )
}
