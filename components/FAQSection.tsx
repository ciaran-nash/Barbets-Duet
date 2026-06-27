'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Users, Mail, Check, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const categories = [
  'All Categories',
  'General',
  'Our Projects',
  'Getting Involved',
  'Impact & Results',
  'Partnerships'
];

type FAQ = {
  id: number;
  category: string;
  question: string;
  answer: string;
  actions?: { label: string; icon: React.ElementType }[];
  tags?: string[];
};

const initialFaqs: FAQ[] = [
  {
    id: 1,
    category: 'Getting Involved',
    question: 'Can I volunteer for one of your projects?',
    answer: "Yes! We welcome volunteers. Opportunities vary by location and project needs. Please visit our 'Getting Involved' page or contact the specific learning site for more information on current volunteer openings.",
    actions: [
      { label: 'See Volunteer Roles', icon: Users },
      { label: 'Contact Us', icon: Mail }
    ]
  },
  {
    id: 2,
    category: 'General',
    question: 'What is Barbets Duet?',
    answer: "Barbets Duet is a global network of restorative learning sites focused on the intersection of ecological health and community well-being. We partner with local leaders to transform degraded landscapes into thriving ecosystems.",
  },
  {
    id: 3,
    category: 'General',
    question: 'What makes your approach different from other conservation groups?',
    answer: "We strongly emphasize community livelihoods alongside ecological restoration. By treating economic ventures and landscape healing as intrinsically linked, we ensure long-term sustainability that benefits both people and nature.",
  },
  {
    id: 4,
    category: 'Our Projects',
    question: 'How do you select your restoration projects?',
    answer: "We select projects based on community readiness, ecological need, and the potential for sustainable economic models. Every site must demonstrate a strong local partnership and a clear path toward landscape regeneration.",
  },
  {
    id: 5,
    category: 'Getting Involved',
    question: 'Is my donation tax-deductible?',
    answer: "As a business venture, direct donations are not tax-deductible. However, we offer various investment and support models. For philanthropic giving, we can connect you with our non-profit partners. Please contact our investment team for more details.",
    tags: ['finance', 'investment']
  },
  {
    id: 6,
    category: 'Impact & Results',
    question: 'How do you measure the impact of your work?',
    answer: "We use a combination of quantitative and qualitative metrics, including hectares restored, species protected, carbon sequestered, and community economic benefits. Our 'Impact in Numbers' section provides a transparent overview of our progress.",
    tags: ['data', 'reporting', 'metrics'],
    actions: [
      { label: 'View Impact Report', icon: FileText }
    ]
  },
  {
    id: 7,
    category: 'Partnerships',
    question: 'What kind of partnerships are you looking for?',
    answer: "We seek partnerships with local communities, NGOs, research institutions, governments, and impact investors who share our vision. We believe collaboration is key to achieving large-scale ecological restoration.",
    tags: ['NGOs', 'Research Institutions', 'Impact Investors', 'Governments']
  },
  {
    id: 8,
    category: 'Partnerships',
    question: 'How can my company partner with Barbets Duet?',
    answer: "We offer corporate partnership programs that include carbon offsetting, employee engagement opportunities, and brand alignment with our restoration mission. Please reach out to our partnerships team to explore how we can work together.",
    actions: [
      { label: 'Contact Partnerships', icon: Mail }
    ]
  }
];

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [openIds, setOpenIds] = useState<number[]>([1]); // First one open by default

  const toggleAccordion = (id: number) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(openId => openId !== id) : [...prev, id]
    );
  };

  const filteredFaqs = initialFaqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All Categories' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-platinum">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-night-forest mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-night-forest/70 font-sans max-w-2xl">
            Find answers to common questions about our mission, projects, partnerships, and how you can get involved.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-night-forest/5 p-4 rounded-xl items-center relative z-20">
          
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-night-forest/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-night-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-viridian focus:border-transparent font-sans shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-56">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full flex items-center justify-between bg-white border border-night-forest/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-viridian font-sans shadow-sm"
              >
                <span className="text-night-forest">{selectedCategory}</span>
                <ChevronDown className="text-night-forest/50 w-5 h-5" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-platinum border border-night-forest/10 rounded-xl shadow-xl overflow-hidden z-30 py-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-viridian/10 transition-colors font-sans text-night-forest"
                    >
                      {selectedCategory === category && (
                         <div className="w-5 flex justify-center">
                           <Check className="w-4 h-4 text-night-forest" />
                         </div>
                      )}
                      <span className={selectedCategory === category ? "font-semibold" : "pl-8"}>
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown (Mock) */}
            <div className="relative w-full sm:w-48">
              <select aria-label="Sort FAQs" className="w-full appearance-none bg-white border border-night-forest/20 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-viridian shadow-sm font-sans text-night-forest cursor-pointer">
                <option>Most Popular</option>
                <option>Newest</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-night-forest/50 w-5 h-5 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* FAQs List */}
        <div className="space-y-0 text-night-forest">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div 
                key={faq.id} 
                className={`border-b border-night-forest/10 py-6 ${index === 0 ? 'border-t' : ''}`}
              >
                <button 
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-start justify-between text-left group gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-1">
                    <span className="px-3 py-1 rounded-full bg-viridian/10 text-viridian text-xs font-semibold whitespace-nowrap font-sans tracking-wide">
                      {faq.category}
                    </span>
                    <span className="text-lg font-sans font-bold group-hover:text-night-forest/70 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0 mt-1 sm:mt-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-night-forest/50" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-night-forest/50" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 pl-0 sm:pl-[140px] pr-8">
                        <p className="text-night-forest/70 font-sans leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        
                        {faq.tags && faq.tags.length > 0 && (
                          <div className="flex items-center gap-3 mt-4 mb-2">
                            {['data', 'reporting', 'metrics', 'finance', 'investment'].some(t => faq.tags?.includes(t)) && (
                              <span className="text-sm font-semibold text-night-forest/70 font-sans">Related:</span>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, tagIdx) => (
                                <span key={tagIdx} className="px-3 py-1 border border-night-forest/30 rounded-full text-sm font-semibold text-viridian font-sans">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {faq.actions && (
                          <div className="flex flex-wrap gap-3 mt-6">
                            {faq.actions.map((action, actionIdx) => (
                              <button key={actionIdx} className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-night-forest/20 text-night-forest rounded-xl hover:border-viridian hover:shadow-sm hover:text-viridian transition-all text-sm font-bold font-sans">
                                <action.icon className="w-5 h-5 text-night-forest/40 group-hover:text-viridian transition-colors" />
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          
          {filteredFaqs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-night-forest/10 mb-6">
                <Search className="w-8 h-8 text-night-forest/30" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-night-forest mb-3">No results found</h3>
              <p className="text-night-forest/50 font-sans max-w-md mb-8">
                We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;. Try adjusting your search or selecting a different category.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); }}
                className="px-6 py-3 bg-white border border-night-forest/20 text-night-forest rounded-full font-bold text-sm tracking-wide hover:bg-night-forest/5 hover:border-night-forest/30 transition-all font-sans shadow-sm"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
