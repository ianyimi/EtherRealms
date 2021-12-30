import { DoubleSide, ShaderMaterial, Uniform } from "three";
import { useMemo } from "react";
import { useLimiter } from "spacesvr";
import { useFrame } from "@react-three/fiber";
import glsl from "glslify";
import * as THREE from "three";

export const usePortalMat = (mainColor: string, backgroundColor: string): ShaderMaterial => {
  // console.log(new THREE.Color(mainColor).toArray())
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          colorStart: new Uniform(new THREE.Color(mainColor).toArray()),
          colorEnd: new Uniform(new THREE.Color(backgroundColor).toArray()),
          time: new Uniform(0),
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: DoubleSide,
      }),
    [mainColor, backgroundColor]
  );

  const limiter = useLimiter(30);
  useFrame(({ clock }) => {
    if (!mat || !limiter.isReady(clock)) return;
    // @ts-ignore
    mat.uniforms.time.value = ((new Date() / 1000) % 10000) / 5;
  });

  return mat;
};

const vert = `
    varying vec2 vUv;
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;
      vUv = uv;
    }
`;

const frag = glsl`
    #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 
    uniform float time;
    uniform vec3 colorStart;
    uniform vec3 colorEnd;
    varying vec2 vUv;
    void main() {
      vec2 displacedUv = vUv + cnoise3(vec3(vUv * 50.0, time * 0.1));
      float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.2));
      float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;
      strength += outerGlow;
      strength += step(-0.2, strength) * 0.6;
      strength = clamp(strength, 0.0, 1.0);
      vec3 color = mix(colorStart, colorEnd, strength);
      gl_FragColor = vec4(color, 1.0);
    }
`;
