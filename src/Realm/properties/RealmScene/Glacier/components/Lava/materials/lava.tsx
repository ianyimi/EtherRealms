import {DoubleSide, Matrix4, ShaderMaterial, Uniform} from "three";
import { useMemo } from "react";
import { useLimiter } from "spacesvr";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import {useRealm} from "../../../../../../components/RealmState";

export const useLavaMat = (): ShaderMaterial => {
  const { scene: { theme = "Black" } } = useRealm();
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          textureMatrix: new Uniform(new Matrix4()),
          fogDensity: new Uniform(0.45),
          fogColor: new Uniform(new THREE.Color(theme.toLowerCase())),
          uvScale: new Uniform(new THREE.Vector2(3.0, 1.0)),
          time: new Uniform(0),
          resolution: new Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight))
        },
        vertexShader: vert,
        fragmentShader: frag,
        side: DoubleSide,
      }),
    [frag, vert]
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
  uniform mat4 textureMatrix;
  uniform vec2 uvScale;
  uniform float time;
  varying vec4 mirrorCoord;
  varying vec4 worldPosition;
  varying vec2 vUv;
  #include <common>
  #include <fog_pars_vertex>
  #include <shadowmap_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  void main() {
    vec2 vUv = uvScale*uv;
    mirrorCoord = modelMatrix * vec4( position, 1.0 );
    worldPosition = mirrorCoord.xyzw;
    mirrorCoord = textureMatrix * mirrorCoord;
    vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    #include <shadowmap_vertex>
  }
`;

const frag = `
  uniform float time;
  
  uniform float fogDensity;
  uniform vec3 fogColor;
  
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  
  varying vec2 vUv;
  
  void main( void ) {
  
    vec2 position = - 1.0 + 2.0 * vUv;
    
    vec4 noise = texture2D( texture1, vUv );
    vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
    vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;
    
    T1.x += noise.x * 2.0;
    T1.y += noise.y * 2.0;
    T2.x -= noise.y * 0.2;
    T2.y += noise.z * 0.2;
    
    float p = texture2D( texture1, T1 * 2.0 ).a;
    
    vec4 color = texture2D( texture2, T2 * 2.0 );
    vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );
    
    if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
    if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
    if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }
    
    gl_FragColor = temp;
    
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    const float LOG2 = 1.442695;
    float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
    fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );
    
    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
  
  }


`;
