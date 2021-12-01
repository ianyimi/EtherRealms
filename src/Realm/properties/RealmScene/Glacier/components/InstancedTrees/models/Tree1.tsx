/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Cylinder003: THREE.Mesh
    Cylinder003_1: THREE.Mesh
    Cylinder003_2: THREE.Mesh
  }
  materials: {
    ['TREE!_BARK1_.002']: THREE.MeshStandardMaterial
    leaf: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/tree1.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Catenary" position={[-20.7264, 20.9549, -9.0286]} />
        <group name="BARK1" position={[-25.7968, -0.2444, -3.3639]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.261}>
          <mesh name="Cylinder003" geometry={nodes.Cylinder003.geometry} material={materials['TREE!_BARK1_.002']} />
          <mesh name="Cylinder003_1" geometry={nodes.Cylinder003_1.geometry} material={materials.leaf} />
          <mesh name="Cylinder003_2" geometry={nodes.Cylinder003_2.geometry} material={materials['Material.001']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/tree1.glb')