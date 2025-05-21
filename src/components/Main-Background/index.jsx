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
  const initializeRenderer = useCallback((canvas) => {
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
      <Canvas gl={initializeRenderer} camera={{ position: [0, 0, 1] }}>
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

/** The main component for the background scene. */
function NoiseSphere() {
  const mesh = useRef(null);
  const geometry = useRef(null);
  const material = useRef(null);
  // NOTE: Component re-renders if the camera changes.
  const camera = useThree((state) => state.camera);

  // Calulates the radius needed to contain the sphere within certain bounds.
  const properMeshRadius = useCallback(() => {
    const navHeight = document.querySelector('.main-nav').clientHeight; // in CSS pixels.
    const verticalGap = 16; // in CSS pixels.
    let layoutWidth; // in CSS Pixels.

    // Determine layout width.
    if (window.innerWidth < 600) layoutWidth = window.innerWidth - 2 * 16;
    else if (window.innerWidth < 900) layoutWidth = window.innerWidth - 2 * 32;
    else if (window.innerWidth < 1240)
      layoutWidth = Math.min(840, window.innerWidth - 2 * 24);
    else layoutWidth = Math.min(1040, window.innerWidth - 2 * 24);

    // Scene variables.
    const { fov, aspect: aspectRatio } = camera;
    const distance = camera.position.length(); // distance from camera to origin (the mesh's center).
    const planeHeight = 2 * distance * Math.tan((fov / 2) * (Math.PI / 180));
    const planeWidth = aspectRatio * planeHeight;
    const navPlaneHeight = planeHeight * (navHeight / window.innerHeight);
    const vGapPlaneHeight = planeHeight * (verticalGap / window.innerHeight);
    const meshHeight = planeHeight - 2 * (navPlaneHeight + vGapPlaneHeight);
    const meshWidth = planeWidth * (layoutWidth / window.innerWidth);
    const distVSub = distance / (1 + (meshHeight / 2) ** 2 / distance ** 2);
    const heightSub = (distVSub * (meshHeight / 2)) / distance;
    const distHSub = distance / (1 + (meshWidth / 2) ** 2 / distance ** 2);
    const widthSub = (distHSub * (meshWidth / 2)) / distance;

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

  // Adds a resize listener to the window which changes the scale of the mesh to
  // fit within the desired bounds.
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
