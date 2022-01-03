import { DoubleSide, ShaderMaterial, Uniform } from "three";
import { useMemo } from "react";
import { useLimiter } from "spacesvr";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export const useMatrixMat = (matrixColor: string, fogColor = "black"): ShaderMaterial => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          color: new Uniform(new THREE.Color(matrixColor)),
          fogColor: new Uniform(new THREE.Color(fogColor)),
          time: new Uniform(0),
          resolution: new Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight))
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: DoubleSide,
      }),
    [frag, vert, matrixColor, fogColor]
  );

  const limiter = useLimiter(30);
  useFrame(({ clock }) => {
    if (mat && limiter.isReady(clock)) {
      mat.uniforms.time.value = clock.getElapsedTime()/2;
    }
  });

  return mat;
};

const vert = `
    varying vec3 absPosition;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        absPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

const frag = `
  #define fogNear 0.
  #define fogFar 500.
  // #define fogColor vec3(0., 0., 0.)

  uniform highp float time;
  uniform sampler2D tex;
  uniform sampler2D tex2;
  uniform vec2 resolution;
  uniform vec3 color;
  uniform vec3 fogColor;
  
  varying vec2 vUv;
  precision mediump float;
  
  float random(vec2 v) {
    return fract(sin(v.x * 32.1231 - v.y * 2.334 + 13399.2312) * 2412.32312);
  }
  float random(float x, float y) {
    return fract(sin(x * 32.1231 - y * 2.334 + 13399.2312) * 2412.32312);
  }
  float random(float x) {
    return fract(sin(x * 32.1231 + 13399.2312) * 2412.32312);
  }

  float character(float i) {    
     return i<15.01? floor(random(i)*32768.) : 0.;
  }

  void main() {
    vec2 S = 25. * vec2(3., 50.);
    vec2 c = floor(vUv * S);

    float offset = random(c.x) * S.x;
    float speed = random(c.x * 3.) * .5 + 0.2;
    float len = random(c.x) * 15. + 100.;
    float u = 1. - fract(c.y / len + time * speed + offset) * 2.;

    float padding = 2.;
    vec2 smS = vec2(3., 5.);
    vec2 sm = floor(fract(vUv * S) * (smS + vec2(padding))) - vec2(padding);
    float symbol = character(floor(random(c + floor(time * speed)) * 15.));
    bool s = sm.x < 0. || sm.x > smS.x || sm.y < 0. || sm.y > smS.y ? false
             : mod(floor(symbol / pow(2., sm.x + sm.y * smS.x)), 2.) == 1.;

    vec3 curRGB = color;
    if( s )
    {
        if( u > 0.9 )
            {
            curRGB.r = 1.0;
            curRGB.g = 1.0;
            curRGB.b = 1.0;
            }
        else
            curRGB = curRGB * u;
    }
    else
        curRGB = vec3( 0.0, 0.0, 0.0 );

    gl_FragColor = vec4(curRGB.x, curRGB.y, curRGB.z, 1.0);
    
    // account for fog
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = smoothstep( fogNear, fogFar, depth );
    gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
  }
`;
