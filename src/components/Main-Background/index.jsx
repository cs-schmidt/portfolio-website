import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { WebGLRenderer, Color, AdditiveBlending } from 'three';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import throttle from '../../utils/throttle';
import vertexShader from './shaders/vertex-shader.glsl';
import fragmentShader from './shaders/fragment-shader.glsl';
import './styles.scss';

/** The site-wide background component. */
export default function MainBackground() {
  const initRenderer = useCallback((canvas) => {
    const renderer = new WebGLRenderer({
      canvas,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x141414, 1);
    return renderer;
  });
  return (
    <div className="main-bg">
      <Canvas gl={initRenderer} camera={{ position: [0, 0, 1] }}>
        <NoiseSphere />
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            blendFunction={BlendFunction.SCREEN}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.00005, 0.00005]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function NoiseSphere() {
  const mesh = useRef();
  const geometry = useRef();
  const material = useRef();

  // NOTE: Component re-renders if the camera changes.
  const camera = useThree((state) => state.camera);

  /**
   * Calculates the radius the mesh needs to stay within the desired
   * proportional bounds of the layout.
   */
  const properMeshRadius = useCallback(() => {
    const { fov, aspect: aspectRatio } = camera;
    const navHeight = document.querySelector('.main-nav').clientHeight; // navbar height in CSS pixel units.
    const vGap = 16; // vertical gap in CSS pixel units.
    const distance = camera.position.length(); // distance from camera to origin (i.e., mesh's center).

    // Plane height variables.
    const planeHeight = 2 * distance * Math.tan((fov / 2) * (Math.PI / 180));
    const navPlaneHeight = planeHeight * (navHeight / window.innerHeight);
    const vGapPlaneHeight = planeHeight * (vGap / window.innerHeight);
    const meshVSpace = planeHeight - 2 * (navPlaneHeight + vGapPlaneHeight);
    const distVSub = distance / (1 + (meshVSpace / 2) ** 2 / distance ** 2);
    const heightSub = (distVSub * (meshVSpace / 2)) / distance;

    // Plane width variables.
    const planeWidth = aspectRatio * planeHeight;
    let layoutWidth;

    if (window.innerWidth < 600) layoutWidth = window.innerWidth - 2 * 16;
    else if (window.innerWidth < 900) layoutWidth = window.innerWidth - 2 * 32;
    else if (window.innerWidth < 1240)
      layoutWidth = Math.min(840, window.innerWidth - 2 * 24);
    else layoutWidth = Math.min(1040, window.innerWidth - 2 * 24);

    const meshHSpace = planeWidth * (layoutWidth / window.innerWidth);
    const distHSub = distance / (1 + (meshHSpace / 2) ** 2 / distance ** 2);
    const widthSub = (distHSub * (meshHSpace / 2)) / distance;

    // Possible radii (relative to height and width).
    const heightEnclosedRadius = Math.sqrt(
      heightSub ** 2 + (distance - distVSub) ** 2
    );
    const widthEnclosedRadius = Math.sqrt(
      widthSub ** 2 + (distance - distHSub) ** 2
    );

    return Math.min(heightEnclosedRadius, widthEnclosedRadius);
  }, []);

  // The configuraton for the shader material.
  const shaderConfig = useMemo(
    () => ({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable'
      },
      uniforms: {
        time: { type: 'f', value: 0 },
        frequency: { type: 'f', value: 2.0 },
        amplitude: { type: 'f', value: 1.2 },
        maxDistance: { type: 'f', value: 2.5 },
        uColor: { value: new Color(0x8c2f39) }
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexShader,
      fragmentShader
    }),
    []
  );

  // Sets up a resize listener which changes the scale of the mesh to fit within
  // the desired bounds.
  useEffect(() => {
    const initialRadius = properMeshRadius();
    window.addEventListener(
      'resize',
      throttle(() => {
        mesh.current.scale.setScalar(properMeshRadius() / initialRadius);
      }, 50)
    );
  }, []);

  // Increments mesh's rotation and time with each frame.
  useFrame(() => {
    mesh.current.rotation.y += 0.0003;
    material.current.uniforms.time.value += 0.025;
  });

  return (
    <points ref={mesh} position={[0, 0, 0]}>
      <icosahedronGeometry ref={geometry} args={[properMeshRadius(), 25]} />
      <shaderMaterial ref={material} {...shaderConfig} />
    </points>
  );
}
