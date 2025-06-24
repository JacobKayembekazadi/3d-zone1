import { Vector3 } from 'three';

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'seating' | 'tables' | 'storage' | 'decor' | 'lighting';
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  color: string;
  material?: string;
  selected?: boolean;
}

export interface RoomPreset {
  id: string;
  name: string;
  description: string;
  furniture: FurnitureItem[];
  cameraPosition?: Vector3;
}

export interface CameraPreset {
  id: string;
  name: string;
  position: Vector3;
  target: Vector3;
}