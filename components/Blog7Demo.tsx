import { Blog7 } from "@/components/blocks/blog7"

const demoData = {
  tagline: "Latest Updates",
  heading: "Blog Posts",
  description:
    "Discover the latest news on ecological restoration, community successes, and sustainable finance from the Barbets Duet team.",
  buttonText: "Explore all posts",
  buttonUrl: "#",
  posts: [
    {
      id: "post-1",
      title: "Restoring the Kenyan Highlands",
      summary:
        "Learn how our community-led initiatives are bringing back native flora and fauna to the Kenyan highlands, improving water retention and soil health.",
      label: "Ecology",
      author: "Jane Doe",
      published: "12 Oct 2024",
      url: "#",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
      id: "post-2",
      title: "Sustainable Finance for Conservation",
      summary:
        "A deep dive into how we use innovative financing models to support long-term ecosystem restoration projects around the globe.",
      label: "Finance",
      author: "John Smith",
      published: "28 Sep 2024",
      url: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
      id: "post-3",
      title: "Community Growth in Action",
      summary:
        "Meet the local leaders driving change in their communities. Their stories are a testament to the power of grassroots conservation efforts.",
      label: "Community",
      author: "Alice Johnson",
      published: "15 Sep 2024",
      url: "#",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800&h=600",
    },
  ],
};

function Blog7Demo() {
  return <Blog7 {...demoData} />;
}

export { Blog7Demo };
