import React, { useState } from 'react';
import { 
  Sofa, 
  Table, 
  Archive, 
  Flower, 
  Lightbulb,
  Palette,
  Eye,
  Grid3X3,
  Camera,
  Trash2,
  Download,
  Upload,
  X,
  Menu,
  RotateCcw
} from 'lucide-react';
import { useRoomStore, roomPresets, cameraPresets } from '../store/roomStore';
import { Vector3 } from 'three';

const furnitureCategories = [
  {
    id: 'seating',
    name: 'Seating',
    icon: Sofa,
    items: [
      { name: 'Modern Sofa', color: '#696969' },
      { name: 'Leather Chair', color: '#8B4513' },
      { name: 'Bean Bag', color: '#FF6B6B' },
      { name: 'Recliner', color: '#4ECDC4' },
    ]
  },
  {
    id: 'tables',
    name: 'Tables',
    icon: Table,
    items: [
      { name: 'Coffee Table', color: '#8B4513' },
      { name: 'Glass Table', color: '#87CEEB' },
      { name: 'Side Table', color: '#5E2C04' },
      { name: 'Dining Table', color: '#A0522D' },
    ]
  },
  {
    id: 'storage',
    name: 'Storage',
    icon: Archive,
    items: [
      { name: 'TV Stand', color: '#5E2C04' },
      { name: 'Bookshelf', color: '#8B4513' },
      { name: 'Cabinet', color: '#2F4F4F' },
      { name: 'Chest', color: '#696969' },
    ]
  },
  {
    id: 'decor',
    name: 'Decor',
    icon: Flower,
    items: [
      { name: 'Plant', color: '#228B22' },
      { name: 'Vase', color: '#4169E1' },
      { name: 'Sculpture', color: '#2F4F4F' },
      { name: 'Picture', color: '#8B4513' },
    ]
  }
];

const colorPalette = [
  '#696969', '#8B4513', '#2F4F4F', '#4169E1', '#228B22',
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#A0522D', '#5E2C04', '#8B5CF6'
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState('seating');
  const [activeTab, setActiveTab] = useState<'furniture' | 'room' | 'settings'>('furniture');
  
  const {
    addFurniture,
    removeFurniture,
    updateFurniture,
    selectedFurniture,
    furniture,
    loadPreset,
    setCameraPreset,
    cameraPreset,
    toggleGrid,
    toggleShadows,
    showGrid,
    showShadows,
    roomColor,
    floorColor,
    setRoomColor,
    setFloorColor,
    clearRoom
  } = useRoomStore();

  const selectedItem = furniture.find(item => item.id === selectedFurniture);

  const handleAddFurniture = (item: any, category: any) => {
    const randomPosition = new Vector3(
      (Math.random() - 0.5) * 8,
      category === 'tables' ? 0.4 : category === 'seating' ? 0.5 : 0.5,
      (Math.random() - 0.5) * 8
    );

    addFurniture({
      name: item.name,
      category: category,
      position: randomPosition,
      rotation: new Vector3(0, Math.random() * Math.PI * 2, 0),
      scale: new Vector3(1, 1, 1),
      color: item.color,
    });
  };

  const handleColorChange = (color: string) => {
    if (selectedFurniture) {
      updateFurniture(selectedFurniture, { color });
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/10 backdrop-blur-md text-white p-3 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full bg-slate-900/95 backdrop-blur-xl text-white z-40
        transition-transform duration-300 ease-in-out border-r border-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-80 lg:w-80
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              3D Room Designer
            </h1>
            <p className="text-slate-400 text-sm mt-1">Create your perfect space</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {[
              { id: 'furniture', label: 'Furniture', icon: Sofa },
              { id: 'room', label: 'Room', icon: Palette },
              { id: 'settings', label: 'Settings', icon: Eye }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'furniture' && (
              <div className="p-4">
                {/* Categories */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {furnitureCategories.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                          activeCategory === category.id
                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-400/30'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <IconComponent size={18} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Furniture Items */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    {furnitureCategories.find(cat => cat.id === activeCategory)?.name}
                  </h3>
                  {furnitureCategories
                    .find(cat => cat.id === activeCategory)
                    ?.items.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddFurniture(item, activeCategory)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                      >
                        <div 
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-slate-300 group-hover:text-white">
                          {item.name}
                        </span>
                      </button>
                    ))}
                </div>

                {/* Selected Item Controls */}
                {selectedItem && (
                  <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white">{selectedItem.name}</h3>
                      <button
                        onClick={() => removeFurniture(selectedItem.id)}
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">
                          Color
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {colorPalette.map((color, index) => (
                            <button
                              key={index}
                              onClick={() => handleColorChange(color)}
                              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                                selectedItem.color === color
                                  ? 'border-white scale-110'
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'room' && (
              <div className="p-4 space-y-6">
                {/* Room Presets */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Room Presets
                  </h3>
                  <div className="space-y-2">
                    {roomPresets.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => loadPreset(preset)}
                        className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="font-medium text-white">{preset.name}</div>
                        <div className="text-xs text-slate-400">{preset.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Room Colors */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Room Colors
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 mb-2 block">Wall Color</label>
                      <div className="grid grid-cols-5 gap-2">
                        {['#f0e5d1', '#e8e8e8', '#d3d3d3', '#c0c0c0', '#b8860b'].map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setRoomColor(color)}
                            className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                              roomColor === color
                                ? 'border-white scale-110'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs text-slate-400 mb-2 block">Floor Color</label>
                      <div className="grid grid-cols-5 gap-2">
                        {['#8B4513', '#A0522D', '#DEB887', '#CD853F', '#D2691E'].map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setFloorColor(color)}
                            className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                              floorColor === color
                                ? 'border-white scale-110'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Actions
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={clearRoom}
                      className="w-full flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
                    >
                      <Trash2 size={16} />
                      Clear Room
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-4 space-y-6">
                {/* Camera Presets */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Camera Views
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {cameraPresets.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => setCameraPreset(preset.id)}
                        className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                          cameraPreset === preset.id
                            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-400/30'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Camera size={16} />
                        <span className="text-sm">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Options */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Display Options
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={toggleGrid}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        showGrid
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Grid3X3 size={16} />
                      <span className="text-sm">Show Grid</span>
                    </button>
                    
                    <button
                      onClick={toggleShadows}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        showShadows
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Lightbulb size={16} />
                      <span className="text-sm">Show Shadows</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}