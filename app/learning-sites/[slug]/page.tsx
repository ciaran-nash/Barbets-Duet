import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, Calendar, Users, Sprout, ArrowRight, FileText, 
  Target, GraduationCap, Link as LinkIcon, AlertTriangle 
} from 'lucide-react';

const DUMMY_DATA = {
  slug: "arboretum-kajokoby",
  siteName: "Arboretum KaJok'Oby",
  locationName: "Kisumu, Kenya (Seme, Kajulu)",
  heroImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
  tagline: "Kenya's 2nd Arboretum: A sanctuary for environmental resilience and serenity.",
  overview: "Arboretum KaJok'Oby is an environmental conservation and wellness space located in Kenya. Promoted as \"Kenya's 2nd Arboretum,\" it is dedicated to environmental resilience, preserving native plant life, and providing a peaceful retreat for the public. It fosters conversations around climate change and environmental impact, while functioning as a sanctuary for \"conversation and serenity.\"",
  
  keyStats: [
    { label: "Founded by", value: "Hilda & Oby Obyerodhyambo", iconAsset: "users" },
    { label: "Core Focus", value: "Indigenous Tree Nursery", iconAsset: "sprout" },
    { label: "Location Focus", value: "Seme, Kajulu", iconAsset: "map-pin" }
  ],

  progressReports: [
    {
      date: "2024-04-12",
      title: "Kisumu Tourism Week Collaboration",
      body: "We actively collaborated with local groups during Kisumu Tourism Week to share knowledge about indigenous plants and climate resilience.",
      mediaAsset: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
    },
    {
      date: "2024-02-05",
      title: "Miti Alliance Partnership",
      body: "Established a strategic partnership with the Miti Alliance to amplify our conservation efforts and share ecotherapy best practices.",
      mediaAsset: null
    }
  ],

  challenges: "Maintaining a pristine environment while increasing public footfall for ecotherapy presents an ongoing challenge. We are also continuously adapting our native plant cultivation methods to combat the changing climate patterns in the Seme region.",

  futureGoals: [
    "Expand the Indigenous Tree Nursery to support 50+ endangered species.",
    "Introduce specialized week-long forest bathing retreats.",
    "Enhance the bird watching habitats to attract migratory species."
  ],

  educationalPrograms: [
    {
      title: "Forest Bathing & Tree Therapy",
      description: "Guided sessions on the grounds cultivated to provide a tranquil environment where visitors can immerse themselves in nature to reduce stress and improve mental well-being.",
      audience: "General Public & Wellness Practitioners"
    },
    {
      title: "Bird Watching Tours",
      description: "Because of its rich plant life, the arboretum serves as a natural habitat for local bird species. We offer guided tours for enthusiasts.",
      audience: "Bird Enthusiasts & Photographers"
    }
  ],

  ctaText: "Support our mission to preserve Kenya's native flora.",
  ctaButtonLabel: "Contact Us",
  ctaButtonUrl: "mailto:kajokoby@gmail.com",

  siteLinks: [
    { linkLabel: "Follow on X", url: "https://twitter.com/kajokoby" },
    { linkLabel: "Email Us", url: "mailto:kajokoby@gmail.com" }
  ],

  gallery: [
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80"
  ],

  relatedSites: [
    {
      id: "kenya-highland-restoration",
      siteName: "Kenya Highland Restoration",
      locationName: "Nairobi County, Kenya",
      heroImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80"
    },
    {
      id: "coastal-mangrove-revival",
      siteName: "Coastal Mangrove Revival",
      locationName: "Mombasa, Kenya",
      heroImage: "https://picsum.photos/seed/mangrove/800/800"
    }
  ]
};

