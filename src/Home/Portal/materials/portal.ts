import { DoubleSide, ShaderMaterial, Uniform } from "three";
import { useMemo } from "react";
import { useLimiter } from "spacesvr";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const usePortalMat = (radius?: number, colors?: number[]): ShaderMaterial => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          // radius: new Uniform(radius),
          // colors: new Uniform(colors),
          // num_colors: new Uniform(colors.length),
          time: new Uniform(0),
          resolution: new Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight))
        },
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        // side: DoubleSide,
      }),
    [radius, colors]
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
  // Voronoi Portal
  // Voronoi Variation + Fractional Brownian Motion
  // By: Brandon Fogerty
  // bfogerty at gmail dot com
  // xdpixel.com
  
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  uniform float time;
  uniform vec2 mouse;
  uniform vec2 resolution;
  varying vec2 vUv;
  
  vec2 hash( vec2 p )
  {
       mat2 m = mat2( 15.32, 83.43,
                       117.38, 289.59 );
      
       return fract( sin( m * p) * 46783.289 );
  }
  
  float voronoi( vec2 p )
  {
       vec2 g = floor( p );
       vec2 f = fract( p );
      
       float distanceFromPointToCloestFeaturePoint = 1.0;
       for( int y = -1; y <= 1; ++y )
       {
            for( int x = -1; x <= 1; ++x )
            {
                 vec2 latticePoint = vec2( x, y );
                 float h = distance( latticePoint + hash( g + latticePoint), f );
                    
                 distanceFromPointToCloestFeaturePoint = min( distanceFromPointToCloestFeaturePoint, h ); 
            }
       }
      
       return 1.0 - sin(distanceFromPointToCloestFeaturePoint);
  }
  
  float texture(vec2 uv )
  {
      float t = voronoi( uv * 8.0 + vec2(time) );
      t *= 1.0-length(uv * 2.0);
      
      return t;
  }
  
  float fbm( vec2 uv )
  {
      float sum = 0.00;
      float amp = 1.0;
      
      for( int i = 0; i < 4; ++i )
      {
          sum += texture( uv ) * amp;
          uv += uv;
          amp *= 0.8;
      }
      
      return sum;
  }
  
  void main()
  {
      //vec2 uv = gl_FragCoord.xy / resolution.xy;
      //fragColor = vec4(uv,0.5+0.5*sin(time),1.0);
      
      vec2 uv = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;
      uv.x *= resolution.x / resolution.y;
  
      float t = pow( fbm( (vUv * 0.8) - 0.2 ), 0.1);
      gl_FragColor = vec4( vec3( t * 2.0, t * 4.0, t * 8.0 ), 1. );
  }
`;
