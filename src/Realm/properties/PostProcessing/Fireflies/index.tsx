import * as THREE from 'three'
import { useMemo } from 'react'
import { useFireflyMat } from './shaders/firefly'

export default function Fireflies(props: { count?: number, scale?: number, color?: string, size?: number }) {
  const { count = 40, scale = 1, color = "white", size = 150 } = props;
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
    <group scale={scale}>
      <points key={count} material={mat}>
        <bufferGeometry>
          <bufferAttribute attachObject={['attributes', 'position']} count={count} array={positionArray} itemSize={3} />
          <bufferAttribute attachObject={['attributes', 'aScale']} count={count} array={scaleArray} itemSize={1} />
        </bufferGeometry>
      </points>
    </group>
  )
}
