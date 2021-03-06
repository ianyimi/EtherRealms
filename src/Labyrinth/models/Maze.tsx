/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshStandardMaterial, MeshLambertMaterial } from 'three'

type GLTFResult = GLTF & {
  nodes: {
    way_out_2: THREE.Mesh
    way_out_1: THREE.Mesh
    Wall: THREE.Mesh
    Roof: THREE.Mesh
    Floor: THREE.Mesh
    Top_Caps: THREE.Mesh
  }
  materials: any
}

const FILE_URL = "https://d1p3v0j4bqcb21.cloudfront.net/models/maze-1641249794/maze.glb.gz";

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(FILE_URL) as GLTFResult

  const basicMat = new MeshLambertMaterial({ color: "grey", side: THREE.DoubleSide });

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="Help" rotation={[-Math.PI / 2, 0, -Math.PI]}>
          <mesh name="way_out_2" geometry={nodes.way_out_2.geometry} material={nodes.way_out_2.material} />
          <mesh name="way_out_1" geometry={nodes.way_out_1.geometry} material={nodes.way_out_1.material} />
        </group>
        <mesh
          name="Wall"
          geometry={nodes.Wall.geometry}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="grey" side={THREE.DoubleSide} />
        </mesh>
        <mesh
          name="Roof"
          geometry={nodes.Roof.geometry}
          material={new MeshStandardMaterial({ color: "grey", side: THREE.DoubleSide })}
          position={[0, 59.785, 0]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          receiveShadow
        />
        <mesh
          name="Floor"
          geometry={nodes.Floor.geometry}
          material={new MeshStandardMaterial({ color: "grey", side: THREE.DoubleSide })}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          receiveShadow
        />
        <mesh
          name="Top_Caps"
          geometry={nodes.Top_Caps.geometry}
          material={nodes.Top_Caps.material}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          receiveShadow
        />
      </group>
    </group>
  )
}

useGLTF.preload(FILE_URL)
