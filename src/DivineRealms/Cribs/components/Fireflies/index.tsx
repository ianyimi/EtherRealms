import * as THREE from 'three'
import { useMemo } from 'react'
import { useFireflyMat } from './shaders/firefly'
import {GroupProps} from "@react-three/fiber";

export default function Fireflies(props: { count?: number, scale?: number, color?: string, size?: number } & GroupProps) {
  const { count = 40, scale = 1, color = "white", size = 150, ...restProps } = props;
  const [positionArray, scaleArray] = useMemo(() => {
    const positionArray = new Float32Array(count * 3)
    const scaleArray = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      new THREE.Vector3((Math.random() - 0.5) * 4, Math.random() * 1.5, (Math.random() - 0.5) * 4).toArray(positionArray, i * 3)
      scaleArray[i] = Math.random()
    }
    return [positionArray, scaleArray]
  }, [count])

  const mat = useFireflyMat(color, size);

  return (
    <group {...restProps}>
      <group scale={scale} position={[0, 0, 0]} renderOrder={1}>
        <points key={count} material={mat}>
          <bufferGeometry>
            <bufferAttribute attachObject={['attributes', 'position']} count={count} array={positionArray} itemSize={3} />
            <bufferAttribute attachObject={['attributes', 'aScale']} count={count} array={scaleArray} itemSize={1} />
          </bufferGeometry>
        </points>
      </group>
    </group>
  )
}
