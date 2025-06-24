import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { useRoomStore } from '../store/roomStore';
import { FurnitureItem } from '../types/furniture';

function FurniturePiece({ item, isSelected }: { item: FurnitureItem; isSelected: boolean }) {
  const meshRef = useRef<Group>(null);
  const { updateFurniture, selectFurniture, showShadows } = useRoomStore();
  
  useFrame(() => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    selectFurniture(item.id);
  };
  
  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };
  
  const renderFurniture = () => {
    switch (item.category) {
      case 'seating':
        return renderSofa();
      case 'tables':
        return renderTable();
      case 'storage':
        return renderStorage();
      case 'decor':
        return renderDecor();
      default:
        return renderGeneric();
    }
  };
  
  const renderSofa = () => (
    <group>
      {/* Base */}
      <mesh castShadow={showShadows}>
        <boxGeometry args={[3, 1, 1.5]} />
        <meshStandardMaterial color={item.color} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 1, -0.6]} castShadow={showShadows}>
        <boxGeometry args={[3, 1, 0.3]} />
        <meshStandardMaterial color={item.color} />
      </mesh>
      {/* Arms */}
      <mesh position={[-1.65, 0.5, 0]} castShadow={showShadows}>
        <boxGeometry args={[0.3, 0.5, 1.5]} />
        <meshStandardMaterial color={item.color} />
      </mesh>
      <mesh position={[1.65, 0.5, 0]} castShadow={showShadows}>
        <boxGeometry args={[0.3, 0.5, 1.5]} />
        <meshStandardMaterial color={item.color} />
      </mesh>
    </group>
  );
  
  const renderTable = () => (
    <group>
      {/* Top */}
      <mesh position={[0, 0.4, 0]} castShadow={showShadows}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial 
          color={item.color}
          transparent
          opacity={item.name.includes('Glass') ? 0.4 : 1}
          roughness={item.name.includes('Glass') ? 0.1 : 0.8}
          metalness={item.name.includes('Glass') ? 0.1 : 0.2}
        />
      </mesh>
      {/* Legs */}
      {[0, Math.PI/2, Math.PI, 3*Math.PI/2].map((angle, i) => (
        <mesh 
          key={i}
          position={[Math.cos(angle) * 0.8, 0.2, Math.sin(angle) * 0.8]} 
          castShadow={showShadows}
        >
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#43464B" />
        </mesh>
      ))}
    </group>
  );
  
  const renderStorage = () => (
    <group>
      {/* Main body */}
      <mesh castShadow={showShadows}>
        <boxGeometry args={[4, 1, 0.8]} />
        <meshStandardMaterial color={item.color} />
      </mesh>
      {/* TV if it's a TV stand */}
      {item.name.includes('TV') && (
        <mesh position={[0, 1.25, 0.05]} castShadow={showShadows}>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      )}
    </group>
  );
  
  const renderDecor = () => (
    <group>
      {/* Pot */}
      <mesh position={[0, 0.2, 0]} castShadow={showShadows}>
        <cylinderGeometry args={[0.3, 0.25, 0.4, 16]} />
        <meshStandardMaterial color="#A52A2A" />
      </mesh>
      {/* Plant */}
      <mesh position={[0, 0.5, 0]} castShadow={showShadows}>
        <sphereGeometry args={[0.4, 16, 8]} />
        <meshStandardMaterial color={item.color} />
      </mesh>
    </group>
  );
  
  const renderGeneric = () => (
    <mesh castShadow={showShadows}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={item.color} />
    </mesh>
  );
  
  return (
    <group
      ref={meshRef}
      position={[item.position.x, item.position.y, item.position.z]}
      rotation={[item.rotation.x, item.rotation.y, item.rotation.z]}
      scale={[item.scale.x, item.scale.y, item.scale.z]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {renderFurniture()}
      {isSelected && (
        <mesh position={[0, -0.01, 0]}>
          <ringGeometry args={[1.5, 2, 32]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

export function FurnitureRenderer() {
  const { furniture, selectedFurniture } = useRoomStore();
  
  return (
    <group>
      {furniture.map((item) => (
        <FurniturePiece
          key={item.id}
          item={item}
          isSelected={selectedFurniture === item.id}
        />
      ))}
    </group>
  );
}