import { InstancedMesh, Mesh, Object3D } from "three";
import { useLayoutEffect, useRef } from "react";

type InstancedObjectProps = {
  mesh: Mesh;
  transforms: Object3D[];
};

export default function InstancedObject(props: InstancedObjectProps) {
  const { mesh, transforms } = props;
  const instances = useRef<InstancedMesh>();

  useLayoutEffect(() => {
    if (!instances.current) return;

    for (let i = 0; i < transforms.length; i++) {
      const obj = transforms[i];
      obj.updateMatrix();
      instances.current.setMatrixAt(i, obj.matrix);
    }
    instances.current.instanceMatrix.needsUpdate = true;
  }, [transforms]);

  return (
    <group {...props}>
      <instancedMesh
        ref={instances}
        args={[mesh.geometry, mesh.material, transforms.length]}
      />
    </group>
  );
}
