import React from 'react';
import { useRoomStore } from '../store/roomStore';

export function Room() {
  const { roomColor, floorColor, showShadows } = useRoomStore();
  
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.1, 0]} receiveShadow={showShadows}>
        <boxGeometry args={[12, 0.2, 12]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 3, -6]} receiveShadow={showShadows}>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial color={roomColor} />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-6, 3, 0]} receiveShadow={showShadows}>
        <boxGeometry args={[0.2, 6, 12]} />
        <meshStandardMaterial color={roomColor} />
      </mesh>
      
      {/* Right Wall (partial for openness) */}
      <mesh position={[6, 3, -3]} receiveShadow={showShadows}>
        <boxGeometry args={[0.2, 6, 6]} />
        <meshStandardMaterial color={roomColor} />
      </mesh>
      
      {/* Window on left wall */}
      <mesh position={[-5.9, 3, 0]}>
        <boxGeometry args={[0.1, 2.5, 3]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Window frame */}
      <mesh position={[-5.95, 3, 0]}>
        <boxGeometry args={[0.05, 2.7, 3.2]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>
    </group>
  );
}