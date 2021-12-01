import { DoubleSide, ShaderMaterial, Uniform } from "three";
import { useMemo } from "react";
import { useLimiter } from "spacesvr";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";

export const useSkyMat = (): ShaderMaterial => {
  const { camera } = useThree();
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          time: new Uniform(0),
          resolution: new Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: DoubleSide,
      }),
    []
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
    varying vec3 absPosition;
    varying vec2 vUv;
    void main() {
        vUv = uv/2.;
        absPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

const frag = `
  #define      PI 3.14159265358979323846264338327950288419716939937511 // mm pie
  #define     TAU 6.28318530717958647692528676655900576839433879875021 // pi * 2
  #define HALF_PI 1.57079632679489661923132169163975144209858469968755 // pi / 2
  
  //
  // Description : Array and textureless GLSL 2D simplex noise function.
  //      Author : Ian McEwan, Ashima Arts.
  //  Maintainer : stegu
  //     Lastmod : 20110822 (ijm)
  //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
  //               Distributed under the MIT License. See LICENSE file.
  //               https://github.com/ashima/webgl-noise
  //               https://github.com/stegu/webgl-noise
  //
  
  uniform vec2 resolution;
  uniform highp float time;
  varying vec2 vUv;
  varying vec3 absPosition;
  
  vec3 mod289(vec3 x) {
      return x - floor(x * (1. / 289.)) * 289.;
  }
  
  vec2 mod289(vec2 x) {
      return x - floor(x * (1. / 289.)) * 289.;
  }
  
  vec3 permute(vec3 x) {
      return mod289(((x * 34.) + 1.) * x);
  }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0., i1.y, 1. )) + i.x + vec3(0., i1.x, 1. ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.);
    m = m*m;
    m = m*m;
    vec3 x = 2. * fract(p * C.www) - 1.;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - .85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130. * dot(m, g);
  }
  
  vec3 hsv2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);
    rgb = rgb * rgb * (3. - 2. * rgb);
    return c.z * mix(vec3(1.), rgb, c.y);
  }
  
  vec2 pq(vec2 uv) {
    return vec2(atan(uv.x, uv.y) / TAU + .5, length(uv));;
  }
  
  vec4 glorb(vec2 uv, vec2 offset, float radius) {
    vec2 pq = pq(uv + offset);
    float r = radius * snoise(uv + time * .2);
    float s = 8. / resolution.y;
    float m = smoothstep(r + s, r - s, pq.y);
    vec3 c = hsv2rgb(vec3(pq.x, 1., 1.));
    return vec4(c, 1.) * m;
  }
  
  vec4 field(vec2 uv, vec2 offset, float radius) {
    vec4 c0 = glorb(uv, offset, radius);
    vec4 c1 = glorb(uv, offset, radius * .92);
    return c0 - c1;
  }
  
  void main() {
    // vec2 uv = (2. * gl_FragCoord.xy - resolution.xy) / resolution.y;
    vec4 r0 = field(vUv, vec2( .0, .0), 1.66);
    vec4 r1 = field(vUv, vec2( .33, .33), 1.66);
    vec4 r2 = field(vUv, vec2( .33, -.33), 1.66);
    vec4 r3 = field(vUv, vec2(-.33, -.33), 1.66);
    vec4 r4 = field(vUv, vec2(-.33, .33), 1.66);
    gl_FragColor = r0+r1+r2+r3+r4;
  }
`;
