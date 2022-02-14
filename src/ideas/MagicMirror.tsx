import {useRef, useState} from "react";
import {useFrame, createPortal, GroupProps, useThree} from "@react-three/fiber";
import {PerspectiveCamera, useFBO} from "@react-three/drei";
import * as THREE from "three";

export default function MagicMirror(props: { children: any, args?: [width: number | undefined, height: number | undefined] } & GroupProps) {
  const { children, args = [3, 3], ...restProps } = props;
  const cam = useRef();
  const plane = useRef();
  // useFBO creates a WebGL2 buffer for us, it's a helper from the "drei" library
  const fbo = useFBO()
  // The is a separate scene that we create, React will portal into that
  const [newScene] = useState(() => new THREE.Scene())
  // Tie this component into the render-loop

  const { scene } = useThree();
  const tempCam = new THREE.PerspectiveCamera(50, 1, 0.1, 500);
  tempCam.position.set(-10, 1, 0);
  // tempCam.rotation.set(0, -Math.PI/2, 0)
  scene.add(tempCam);

  useFrame((state) => {
    tempCam.position.set(tempCam.position.x, 1, state.camera.position.z);
    tempCam.lookAt(plane?.current.position.x, 1, plane?.current.position.z);
    // Our portal has its own camera, but we copy the originals world matrix
    cam.current?.matrixWorldInverse.copy(tempCam.matrixWorldInverse)
    // Then we set the render-target to the buffer that we have created
    state.gl.setRenderTarget(fbo)
    // We render the scene into it, using the local camera that is clamped to the planes aspect ratio
    state.gl.render(newScene, cam.current)
    // And flip the render-target to the default again
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      <mesh ref={plane} {...restProps}>
        <planeGeometry args={args} />
        {/* The "mirror" is just a boring plane, but it receives the buffer texture */}
        <meshBasicMaterial map={fbo.texture} />
      </mesh>
      <PerspectiveCamera manual ref={cam} fov={30} aspect={args[0] / args[1]} onUpdate={(c) => c.updateProjectionMatrix()} />
      {/* This is React being awesome, we portal this components children into the separate scene above */}
      {createPortal(children, newScene)}
    </>
  )
}
