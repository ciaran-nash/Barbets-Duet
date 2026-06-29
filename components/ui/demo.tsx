"use client";

import { Lightbulb, MapPin, Users, Globe, Leaf, BookOpen, Sprout, Star, TreePine } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Concept Note",
    date: "2006",
    content: "Barbara Heinzen and Oby Obyerodhyambo meet in London to deliver a joint lecture at the Royal Society of Arts. The first Barbets Duet Concept Note is written — a business idea to reward the abundance of life.",
    category: "Foundation",
    icon: Lightbulb,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Invention Convention",
    date: "2009",
    content: "The Barbets Duet is formally inaugurated at Mlingotini, Tanzania. Founding partners from Kenya, Tanzania, Uganda, and the UK commit land and marine sites as the first learning sites.",
    category: "Convention",
    icon: Star,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 3,
    title: "Nkoroi Partners Meeting",
    date: "2010",
    content: "Founding partners gather at Oby and Hilda Obyerodhyambo's home in Nkoroi, Kenya. First indicators and goals are defined for each site — Oby calls it 'a turning point'.",
    category: "Convention",
    icon: Users,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 4,
    title: "Safari Convention",
    date: "2011",
    content: "Partners travel from the Tanzanian coast to the Serengeti, visiting Seme (Kenya) and Molo (Uganda). Cross-site learning and the identification of shared ecological principles.",
    category: "Convention",
    icon: MapPin,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 5,
    title: "Himo Convention",
    date: "2012",
    content: "Rose Lyimo hosts partners on the slopes of Mt Kilimanjaro. The Shamba Darasa at Mwasama School is presented. Mosaic Rights framework formalised at UCL Human Ecology lecture.",
    category: "Convention",
    icon: Globe,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 6,
    title: "Lukenya Convention",
    date: "2014",
    content: "Hosted by Sammy Muvelah near Nairobi — the first convention to include the next generation. The collective formally adopts the name 'Jumuiya' (constellation of learning sites).",
    category: "Convention",
    icon: Sprout,
    relatedIds: [5, 7],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 7,
    title: "Coming of Age Convention",
    date: "2016",
    content: "Hosted by Magode Ikuya in Molo, Uganda. The next generation takes their place alongside founding partners. Partners agree to produce the Barbets Book of Trial and Error.",
    category: "Convention",
    icon: BookOpen,
    relatedIds: [6, 8],
    status: "completed" as const,
    energy: 75,
  },
  {
    id: 8,
    title: "Tin Anniversary Convention",
    date: "2018",
    content: "10-year celebration hosted at Woodland Valley Farm, Cornwall, UK. The collective reviews a decade of experiments, welcomes new junior members, and plans the next generation of learning sites.",
    category: "Convention",
    icon: Leaf,
    relatedIds: [7, 9],
    status: "completed" as const,
    energy: 70,
  },
  {
    id: 9,
    title: "Arboretum Kajokoby",
    date: "2023",
    content: "The newest learning site is designated in Kisumu, Kenya — a restoration experiment and living archive of trial-and-error learning, anchoring the network's next generational chapter.",
    category: "Milestone",
    icon: TreePine,
    relatedIds: [8],
    status: "in-progress" as const,
    energy: 60,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </>
  );
}

export default RadialOrbitalTimelineDemo;
