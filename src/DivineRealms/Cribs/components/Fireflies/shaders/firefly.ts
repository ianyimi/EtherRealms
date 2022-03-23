import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo } from "react";
import { ShaderMaterial, Uniform } from 'three';
import { useLimiter } from "spacesvr";

export const useFireflyMat = (color: string, size: number) => {
  const colorRgb = new THREE.Color(color);
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: new Uniform(0),
          uPixelRatio: new Uniform(Math.min(window.devicePixelRatio, 2)),
          uSize: new Uniform(size || 150),
          uColor: new Uniform([colorRgb.r, colorRgb.g, colorRgb.b])
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: THREE.DoubleSide,
        transparent: true,
      }),
    [color, size]
  );

  const limiter = useLimiter(30);
  useFrame(({ clock }, delta) => {
    if (!mat || !limiter.isReady(clock)) return;
    // @ts-ignore
    mat.uniforms.uTime.value = ((new Date() / 1000) % 10000) / 5;;
  });

  return mat;
}

const vert = `
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uTime;
  attribute float aScale;    
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
    modelPosition.z += cos(uTime + modelPosition.x * 100.0) * aScale * 0.2;
    modelPosition.x += cos(uTime + modelPosition.x * 100.0) * aScale * 0.2;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPostion = projectionMatrix * viewPosition;    
    gl_Position = projectionPostion;
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
  }
`;

const frag = `
  uniform vec3 uColor;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    gl_FragColor = vec4(uColor.r, uColor.g, uColor.b, strength);
  }
`
