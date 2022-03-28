import { useTrimeshCollision } from "spacesvr";
import { Euler, Vector3 } from "three";
import * as THREE from "three";
import {MutableRefObject, useEffect, useMemo} from "react";
import {GroupProps, useThree} from "@react-three/fiber";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";

type CollisionProps = {
  nodes: Record<string, THREE.Mesh>,
  position?: Vector3,
  rotation?: Euler,
  scale?: number,
  meshIndexes?: number[]
}

export function useTrimeshCollisions(props: CollisionProps) {
  const { nodes, position = new Vector3(), rotation = new Euler(), scale = 1, meshIndexes } = props;
  const { scene } = useThree();

  console.log(nodes)
  // const mergedGeo = new THREE.BufferGeometry();
  // const geometries = [];
  // for (const mesh of Object.values(nodes)) {
  //   geometries.push(mesh.geometry as BufferGeometry)
  // }
  // const mergedGeo2 = useMemo(() => {}, [])

  const geometries: THREE.BufferGeometry[] = []
  for (let i=0; i<Object.values(nodes).length; i++) {
    const obj = Object.values(nodes)[i];
    if (obj.children.length > 1) {
      console.log(obj)
      console.log(obj.children)
      for (const mesh of obj.children) {
        // console.log(mesh)
        mesh.updateMatrix();
        geometries.push((mesh as THREE.Mesh).geometry)
      }
    }
  }
  console.log(geometries)

  // const mergedGeo = BufferGeometryUtils.mergeBufferGeometries(geometries)
  // console.log(mergedGeo)

  // const mesh = new THREE.Mesh(mergedGeo, new THREE.MeshBasicMaterial({ color: "green" }));
  // mesh.scale.set(scale, scale, scale);
  // mesh.rotation.set(rotation.x, rotation.y, rotation.z);
  // mesh.position.set(position.x, position.y, position.z);
  // console.log(mesh)
  // scene.add(mesh)


  // useTrimeshCollision(mergedGeo.clone()
  //   .scale(scale || 0, scale || 0, scale || 0)
  //   .rotateX((rotation as Euler).x || 0)
  //   .rotateY((rotation as Euler).y || 0)
  //   .rotateZ((rotation as Euler).z || 0)
  //   .translate((position as Vector3).x, (position as Vector3).y, (position as Vector3).z)
  // )

  // const geo = new THREE.BufferGeometry()
  // const box = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 3, 1), new THREE.MeshBasicMaterial({ color: "red" }))
  // const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 20, 20), new THREE.MeshBasicMaterial({ color: "blue" }))
  // box.updateMatrix();
  // sphere.updateMatrix();
  // const mergedGeo2 = BufferGeometryUtils.mergeBufferGeometries([box.geometry, sphere.geometry])
  // useTrimeshCollision(mergedGeo2.clone())

  // useEffect(() => {
  //   if (!groupRef || !groupRef.current) return;
  //   const offset = {
  //     position: new Vector3(),
  //     rotation: new Vector3()
  //   };
  //   groupRef.current.traverse(obj => {
  //     if (!obj.position.equals(new Vector3())) {
  //       offset.position = obj.position;
  //     }
  //     if (!obj.rotation.equals(new Euler())) {
  //       offset.rotation = obj.position;
  //     }
  //     if (obj instanceof THREE.Mesh) {
  //       const help = 0;
  //     }
  //   })
  // }, [groupRef?.current])

}