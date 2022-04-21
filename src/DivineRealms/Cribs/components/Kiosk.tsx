import {GroupProps, useLoader} from "@react-three/fiber";
import { Interactable } from "spacesvr";
import * as THREE from "three";
import {useMemo} from "react";

export default function Kisok(props: { title: string, link?: string } & GroupProps) {
  const { title, link, ...restProps } = props;

  const font = useLoader(THREE.FontLoader, "/fonts/Etherrealms.json");
  const size = 1
  const config = useMemo(() => ({
    font: font,
    size: size,
    height: size/10,
    curveSegments: 32,
    textAlign: "center",
  }), [font])

  const visitAsset = (link?: string) => {
    if (!link) return;
    window.open(link, "_blank")
  }

  return (
    <group name="title kiosk" {...restProps}>
      <Interactable onClick={() => {visitAsset(link)}}>
        <mesh>
          <textBufferGeometry args={[title, config]} />
          <meshStandardMaterial metalness={0.2} roughness={0.3} color="white" />
        </mesh>
      </Interactable>
    </group>
  )
}