import { useMemo } from "react";
import { DoubleSide, ShaderMaterial, Uniform } from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLimiter } from "spacesvr";

export const useParticleMaterial = () => {
  const tex = useTexture(
    "https://s3.eu-west-3.amazonaws.com/puratos-sourdough-museum/files_staging/spark.png"
  );

  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          time: new Uniform(0),
          tex: new Uniform(tex),
        },
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        side: DoubleSide,
      }),
    [tex, frag, vert]
  );

  const limiter = useLimiter(40);
  useFrame(({ clock }) => {
    if (mat && limiter.isReady(clock)) {
      mat.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return mat;
};

const perlin = `
  vec2 hash22( vec2 p )
  {
    p = vec2( dot(p,vec2(127.1,311.7)),
          dot(p,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  }
  float perlinnoise( in vec2 p )
  {
    const float K1 = 0.366025404; 
    const float K2 = 0.211324865; 
    vec2 i = floor( p + (p.x+p.y)*K1 );
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
    vec3 n = h*h*h*h*vec3( dot(a,hash22(i+0.0)), dot(b,hash22(i+o)), dot(c,hash22(i+1.0)));
    return dot( n, vec3(70.0) );
    
  }
`;

export const vert = `
  precision highp float;
  uniform float time;
  attribute float seed;
  attribute float id;
    varying vec2 vUv;
    varying float vId;
    varying float vSeed;
 ${perlin}
   
  void main() {
      vec3 pos = position;
      vUv = uv;
      vId = id;
      vSeed = seed;
      
      float u_time = time * 0.1;
      pos.x += perlinnoise(vec2(30. + id, u_time));
      pos.y += perlinnoise(vec2(10. + id, u_time + 100.));
      pos.z += perlinnoise(vec2(0. + id, -u_time));
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }
`;

export const frag = `
  precision highp float;
  uniform sampler2D tex;
  uniform float time;
  varying vec2 vUv;
  varying float vId;
    varying float vSeed;
    
  #define fogNear 0.
  #define fogFar 1000.
  #define fogColor vec3(1., 1., 1.)
  
  void main() {
    gl_FragColor = texture2D(tex, vUv);
    gl_FragColor.a = 1. - (4. * length(vUv - 0.5));
    
    gl_FragColor.a *= pow(clamp(0.4 + sin(time * (1.3 + vSeed * 0.2) + vId * 100.), 0., 1.), 7.);
    
    // // account for fog
    // float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float fogFactor = smoothstep( fogNear, fogFar, depth );
    // gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
  }
`;
