import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';
import { useRoomStore, cameraPresets } from '../store/roomStore';
import { Room } from './Room';
import { FurnitureRenderer } from './FurnitureRenderer';
import { SelectionBox } from './SelectionBox';

function CameraController() {
  const { camera } = useThree();
  const { cameraPreset } = useRoomStore();
  const controlsRef = useRef<any>();

  useEffect(() => {
    const preset = cameraPresets.find(p => p.id === cameraPreset);
    if (preset && controlsRef.current) {
      camera.position.copy(preset.position);
      controlsRef.current.target.copy(preset.target);
      controlsRef.current.update();
    }
  }, [cameraPreset, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={20}
      maxPolarAngle={Math.PI / 2.1}
    />
  );
}

function GridHelper() {
  const { showGrid } = useRoomStore();
  
  if (!showGrid) return null;
  
  return (
    <Grid
      position={[0, 0.01, 0]}
      args={[20, 20]}
      cellSize={1}
      cellThickness={0.5}
      cellColor="#666666"
      sectionSize={5}
      sectionThickness={1}
      sectionColor="#888888"
      fadeDistance={25}
      fadeStrength={1}
      infiniteGrid
    />
  );
}

export function Scene() {
  const { showShadows } = useRoomStore();
  
  return (
    <div className="w-full h-full">
      <Canvas
        shadows={showShadows}
        camera={{ position: [8, 8, 8], fov: 75 }}
        gl={{ antialias: true }}
      >
        <CameraController />
        <GridHelper />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 15, 5]}
          intensity={0.8}
          castShadow={showShadows}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <pointLight position={[0, 10, 0]} intensity={0.3} />
        
        {/* Environment */}
        <Environment preset="apartment" />
        
        {/* Room and Furniture */}
        <Room />
        <FurnitureRenderer />
        <SelectionBox />
      </Canvas>
    </div>
  );
}