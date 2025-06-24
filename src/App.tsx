import React, { useState } from 'react';
import { Scene } from './components/Scene';
import { Sidebar } from './components/Sidebar';
import { FloatingControls } from './components/FloatingControls';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className="flex-1 relative">
        <Scene />
        <FloatingControls />
        
        {/* Instructions */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white p-4 rounded-xl max-w-xs text-sm z-20 border border-white/10">
          <h3 className="font-semibold mb-2 text-blue-400">Controls</h3>
          <ul className="space-y-1 text-slate-300">
            <li>• <span className="text-white">Rotate:</span> Left-click + drag</li>
            <li>• <span className="text-white">Pan:</span> Right-click + drag</li>
            <li>• <span className="text-white">Zoom:</span> Scroll wheel</li>
            <li>• <span className="text-white">Select:</span> Click on furniture</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;