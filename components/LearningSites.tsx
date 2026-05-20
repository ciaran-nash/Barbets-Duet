import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown, Flag, Globe, Leaf, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sites = [
  {
    id: 0,
    name: "Msichoke Seaweed Growers",
    location: "Bagamoyo, Tanzania",
    description: "Restoring the delicate balance between coastal livelihoods and mangrove ecosystems through sustainable mariculture.",
    ecology: "Coastal/Marine",
    restoration: "Mangrove planting",
    economicVenture: "Seaweed mariculture",
    leaderName: "Mwajuma Masaiganah",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/msichoke-seaweed-growers"
  },
  {
    id: 1,
    name: "Arboretum KaJok'Oby",
    location: "Kisumu, Kenya",
    description: "A sanctuary for environmental resilience and serenity, offering forest bathing, indigenous tree planting, and eco-therapy.",
    ecology: "Indigenous Forest",
    restoration: "Native tree planting",
    economicVenture: "Eco-tourism & wellness",
    leaderName: "Hilda & Oby",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/arboretum-kajokoby"
  },
  {
    id: 2,
    name: "Coastal Mangrove Revival",
    location: "Mombasa, Kenya",
    description: "Restoring critical mangrove ecosystems to protect coastlines, support marine biodiversity, and build resilience against climate change.",
    ecology: "Coastal/Marine",
    restoration: "Mangrove planting",
    economicVenture: "Eco-tourism & fisheries",
    leaderName: "David Ochieng",
    image: "https://picsum.photos/seed/mangrove/800/800",
    href: "/learning-sites/coastal-mangrove-revival"
  },
  {
    id: 3,
    name: "Scottish Highlands Rewilding",
    location: "Inverness, UK",
    description: "Reintroducing native species and expanding woodland covers to revive the natural landscape of the historic highlands.",
    ecology: "Temperate Forest",
    restoration: "Rewilding & species reintroduction",
    economicVenture: "Nature-based tourism",
    leaderName: "Fiona MacLeod",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/scottish-highlands-rewilding"
  },
  {
    id: 4,
    name: "Appalachian Forest Recovery",
    location: "West Virginia, US",
    description: "Healing former mining lands through intensive reforestation and invasive species control to restore native Appalachian biodiversity.",
    ecology: "Deciduous Forest",
    restoration: "Invasive species control",
    economicVenture: "Sustainable timber",
    leaderName: "Sarah Jenkins",
    image: "https://picsum.photos/seed/forest/800/800",
    href: "/learning-sites/appalachian-forest-recovery"
  }
];

const tags = [
  "East Africa", "UK", "US", "agroforestry", "coastal/marine", 
  "urban biodiversity", "carbon sequestration", "invasive species control"
];

export default function LearningSites() {
  return (
    <section id="learning-sites" className="py-24 bg-platinum">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-night-forest mb-6 tracking-tight">
              Explore Our Learning Sites
            </h2>
            <p className="text-lg text-night-forest/70 leading-relaxed font-sans">
              Discover the heart of Barbets Duet&apos;s mission—places where ecological restoration meets innovation and community.
              Each learning site is a unique laboratory for testing new ideas, fostering partnerships, and nurturing sustainable
              livelihoods while healing the land.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:min-w-[400px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-night-forest/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 bg-white border border-night-forest/20 rounded-md focus:outline-none focus:ring-2 focus:ring-viridian focus:border-transparent font-sans"
              />
            </div>
            <div className="relative min-w-[140px]">
              <select className="w-full appearance-none bg-white border border-night-forest/20 rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-viridian focus:border-transparent font-sans cursor-pointer">
                <option>Sort by</option>
                <option>Alphabetical</option>
                <option>Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-night-forest/50 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {tags.map((tag) => (
            <button 
              key={tag}
              className="px-4 py-2 bg-night-forest/5 hover:bg-night-forest/10 text-sm font-medium text-night-forest rounded-sm transition-colors font-sans"
            >
              {tag}
            </button>
          ))}
          <button className="px-4 py-2 bg-night-forest/5 hover:bg-night-forest/10 text-sm font-medium text-night-forest rounded-sm transition-colors flex items-center font-sans">
            all tags <ChevronDown className="ml-1 w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {sites.map((site) => (
            <div key={site.id} className="flex flex-col sm:flex-row bg-white rounded-xl border border-night-forest/10 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
              
              {/* Image Section */}
              <div className="w-full sm:w-[240px] h-48 sm:h-auto shrink-0 relative bg-night-forest/10">
                <Image 
                  src={site.image} 
                  alt={site.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 30vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 flex flex-col justify-between font-sans">
                <div className="absolute top-6 right-6">
                  <Flag className="w-6 h-6 text-night-forest/50" />
                </div>
                
                <div className="pr-8 mb-4">
                  <h3 className="text-2xl font-serif font-bold text-night-forest mb-1">{site.name}</h3>
                  <p className="text-night-forest/60 font-medium">{site.location}</p>
                </div>

                <p className="text-sm text-night-forest/70 mb-6 leading-relaxed">
                  {site.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-4 text-sm text-night-forest/80">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{site.ecology}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      <span>{site.restoration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-night-forest/80">
                    <TrendingUp className="w-4 h-4" />
                    <span>{site.economicVenture}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-night-forest/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-night-forest/10 flex items-center justify-center shrink-0 overflow-hidden">
                       <svg className="w-6 h-6 text-night-forest/40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-night-forest">{site.leaderName}</p>
                      <p className="text-xs text-night-forest/50">Site Leader</p>
                    </div>
                  </div>
                  
                  <Link href={site.href || "#"} passHref>
                    <Button className="bg-night-forest hover:bg-night-forest/90 text-platinum rounded-md px-6 font-medium">
                      Explore Site
                    </Button>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
