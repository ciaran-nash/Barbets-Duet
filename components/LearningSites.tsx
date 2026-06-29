import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown, Flag, Globe, Leaf, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sites = [
  {
    id: 0,
    name: "Msichoke Seaweed Cooperative",
    location: "Mlingotini, Bagamoyo, Tanzania",
    description: "A village cooperative farming seaweed in a coastal lagoon, producing soap and protecting mangroves. The founding site of the Barbets Duet network, inaugurated at the Invention Convention in 2009.",
    ecology: "Coastal/Marine",
    restoration: "Mangrove protection",
    economicVenture: "Seaweed farming & soap production",
    leaderName: "Mama Gashindo",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/msichoke-seaweed-growers"
  },
  {
    id: 1,
    name: "Arboretum Kajokoby",
    location: "Kisumu, Kenya",
    description: "A restoration experiment and living archive of trial-and-error learning, growing native tree species and testing new governance models for shared land stewardship.",
    ecology: "Indigenous Forest",
    restoration: "Native tree planting",
    economicVenture: "Restoration archive & internships",
    leaderName: "Rading Nyamwaya",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/arboretum-kajokoby"
  },
  {
    id: 2,
    name: "Woodland Valley Farm",
    location: "Ladock, Cornwall, UK",
    description: "An organic, low-carbon livestock farm producing pasture-fed beef and rare breed pork across 63 hectares — sequestering 353 tons of carbon, educating school children, and pioneering beaver reintroduction.",
    ecology: "Temperate Grassland",
    restoration: "Carbon sequestration & rewilding",
    economicVenture: "Organic livestock & ecotourism",
    leaderName: "Chris & Janet Jones",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/woodland-valley-farm"
  },
  {
    id: 3,
    name: "Zumula Farm — Lukenya",
    location: "Lukenya, Kenya",
    description: "On a rocky dry-rangeland hillside 50km outside Nairobi, acacia woodland is being planted for fuel and improved pasture — alongside the Sikia Community Dam for water harvesting and community empowerment.",
    ecology: "Dry Rangeland",
    restoration: "Acacia woodland & water harvesting",
    economicVenture: "Goat farming & community dam",
    leaderName: "Sammy Muvelah",
    image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/zumula-farm"
  },
  {
    id: 4,
    name: "Mwasama School — Shamba Darasa",
    location: "Bagamoyo, Tanzania",
    description: "A garden classroom where primary school children grow food, plant indigenous trees, and learn ecology by practice. The school is nearly self-sufficient in food production.",
    ecology: "Tropical Dryland",
    restoration: "Native tree collection & food forest",
    economicVenture: "Education & produce",
    leaderName: "Mwajuma Masaiganah",
    image: "https://images.unsplash.com/photo-1509099880921-1e4c87d3dc43?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/mwasama-school"
  },
  {
    id: 5,
    name: "Hannacroix Creek",
    location: "New Baltimore, New York, USA",
    description: "A once-polluted industrial swamp forest bordering the Hudson River, now being restored to wild biodiversity. Beavers have returned, along with Monarch butterflies and snapping turtles.",
    ecology: "Freshwater Wetland",
    restoration: "Invasive species removal & rewilding",
    economicVenture: "High-value deer hunting & biodiversity monitoring",
    leaderName: "Barbara Heinzen",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    href: "/learning-sites/hannacroix-creek"
  }
];

const tags = [
  "East Africa", "UK", "USA", "agroforestry", "coastal/marine",
  "carbon sequestration", "invasive species control", "water harvesting"
];

export default function LearningSites() {
  return (
    <section id="learning-sites" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 tracking-tight [text-wrap:balance]">
              Explore Our Learning Sites
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed font-sans">
              Discover the heart of Barbets Duet&apos;s mission—places where ecological restoration meets innovation and community.
              Each learning site is a unique laboratory for testing new ideas, fostering partnerships, and nurturing sustainable
              livelihoods while healing the land.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:min-w-[400px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 bg-card border border-border/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-sans text-foreground placeholder:text-foreground/50"
              />
            </div>
            <div className="relative min-w-[140px]">
              <select aria-label="Sort learning sites" className="w-full appearance-none bg-card border border-border/20 rounded-md px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-sans text-foreground cursor-pointer">
                <option>Sort by</option>
                <option>Alphabetical</option>
                <option>Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-sm font-medium text-foreground rounded-sm transition-colors duration-300 font-sans"
            >
              {tag}
            </button>
          ))}
          <button className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 text-sm font-medium text-foreground rounded-sm transition-colors duration-300 flex items-center font-sans">
            all tags <ChevronDown className="ml-1 w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {sites.map((site) => (
            <div key={site.id} className="flex flex-col sm:flex-row bg-card rounded-xl border border-border/10 overflow-hidden relative shadow-sm hover:shadow-paper transition-shadow duration-500">

              {/* Image Section */}
              <div className="w-full sm:w-[240px] h-48 sm:h-auto shrink-0 relative bg-foreground/10">
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
                  <Flag className="w-6 h-6 text-foreground/50" />
                </div>

                <div className="pr-8 mb-4">
                  <h3 className="text-2xl font-serif font-light text-foreground mb-1">{site.name}</h3>
                  <p className="text-foreground/70 font-medium">{site.location}</p>
                </div>

                <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                  {site.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-4 text-sm text-foreground/80">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{site.ecology}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      <span>{site.restoration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <TrendingUp className="w-4 h-4" />
                    <span>{site.economicVenture}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 overflow-hidden">
                       <svg className="w-6 h-6 text-foreground/40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{site.leaderName}</p>
                      <p className="text-xs text-foreground/50">Site Leader</p>
                    </div>
                  </div>

                  <Link href={site.href || "#"} passHref>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 font-medium transition-colors duration-500">
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
