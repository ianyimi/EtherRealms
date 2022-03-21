import { useTrimeshCollision } from "spacesvr";
import {BufferGeometry, Euler, Vector3} from "three";
import * as THREE from "three";
import {MutableRefObject, useEffect, useMemo} from "react";
import {GroupProps} from "@react-three/fiber";

type collisionsProps = {
  nodes?: Record<string, THREE.Mesh>
  group: MutableRefObject<THREE.Group | undefined>
}

export function useTrimeshCollisions(props: collisionsProps) {
  const { nodes, group } = props;

  const mergedGeo = new THREE.BufferGeometry();
  // const geometries = [];
  // for (const mesh of Object.values(nodes)) {
  //   geometries.push(mesh.geometry as BufferGeometry)
  // }
  // const mergedGeo2 = useMemo(() => {}, [])

  useEffect(() => {
    if (!group.current) return;
    const offset = {
      position: new Vector3(),
      rotation: new Vector3()
    };
    group.current.traverse(obj => {
      if (!obj.position.equals(new Vector3())) {
        offset.position = obj.position;
      }
      if (!obj.rotation.equals(new Euler())) {
        offset.rotation = obj.position;
      }
      if (obj instanceof THREE.Mesh) {
        const help = 0;
      }
    })
  }, [group.current])

}