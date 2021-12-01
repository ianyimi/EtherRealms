import { Mesh, Object3D, Vector3 } from "three";
import React, { useEffect, useMemo, useState } from "react";
import InstancedObject from "./components/InstancedObject";
import { useGLTF } from "@react-three/drei";
// @ts-ignore
import seedrandom from "seedrandom";

const TREES_URL = [
  "https://d1p3v0j4bqcb21.cloudfront.net/models/icebrgs-1638322726/icebrgs.glb.gz"
];
const RADIUS = 5;
const COLORS = [
  0.62, 0.988, 0.992, 0.757, 0.922, 0.992, 0.867, 0.847, 0.988, 0.961, 0.765,
  0.984,
];

type RenderTreeProps = { url: string; placements: Object3D[] };

function RenderTree(props: RenderTreeProps) {
  const { url, placements } = props;

  const gltf = useGLTF(url);

  const [meshes, setMeshes] = useState<Mesh[]>();

  useEffect(() => {
    const m: Mesh[] = [];
    gltf.scene.traverse((child) => {
      // @ts-ignore
      if (child.isMesh) {
        m.push(child as Mesh);
      }
    });
    setMeshes(m);
  }, [gltf]);

  return (
    <group name={`trees-${url}`}>
      {meshes?.map((mesh) => (
        <InstancedObject mesh={mesh} transforms={placements} />
      ))}
    </group>
  );
}

type TreeObject = { url: string; placements: Object3D[] };
type TreeProps = { seed?: string };
const PI = Math.PI;

export default function Trees(props: TreeProps) {
  const { seed = "kiosks yo!" } = props;

  const objects: TreeObject[] = useMemo(() => {
    const objs: TreeObject[] = TREES_URL.map((url) => ({
      url,
      placements: [],
    }));

    const rng = seedrandom(seed);

    const AMOUNT = 0.75;
    const TOTAL_COUNT = 5000;

    for (let i = 0; i < TOTAL_COUNT; i++) {
      if (rng() > AMOUNT) continue;
      const r = Math.random()*500;
      if (r<7) continue;
      const objIndex = Math.floor(Math.pow(rng(), 1.2) * TREES_URL.length);
      const placement = new Object3D();

      // initial scale and y height
      placement.scale.multiplyScalar(0.25 + 0.5*Math.random());
      placement.position.y += 0;

      const theta = (PI * (2+Math.random()) * i) / TOTAL_COUNT;

      const angle = 3;
      if (theta > angle && theta < angle+0.35) continue;

      placement.position.add(
        new Vector3().setFromSphericalCoords(r, PI / 2, theta)
      );
      placement.rotation.y = theta;

      objs[objIndex].placements.push(placement);
    }

    return objs;
  }, [seed]);

  return (
    <group name="trees">
      {objects.map((obj) => (
        <RenderTree {...obj} />
      ))}
    </group>
  );
}

useGLTF.preload(TREES_URL[0])
