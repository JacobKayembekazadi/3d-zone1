import React from 'react';
import { 
  RotateCcw, 
  Move, 
  ZoomIn, 
  ZoomOut, 
  Home,
  Maximize
} from 'lucide-react';

export function FloatingControls() {
  const handleReset = () => {
    // Camera reset functionality would be implemented here
    window.location.reload();
  };

  const controls = [
    { icon: Home, label: 'Reset View', action: handleReset },
    { icon: Move, label: 'Pan Mode', action: () => {} },
    { icon: RotateCcw, label: 'Rotate Mode', action: () => {} },
    { icon: Maximize, label: 'Fullscreen', action: () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }}
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
      {controls.map(({ icon: Icon, label, action }, index) => (
        <button
          key={index}
          onClick={action}
          title={label}
          className="w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center justify-center group"
        >
          <Icon size={20} />
          <span className="absolute right-full mr-3 px-2 py-1 bg-black/75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}