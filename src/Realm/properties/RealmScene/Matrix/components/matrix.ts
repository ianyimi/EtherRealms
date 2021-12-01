import { DoubleSide, ShaderMaterial, Uniform } from "three";
import { useMemo } from "react";
import { useLimiter } from "spacesvr";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import {useTexture} from "@react-three/drei";

export const useMatrixMat = (color: number): ShaderMaterial => {
  const tex = useTexture(
    "https://d1p3v0j4bqcb21.cloudfront.net/images/matrix.png"
  );
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          color: new Uniform(color),
          tex: new Uniform(tex),
          time: new Uniform(0),
          resolution: new Uniform(new THREE.Vector2(window.innerWidth/2, window.innerHeight/2))
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: DoubleSide,
      }),
    [color, tex, frag, vert]
  );

  const limiter = useLimiter(30);
  useFrame(({ clock }) => {
    if (mat && limiter.isReady(clock)) {
      mat.uniforms.time.value = clock.getElapsedTime()/10;
    }
  });

  return mat;
};

const vert = `
    varying vec3 absPosition;
    void main() {
        absPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

const frag = `
  #define CELLS vec2(64.0,30.0)
  #define FALLERS 14.0
  #define FALLERHEIGHT 12.0
  
  uniform highp float time;
  uniform sampler2D tex;
  uniform vec2 resolution;
  
  // vec2 resolution = vec2(2.);
  
  vec2 rand(vec2 uv) {
      return floor(abs(mod(cos(
          uv * 652.6345 + uv.yx * 534.375 +
          time * 0.0000005 * dot(uv, vec2(0.364, 0.934))),
       0.001)) * 16000.0);
  }
  
  float fallerSpeed(float col, float faller) {
      return mod(cos(col * 363.435  + faller * 234.323), 0.1) * 1.0 + 0.3;
  }
  
  void main()
  {
      vec2 uv = gl_FragCoord.xy/resolution.xy;
      
      vec2 pix = mod(uv, 1.0/CELLS);
      vec2 cell = (uv - pix) * CELLS;
      pix *= CELLS * vec2(0.8, 1.0) + vec2(0.1, 0.0);
     
      float c = texture2D(tex, (rand(cell) + pix) / 16.0).x;
      
      float b = 0.0;
      for (float i = 0.0; i < FALLERS; ++i) {
          float f = 3.0 - cell.y * 0.05 -
              mod((time + i * 3534.34) * fallerSpeed(cell.x, i), FALLERHEIGHT);
          if (f > 0.0 && f < 1.0)
              b += f;
      }
      
      gl_FragColor = vec4(0.0, c * b, 0.0, 1.0);
  }
`;
