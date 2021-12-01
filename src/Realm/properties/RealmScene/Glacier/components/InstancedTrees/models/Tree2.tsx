/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Cylinder009: THREE.Mesh
    Cylinder009_1: THREE.Mesh
  }
  materials: {
    ['TREE!_BARK1_.002']: THREE.MeshStandardMaterial
    leaf: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/tree2.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Catenary" position={[-20.7264, 20.9549, -9.0286]} />
        <group name="Light" position={[4.0762, 5.9039, -1.0055]} rotation={[1.8901, 0.8806, -2.0452]} />
        <group name="Camera" position={[7.3589, 4.9583, 6.9258]} rotation={[1.2421, 0.33, -0.7597]} />
        <group name="TREE_BARK_2005" position={[1.6614, 1.535, 1.2562]} scale={[1.5873, 2.3887, 1.5873]}>
          <mesh name="Cylinder009" geometry={nodes.Cylinder009.geometry} material={materials['TREE!_BARK1_.002']} />
          <mesh name="Cylinder009_1" geometry={nodes.Cylinder009_1.geometry} material={materials.leaf} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/tree2.glb')