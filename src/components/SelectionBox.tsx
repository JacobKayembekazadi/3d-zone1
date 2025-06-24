import React from 'react';
import { useRoomStore } from '../store/roomStore';

export function SelectionBox() {
  const { selectFurniture } = useRoomStore();
  
  const handleClick = () => {
    selectFurniture(null);
  };
  
  return (
    <mesh 
      position={[0, -0.2, 0]} 
      onClick={handleClick}
      visible={false}
    >
      <boxGeometry args={[20, 0.1, 20]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}