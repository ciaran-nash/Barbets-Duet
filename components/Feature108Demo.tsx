import { FlaskConical, Leaf, Users, TrendingUp } from "lucide-react";

import { Feature108 } from "@/components/blocks/shadcnblocks-com-feature108"

const demoData = {
  badge: "Find your way in",
  heading: "Who are you in this experiment?",
  description: "Barbets Duet is a collective for anyone who believes ecological restoration and economic opportunity belong together.",
  tabs: [
    {
      value: "tab-1",
      icon: <FlaskConical className="h-auto w-4 shrink-0" />,
      label: "Restoration Professionals",
      content: {
        badge: "Trial & Error",
        title: "Learn from 20 years of hands-on experiments.",
        description:
          "Access the growing archive of what worked, what failed, and what was learned across six ecosystems on three continents. Each learning site documents its methods openly — so you can adapt them to your own context.",
        buttonText: "Explore the archive",
        imageSrc:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800&h=600",
        imageAlt: "Restoration work at a Barbets Duet learning site",
      },
    },
    {
      value: "tab-2",
      icon: <Leaf className="h-auto w-4 shrink-0" />,
      label: "Eco-Tourists",
      content: {
        badge: "Voluntourism",
        title: "Work the land. See the results.",
        description:
          "Visit a Barbets Duet learning site and participate directly in restoration work — planting native trees, monitoring biodiversity, or helping with seaweed processing. Skills and effort welcome over donations.",
        buttonText: "Find a site to visit",
        imageSrc:
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800&h=600",
        imageAlt: "Visitors working at a Barbets Duet learning site",
      },
    },
    {
      value: "tab-3",
      icon: <Users className="h-auto w-4 shrink-0" />,
      label: "Local Communities",
      content: {
        badge: "Jumuiya",
        title: "Your knowledge belongs in this network.",
        description:
          "The Barbets Duet Jumuiya learns from African and Western, traditional and modern knowledge on equal terms. If you are managing land, water, or community resources — your experience is exactly what the network needs.",
        buttonText: "How to join",
        imageSrc:
          "https://images.unsplash.com/photo-1509099880921-1e4c87d3dc43?auto=format&fit=crop&q=80&w=800&h=600",
        imageAlt: "Community members at a Barbets Duet convention",
      },
    },
    {
      value: "tab-4",
      icon: <TrendingUp className="h-auto w-4 shrink-0" />,
      label: "Impact Investors",
      content: {
        badge: "Barbet's Friends",
        title: "Invest in the rules that reward living forests.",
        description:
          "We are not a charity — we are inventing the market mechanisms that make environmental care economically rational. Support specific learning sites, mosaic rights frameworks, or the Barbets revolving loan fund for site development.",
        buttonText: "Investment pathways",
        imageSrc:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800&h=600",
        imageAlt: "Aerial view of restored landscape",
      },
    },
  ],
};

function Feature108Demo() {
  return <Feature108 {...demoData} />;
}

export { Feature108Demo };
