import {GroupProps} from "@react-three/fiber";

export function Floor(props: { color?: string } & GroupProps) {
  const { color = "white", ...restProps } = props;
  return (
    <group name="floor" rotation-x={-Math.PI/2} {...restProps}>
      <mesh>
        <planeBufferGeometry args={[500, 500]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}
