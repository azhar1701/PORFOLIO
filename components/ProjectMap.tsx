
import React, { useEffect, useRef } from 'react';
import type { Project } from '../types';
import AnimatedSection from './AnimatedSection';

declare const L: any; // Use Leaflet from CDN

interface ProjectMapProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectMap: React.FC<ProjectMapProps> = ({ projects, onSelectProject }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      mapRef.current = L.map(mapContainer.current, {
        center: [39.8283, -98.5795], // Center of US
        zoom: 4,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);
    }
    
    // Clear existing markers before adding new ones
    if (mapRef.current) {
        mapRef.current.eachLayer((layer: any) => {
            if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });
    }

    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="w-4 h-4 bg-[#00B4D8] rounded-full border-2 border-white shadow-lg"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    if (mapRef.current && projects) {
        projects.forEach(project => {
            const marker = L.marker(project.coordinates, { icon: customIcon }).addTo(mapRef.current);
            const popupContent = document.createElement('div');
            popupContent.innerHTML = `
            <h3 class="font-bold text-base text-white">${project.title}</h3>
            <p class="text-sm text-slate-400 mb-2">${project.category}</p>
            `;
            const viewButton = document.createElement('button');
            viewButton.innerHTML = 'View Details';
            viewButton.className = 'w-full text-center bg-[#00B4D8] text-white font-bold py-1 px-3 rounded-md text-sm hover:bg-opacity-80 transition-all';
            viewButton.onclick = () => onSelectProject(project);
            popupContent.appendChild(viewButton);
            marker.bindPopup(popupContent);
        });
    }
  }, [projects, onSelectProject]);

  return (
    <AnimatedSection>
      <section id="map" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Global Project Footprint</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Projects delivered across diverse geographic and regulatory environments. Click a marker to learn more.
            </p>
          </div>
          <div 
            ref={mapContainer} 
            className="h-96 sm:h-[500px] rounded-lg border-2 border-slate-700 bg-slate-800/50 overflow-hidden"
          />
        </div>
      </section>
    </AnimatedSection>
  );
};

export default ProjectMap;
