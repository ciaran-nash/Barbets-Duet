import { Blog7 } from "@/components/blocks/blog7"

const demoData = {
  tagline: "Latest Updates",
  heading: "Blog Posts",
  description:
    "Discover the latest news on ecological restoration, community successes, and sustainable finance from the Barbets Duet team.",
  buttonText: "Explore all posts",
  buttonUrl: "/blog",
  posts: [
    {
      id: "post-1",
      title: "The Oak Tree Paradox: Why We Invented Barbets Duet",
      summary:
        "A mature oak supports 284 species of insect. Its financial value is only realised once it is dead. This is the paradox the Barbets Duet was created to solve — and the 20-year experiment that followed.",
      label: "Philosophy",
      author: "Barbara Heinzen",
      published: "12 Oct 2024",
      url: "/blog/post-1",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
      id: "post-2",
      title: "Mosaic Rights vs Column Rights: Footpaths and Fences",
      summary:
        "In a column rights system, one owner holds everything — mineral, air, and land rights — and needs fences to keep others out. Mosaic rights are crisscrossed by footpaths. We believe biodiversity follows the footpaths.",
      label: "Theory",
      author: "Rading Nyamwaya",
      published: "28 Sep 2024",
      url: "/blog/post-2",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
      id: "post-3",
      title: "What Happened When the Beavers Came Back",
      summary:
        "In 2013, Barbara Heinzen granted hunting rights in exchange for land management at Hannacroix Creek. By 2024, beavers had returned, built new dams, and the swamp forest was beginning to recover.",
      label: "Ecology",
      author: "Sankara Yambo",
      published: "15 Sep 2024",
      url: "/blog/post-3",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800&h=600",
    },
  ],
};

function Blog7Demo() {
  return <Blog7 {...demoData} />;
}

export { Blog7Demo };
