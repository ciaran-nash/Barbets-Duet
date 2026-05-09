import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import SaveButton from '@/components/SaveButton';
import ShareButton from '@/components/ShareButton';
import PhotoGallery from '@/components/PhotoGallery';
import Image from 'next/image';

const siteData = {
  'nairobi': {
    title: "Nairobi, Kenya",
    subtitle: "Eco-tourism & Reforestation",
    description: "Our Nairobi site focuses on combining sustainable tourism with active reforestation efforts in the region. Local communities are directly involved in managing tree nurseries and guiding eco-tours.",
    image: "https://picsum.photos/seed/nairobi/1200/600",
    gallery: [
      "https://picsum.photos/seed/nairobi1/800/800",
      "https://picsum.photos/seed/nairobi2/800/800",
      "https://picsum.photos/seed/nairobi3/800/800"
    ]
  },
  'dar-es-salaam': {
    title: "Dar es Salaam, Tanzania",
    subtitle: "Sustainable Agriculture Markets",
    description: "In Dar es Salaam, we facilitate market access for smallholder farmers practicing sustainable and regenerative agriculture, ensuring fair prices and reduced environmental impact.",
    image: "https://picsum.photos/seed/daressalaam/1200/600",
    gallery: [
      "https://picsum.photos/seed/daressalaam1/800/800",
      "https://picsum.photos/seed/daressalaam2/800/800"
    ]
  },
  'kampala': {
    title: "Kampala, Uganda",
    subtitle: "Wetland Protection Incentives",
    description: "The Kampala initiative provides financial incentives and alternative livelihood training to communities living around wetlands, reducing encroachment and pollution.",
    image: "https://picsum.photos/seed/kampala/1200/600",
    gallery: [
      "https://picsum.photos/seed/kampala1/800/800",
      "https://picsum.photos/seed/kampala2/800/800",
      "https://picsum.photos/seed/kampala3/800/800",
      "https://picsum.photos/seed/kampala4/800/800"
    ]
  },
  'london': {
    title: "London, UK",
    subtitle: "Global Convention 2024",
    description: "London hosts our upcoming Global Convention, bringing together policymakers, scientists, and local leaders to scale up our successful ecosystem reward mechanisms globally.",
    image: "https://picsum.photos/seed/london/1200/600",
    gallery: [
      "https://picsum.photos/seed/london1/800/800",
      "https://picsum.photos/seed/london2/800/800"
    ]
  },
  'new-york': {
    title: "New York, USA",
    subtitle: "Climate Conference 2023",
    description: "Our presence in New York aims to build partnerships and secure funding from international climate organizations to expand our network of learning sites.",
    image: "https://picsum.photos/seed/newyork/1200/600",
    gallery: [
      "https://picsum.photos/seed/newyork1/800/800"
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const siteInfo = siteData[resolvedParams.id as keyof typeof siteData];

  if (!siteInfo) {
    return { title: 'Site Not Found | Barbets Duet' };
  }

  return {
    title: `${siteInfo.title} | Barbets Duet Global Learning Sites`,
    description: siteInfo.description,
    openGraph: {
      title: siteInfo.title,
      description: siteInfo.description,
      images: [siteInfo.image],
    },
  };
}

export default async function SitePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const siteInfo = siteData[resolvedParams.id as keyof typeof siteData];

  if (!siteInfo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#2C3E35]">
      <div className="bg-[#1A1A1A]">
        <Header />
      </div>
      
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <Image 
          src={siteInfo.image} 
          alt={siteInfo.title} 
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <p className="text-white/80 uppercase tracking-widest text-xs font-semibold mb-4">
              {siteInfo.subtitle}
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-light max-w-3xl">
              {siteInfo.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif mb-8">About this Location</h2>
            <p className="text-lg leading-relaxed text-[#2C3E35]/80 mb-8">
              {siteInfo.description}
            </p>
            <p className="text-lg leading-relaxed text-[#2C3E35]/80">
              The Barbets Duet learning site network is designed to test and refine our market-driven conservation mechanisms. Each location provides unique insights into how we can align economic incentives with biodiversity conservation for the benefit of local communities.
            </p>

            <PhotoGallery siteId={resolvedParams.id} initialImages={siteInfo.gallery} />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#2C3E35]/10 sticky top-32">
              <h3 className="font-serif text-xl mb-6">Want to remember this?</h3>
              <p className="text-sm text-[#2C3E35]/70 mb-8">
                Save this location to your dashboard to keep track of case studies and events you are interested in.
              </p>
              
              <div className="flex gap-4">
                <SaveButton 
                  eventId={`site-${resolvedParams.id}`} 
                  title={siteInfo.title} 
                  date={siteInfo.subtitle}
                  className="!bg-[#2C3E35] !text-white !border-transparent hover:!bg-[#2C3E35]/90 !w-12 !h-12 flex justify-center items-center flex-shrink-0" 
                />
                <ShareButton title={siteInfo.title} text={siteInfo.description} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <StickyFooter />
    </main>
  );
}
