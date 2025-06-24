import { create } from 'zustand';
import { Vector3 } from 'three';
import { FurnitureItem, RoomPreset, CameraPreset } from '../types/furniture';

interface RoomState {
  furniture: FurnitureItem[];
  selectedFurniture: string | null;
  currentPreset: string;
  cameraPreset: string;
  showGrid: boolean;
  showShadows: boolean;
  roomColor: string;
  floorColor: string;
  addFurniture: (item: Omit<FurnitureItem, 'id'>) => void;
  removeFurniture: (id: string) => void;
  updateFurniture: (id: string, updates: Partial<FurnitureItem>) => void;
  selectFurniture: (id: string | null) => void;
  loadPreset: (preset: RoomPreset) => void;
  setCameraPreset: (preset: string) => void;
  toggleGrid: () => void;
  toggleShadows: () => void;
  setRoomColor: (color: string) => void;
  setFloorColor: (color: string) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomState>((set, get) => ({
  furniture: [
    {
      id: '1',
      name: 'Modern Sofa',
      category: 'seating',
      position: new Vector3(2, 0.5, 0),
      rotation: new Vector3(0, -Math.PI / 2, 0),
      scale: new Vector3(1, 1, 1),
      color: '#696969',
    },
    {
      id: '2',
      name: 'Coffee Table',
      category: 'tables',
      position: new Vector3(0, 0.4, 1),
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
      color: '#8B4513',
    },
    {
      id: '3',
      name: 'TV Stand',
      category: 'storage',
      position: new Vector3(0, 0.5, -4.6),
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
      color: '#5E2C04',
    },
  ],
  selectedFurniture: null,
  currentPreset: 'modern-living',
  cameraPreset: 'isometric',
  showGrid: false,
  showShadows: true,
  roomColor: '#f0e5d1',
  floorColor: '#8B4513',
  
  addFurniture: (item) => {
    const newItem: FurnitureItem = {
      ...item,
      id: Date.now().toString(),
    };
    set((state) => ({
      furniture: [...state.furniture, newItem],
    }));
  },
  
  removeFurniture: (id) => {
    set((state) => ({
      furniture: state.furniture.filter((item) => item.id !== id),
      selectedFurniture: state.selectedFurniture === id ? null : state.selectedFurniture,
    }));
  },
  
  updateFurniture: (id, updates) => {
    set((state) => ({
      furniture: state.furniture.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },
  
  selectFurniture: (id) => {
    set({ selectedFurniture: id });
  },
  
  loadPreset: (preset) => {
    set({
      furniture: preset.furniture.map(item => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(),
      })),
      currentPreset: preset.id,
    });
  },
  
  setCameraPreset: (preset) => {
    set({ cameraPreset: preset });
  },
  
  toggleGrid: () => {
    set((state) => ({ showGrid: !state.showGrid }));
  },
  
  toggleShadows: () => {
    set((state) => ({ showShadows: !state.showShadows }));
  },
  
  setRoomColor: (color) => {
    set({ roomColor: color });
  },
  
  setFloorColor: (color) => {
    set({ floorColor: color });
  },
  
  clearRoom: () => {
    set({ furniture: [] });
  },
}));

export const roomPresets: RoomPreset[] = [
  {
    id: 'modern-living',
    name: 'Modern Living',
    description: 'Contemporary living room setup',
    furniture: [
      {
        id: '1',
        name: 'Modern Sofa',
        category: 'seating',
        position: new Vector3(2, 0.5, 0),
        rotation: new Vector3(0, -Math.PI / 2, 0),
        scale: new Vector3(1, 1, 1),
        color: '#696969',
      },
      {
        id: '2',
        name: 'Coffee Table',
        category: 'tables',
        position: new Vector3(0, 0.4, 1),
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(1, 1, 1),
        color: '#8B4513',
      },
    ],
  },
  {
    id: 'cozy-reading',
    name: 'Cozy Reading Nook',
    description: 'Perfect for book lovers',
    furniture: [
      {
        id: '1',
        name: 'Reading Chair',
        category: 'seating',
        position: new Vector3(-2, 0.5, 2),
        rotation: new Vector3(0, Math.PI / 4, 0),
        scale: new Vector3(0.8, 0.8, 0.8),
        color: '#8B4513',
      },
      {
        id: '2',
        name: 'Bookshelf',
        category: 'storage',
        position: new Vector3(-4.2, 2, -3.5),
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(1, 1, 1),
        color: '#5E2C04',
      },
    ],
  },
];

export const cameraPresets: CameraPreset[] = [
  {
    id: 'isometric',
    name: 'Isometric',
    position: new Vector3(8, 8, 8),
    target: new Vector3(0, 0, 0),
  },
  {
    id: 'front',
    name: 'Front View',
    position: new Vector3(0, 3, 10),
    target: new Vector3(0, 0, 0),
  },
  {
    id: 'side',
    name: 'Side View',
    position: new Vector3(10, 3, 0),
    target: new Vector3(0, 0, 0),
  },
  {
    id: 'top',
    name: 'Top View',
    position: new Vector3(0, 15, 0),
    target: new Vector3(0, 0, 0),
  },
];