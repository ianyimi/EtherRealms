/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Sahir Virmani (https://sketchfab.com/sahirvirmani)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/japanese-torii-gate-2027a248de1b4b70985ff97e708fb50d
title: Japanese Torii Gate
*/
/* This work is based on "Japanese Torii Gate" (https://sketchfab.com/3d-models/japanese-torii-gate-2027a248de1b4b70985ff97e708fb50d) by Sahir Virmani (https://sketchfab.com/sahirvirmani) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/) */

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import {useTrimeshCollision} from "spacesvr";
import {BufferGeometry} from "three";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder_torii_0: THREE.Mesh
  }
  materials: {
    torii: THREE.MeshStandardMaterial
  }
}

const FILE_URL = "https://d1p3v0j4bqcb21.cloudfront.net/models/torii-1644635074/scene.glb.gz";

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult

  useTrimeshCollision((nodes.Cylinder_torii_0.geometry as BufferGeometry)
    .clone()
    .rotateX(-Math.PI/2)
    .scale(3, 3, 3)
    .translate(0, 6, 0)
  )

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="256af2fb49144e9a9324f305603790ecfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode">
              <group
                name="Cylinder"
                position={[0, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[1, 1, 1]}>
                <mesh name="Cylinder_torii_0" geometry={nodes.Cylinder_torii_0.geometry} material={materials.torii} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(FILE_URL)