export default function LearningSitePage() {
  const data = DUMMY_DATA; // In a real app, fetch based on params.slug

  return (
    <main className="min-h-screen bg-[#F4F4F0] text-[#111111]">
      {/* 1. Hero Header */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-[#0B0F19]">
        <Image 
          src={data.heroImage} 
          alt={data.siteName}
          fill
          className="object-cover opacity-60"
          unoptimized={true}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-6xl mx-auto w-full">
          <div className="flex items-center text-[#C7F16C] mb-4">
            <MapPin size={20} className="mr-2" />
            <span className="font-mono text-sm tracking-widest uppercase">{data.locationName}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-tight">{data.siteName}</h1>
          {data.tagline && (
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl font-light">{data.tagline}</p>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-20">
          
          {/* 2. Short Overview */}
          <section>
            <div className="font-mono text-xs tracking-widest uppercase text-black/50 mb-6">Overview</div>
            <p className="text-2xl md:text-3xl font-serif leading-relaxed text-black/80">
              {data.overview}
            </p>
          </section>

          {/* 4. Progress Reports */}
          {data.progressReports && data.progressReports.length > 0 && (
            <section>
              <div className="flex items-center mb-8 pb-4 border-b border-black/10">
                <FileText className="mr-3 text-black/40" />
                <h2 className="text-2xl font-serif">Progress Reports</h2>
              </div>
              <div className="space-y-12">
                {data.progressReports.map((report, idx) => (
                  <div key={idx} className="bg-white p-8 border border-black/5">
                    <div className="text-sm font-mono text-black/50 mb-4">{report.date}</div>
                    <h3 className="text-xl font-bold mb-4">{report.title}</h3>
                    <p className="text-black/70 mb-6 leading-relaxed">{report.body}</p>
                    {report.mediaAsset && (
                      <div className="relative h-64 w-full bg-gray-100">
                        <Image src={report.mediaAsset} alt={report.title} fill className="object-cover" unoptimized={true} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. Challenges */}
          {data.challenges && (
            <section>
              <div className="flex items-center mb-8 pb-4 border-b border-black/10">
                <AlertTriangle className="mr-3 text-black/40" />
                <h2 className="text-2xl font-serif">Key Challenges</h2>
              </div>
              <p className="text-lg leading-relaxed text-black/80">{data.challenges}</p>
            </section>
          )}

          {/* 7. Educational Programs */}
          {data.educationalPrograms && data.educationalPrograms.length > 0 && (
            <section>
              <div className="flex items-center mb-8 pb-4 border-b border-black/10">
                <GraduationCap className="mr-3 text-black/40" />
                <h2 className="text-2xl font-serif">Programs & Activities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.educationalPrograms.map((prog, idx) => (
                  <div key={idx} className="bg-[#EBEBE6] p-6 border border-black/5">
                    <h3 className="font-bold text-lg mb-2">{prog.title}</h3>
                    <p className="text-sm text-black/70 mb-4">{prog.description}</p>
                    <div className="text-xs font-mono bg-black/5 inline-block px-3 py-1 text-black/60">
                      Audience: {prog.audience}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 10. Visual Elements (Gallery) */}
          {data.gallery && data.gallery.length > 0 && (
            <section>
              <div className="font-mono text-xs tracking-widest uppercase text-black/50 mb-6">Gallery</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.gallery.map((img, idx) => (
                  <div key={idx} className={`relative h-64 ${idx === 0 ? 'md:col-span-2 h-96' : ''}`}>
                    <Image src={img} alt="Gallery image" fill className="object-cover" unoptimized={true} />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* 3. Key Information */}
          <section className="bg-white p-8 border border-black/5 shadow-sm">
            <h3 className="font-mono text-xs tracking-widest uppercase text-black/50 mb-6">Key Information</h3>
            <div className="space-y-6">
              {data.keyStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-sm text-black/60 mb-1">{stat.label}</span>
                  <span className="font-serif text-lg font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Future Goals */}
          {data.futureGoals && data.futureGoals.length > 0 && (
            <section className="bg-[#0B0F19] text-white p-8">
              <div className="flex items-center mb-6">
                <Target className="mr-3 text-[#C7F16C]" size={20} />
                <h3 className="font-mono text-xs tracking-widest uppercase text-white/50">Future Goals</h3>
              </div>
              <ul className="space-y-4">
                {data.futureGoals.map((goal, idx) => (
                  <li key={idx} className="text-sm text-white/80 flex items-start">
                    <span className="text-[#C7F16C] mr-2 mt-0.5">→</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 8. Get Involved */}
          {(data.ctaText || data.ctaButtonLabel) && (
            <section className="border border-[#C7F16C] bg-[#C7F16C]/10 p-8 text-center text-[#111111]">
              <h3 className="font-serif text-2xl mb-4">Get Involved</h3>
              {data.ctaText && <p className="mb-6 text-black/70">{data.ctaText}</p>}
              {data.ctaButtonLabel && data.ctaButtonUrl && (
                <Link href={data.ctaButtonUrl} className="inline-block bg-[#0B0F19] text-white px-6 py-3 font-mono text-sm tracking-widest uppercase hover:bg-black transition-colors">
                  {data.ctaButtonLabel}
                </Link>
              )}
            </section>
          )}

          {/* 9. Site-Specific Links */}
          {data.siteLinks && data.siteLinks.length > 0 && (
            <section>
              <h3 className="font-mono text-xs tracking-widest uppercase text-black/50 mb-4">Resources & Links</h3>
              <div className="flex flex-col space-y-3">
                {data.siteLinks.map((link, idx) => (
                  <Link key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium hover:text-black/60 transition-colors">
                    <LinkIcon size={14} className="mr-2" />
                    {link.linkLabel}
                  </Link>
                ))}
              </div>
            </section>
          )}
          
        </div>
      </div>

      {/* 11. Links to Other Learning Sites */}
      {data.relatedSites && data.relatedSites.length > 0 && (
        <section className="bg-white py-20 border-t border-black/5">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-serif mb-12 text-center">Explore Other Sites</h2>
            {/* CSS-only snap carousel */}
            <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {data.relatedSites.map((site, idx) => (
                <Link key={idx} href={`/learning-sites/${site.id}`} className="group block relative w-[85vw] md:w-[500px] h-80 flex-shrink-0 snap-start overflow-hidden bg-black">
                  <Image 
                    src={site.heroImage} 
                    alt={site.siteName} 
                    fill 
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="font-mono text-xs tracking-widest uppercase text-[#C7F16C] mb-2">{site.locationName}</div>
                    <div className="text-2xl md:text-3xl font-serif text-white flex items-center justify-between">
                      {site.siteName}
                      <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transform group-hover:translate-x-2 transition-all bg-white/10 group-hover:bg-white group-hover:text-black">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
