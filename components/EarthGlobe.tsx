'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Pause, Play, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const markersData = [
  { id: '1', lat: -1.2921, lng: 36.8219, title: "Nairobi, Kenya", subtitle: "Eco-tourism & Reforestation", url: "/sites/nairobi" },
  { id: '2', lat: -6.7924, lng: 39.2083, title: "Dar es Salaam, Tanzania", subtitle: "Sustainable Agriculture Markets", url: "/sites/dar-es-salaam" },
  { id: '3', lat: 0.3476, lng: 32.5825, title: "Kampala, Uganda", subtitle: "Wetland Protection Incentives", url: "/sites/kampala" },
  { id: '4', lat: 51.5074, lng: -0.1278, title: "London, UK", subtitle: "Global Convention 2024", url: "/sites/london" },
  { id: '5', lat: 40.7128, lng: -74.0060, title: "New York, USA", subtitle: "Climate Conference 2023", url: "/sites/new-york" },
];

export default function EarthGlobe() {
  const globeRef = useRef<any>(null);
  const [hoverD, setHoverD] = useState<any>(null);
  const [selectedD, setSelectedD] = useState<any>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const { width } = useWindowSize();

  const globeWidth = width || 1000;
  const globeHeight = width < 768 ? 500 : 700;

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = autoRotate;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, [autoRotate]);
  
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 0, lng: 20, altitude: 2 }, 2000);
    }
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center cursor-grab active:cursor-grabbing overflow-hidden outline-none">
      <Globe
        ref={globeRef}
        width={globeWidth}
        height={globeHeight}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={markersData}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.title}
        labelSize={1.5}
        labelDotRadius={(d: any) => d === hoverD ? 0.8 : 0.5}
        labelColor={(d: any) => d === hoverD ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)'}
        labelResolution={1}
        onLabelClick={(d: any) => setSelectedD(d)}
        onLabelHover={setHoverD}
      />
      
      {/* Auto Rotate Control */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setAutoRotate(!autoRotate);
        }}
        className="absolute bottom-6 right-6 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
        aria-label={autoRotate ? "Pause rotation" : "Play rotation"}
      >
        {autoRotate ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoverD && !selectedD && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-32 z-10 bg-night-forest/80 backdrop-blur-md px-6 py-4 rounded-xl border border-platinum/20 text-platinum shadow-xl pointer-events-none text-center min-w-[200px]"
          >
            <h4 className="font-serif text-xl mb-1">{hoverD.title}</h4>
            <p className="text-[10px] tracking-widest uppercase opacity-80">{hoverD.subtitle}</p>
            <p className="text-[10px] text-platinum/50 italic mt-2">Click to view details</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Modal */}
      <AnimatePresence>
        {selectedD && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full md:w-96 bg-night-forest/90 backdrop-blur-xl border-l border-platinum/10 z-30 p-8 flex flex-col justify-center shadow-2xl cursor-default"
          >
            <button 
              onClick={() => setSelectedD(null)}
              className="absolute top-6 right-6 text-platinum/50 hover:text-platinum transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            
            <div className="text-[10px] tracking-widest uppercase font-semibold text-platinum/60 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              {selectedD.subtitle}
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-platinum mb-8 leading-tight">
              {selectedD.title}
            </h3>
            
            <div className="mb-10 text-platinum/70 text-sm leading-relaxed">
              Explore the initiatives and activities specific to our {selectedD.title} learning site. Discover how the community is harmonizing conservation with economic growth.
            </div>

            <Link href={selectedD.url} onClick={() => setSelectedD(null)} className="group flex justify-between items-center bg-platinum text-night-forest px-6 py-4 rounded-full font-semibold uppercase tracking-widest text-[10px] hover:bg-neon-lime transition-colors w-full cursor-pointer">
              View Site Details
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
