'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { type Variants } from 'motion/react';
import { Menu, X, ChevronRight, LogIn, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

interface NavLink {
    text: string;
    href: string;
}

interface DropdownColumn {
    heading: string;
    links: NavLink[];
}

type DropdownData = DropdownColumn[];

interface MenuItem {
    label: string;
    href?: string;
    dropdownData?: DropdownData;
}

type AnimationDirection = 'right-to-left' | 'left-to-right';

const aboutDropdownData: DropdownData = [
    {
      heading: 'Who We Are',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Our Team', href: '/about/team' },
        { text: 'Mission & Vision', href: '/about/mission-vision' },
        { text: 'Philosophy & History', href: '/about/philosophy-history' },
        { text: 'Careers & Opportunities', href: '/about/careers' },
      ]
    },
    {
      heading: 'Our Work',
      links: [
        { text: 'Innovation Hub', href: '/projects' },
        { text: 'Learning Sites', href: '/learning-sites' },
        { text: 'Stories', href: '/stories' },
      ]
    }
];

const communityDropdownData: DropdownData = [
    {
      heading: 'Get Involved',
      links: [
        { text: 'Events', href: '/events' },
        { text: 'Support Us', href: '/support-us' },
        { text: 'Volunteer', href: '/get-involved' },
        // TODO(T24): Uncomment when /community page is built
        // { text: 'Community & Partnerships', href: '/community' },
      ]
    },
    {
      heading: 'Resources',
      links: [
        // TODO(T25): Uncomment when /research page is built
        // { text: 'Research Hub', href: '/research' },
        { text: 'About Our Mission', href: '/about/mission-vision' },
      ]
    }
];

// T05: All nav routes verified — zero href="#" placeholders remain.
// Future routes are commented out with TODO markers pending their pages being built.
const menuItems: MenuItem[] = [
    { label: 'About', dropdownData: aboutDropdownData },
    { label: 'Community', dropdownData: communityDropdownData },
    { label: 'Get Involved', href: '/get-involved' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, signInWithGoogle } = useAuth();

  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>('right-to-left');
  const closeTimeoutRef = useRef<number | null>(null);
  const prevActiveMenuItemIndex = useRef<number | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [mobileActiveDropdownIndex, setMobileActiveDropdownIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
      if (activeMenuItemIndex !== null && prevActiveMenuItemIndex.current !== null) {
          if (activeMenuItemIndex > prevActiveMenuItemIndex.current) {
              setAnimationDirection('right-to-left');
          } else {
              setAnimationDirection('left-to-right');
          }
      } else {
          setAnimationDirection('right-to-left');
      }
      prevActiveMenuItemIndex.current = activeMenuItemIndex;
  }, [activeMenuItemIndex]);

  const openDropdown = (index: number, hasDropdown: boolean) => {
      if (closeTimeoutRef.current !== null) {
          clearTimeout(closeTimeoutRef.current);
      }
      if (hasDropdown) {
          setActiveMenuItemIndex(index);
          setIsDropdownOpen(true);
      } else {
          setActiveMenuItemIndex(null);
          setIsDropdownOpen(false);
      }
  };

  const closeDropdown = () => {
      closeTimeoutRef.current = setTimeout(() => {
          setIsDropdownOpen(false);
      }, 100) as unknown as number;
  };

   const handleDropdownTransitionEnd = () => {
      if (!isDropdownOpen) {
          setActiveMenuItemIndex(null);
           prevActiveMenuItemIndex.current = null;
      }
   };

  const toggleMobileMenu = () => {
      const newState = !isMobileMenuOpen;
      setIsMobileMenuOpen(newState);
      if (!newState) {
           setMobileActiveDropdownIndex(null);
      }
  };

  const toggleMobileDropdown = (index: number) => {
      setMobileActiveDropdownIndex(mobileActiveDropdownIndex === index ? null : index);
  };

   const handleMobileLinkClick = () => {
       setIsMobileMenuOpen(false);
       setMobileActiveDropdownIndex(null);
   };

   useEffect(() => {
       if (isMobileMenuOpen) {
           document.body.style.overflow = 'hidden';
       } else {
           document.body.style.overflow = 'unset';
       }
       return () => {
            document.body.style.overflow = 'unset';
       };
   }, [isMobileMenuOpen]);

  // True when header needs light (platinum) background
  const isLight = scrolled || isMobileMenuOpen || isDropdownOpen;

  const contentVariants: { [key in AnimationDirection]: Variants } = {
      'right-to-left': {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0, transition: { opacity: { duration: 0.2 }, x: { duration: 0.3, ease: 'easeOut' } } },
          exit: { opacity: 0, x: -50, transition: { opacity: { duration: 0.2 }, x: { duration: 0.3, ease: 'easeIn' } } },
      },
      'left-to-right': {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0, transition: { opacity: { duration: 0.2 }, x: { duration: 0.3, ease: 'easeOut' } } },
          exit: { opacity: 0, x: 50, transition: { opacity: { duration: 0.2 }, x: { duration: 0.3, ease: 'easeIn' } } },
      }
  };

  const containerVariants: Variants = {
      closed: { opacity: 0, pointerEvents: 'none', y: -10 },
      open: { opacity: 1, pointerEvents: 'auto', y: 0 },
  };

   const mobileMenuVariants: Variants = {
       closed: { x: '100%' },
       open: { x: '0%' },
   };

   const mobileDropdownVariants: Variants = {
       closed: { height: 0, opacity: 0, overflowY: 'hidden' },
       open: { height: 'auto', opacity: 1, overflowY: 'visible' },
   };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 flex flex-col ${
        isLight
          ? 'bg-platinum shadow-sm text-night-forest'
          : 'bg-transparent text-platinum'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 py-4 flex justify-between items-center relative z-20">
        <Link href="/" onClick={() => setIsDropdownOpen(false)}>
          <div className="group cursor-pointer">
            <h1 className="font-serif text-lg lg:text-xl tracking-wider uppercase font-medium">
              Barbets Duet
            </h1>
            <p className="text-[9px] lg:text-[10px] tracking-widest uppercase opacity-70">
              Global Learning Sites
            </p>
          </div>
        </Link>

        <ul
            className="hidden lg:flex gap-6 xl:gap-8 items-center text-[10px] xl:text-xs font-semibold tracking-widest uppercase m-0 p-0 h-full"
            onMouseLeave={closeDropdown}
        >
            {menuItems.map((item, index) => (
                 <li
                    key={`desktop-menu-${index}`}
                    className="flex items-center h-full py-2 relative"
                    onMouseEnter={() => openDropdown(index, !!item.dropdownData)}
                 >
                     <Link href={item.href || '#'} className="hover:opacity-60 transition-opacity">
                         {item.label}
                     </Link>
                     {activeMenuItemIndex === index && isDropdownOpen && item.dropdownData && (
                        <motion.div
                            layoutId="underline"
                            className={`absolute -bottom-1 left-0 right-0 h-[2px] ${isLight ? 'bg-night-forest' : 'bg-platinum'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                     )}
                 </li>
            ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4 text-[10px] xl:text-xs font-semibold tracking-widest uppercase">
          <div className={`w-px h-4 ${isLight ? 'bg-night-forest/20' : 'bg-platinum/20'}`}></div>

          <Link
            href="/support-us"
            className={`px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap active:scale-[0.98] ${
              isLight
                ? 'border-night-forest text-night-forest hover:bg-night-forest hover:text-neon-lime'
                : 'border-platinum text-platinum hover:bg-platinum hover:text-night-forest'
            }`}
          >
            Support Us
          </Link>

          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
            >
              <UserIcon size={14} /> Dashboard
            </Link>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
            >
              <LogIn size={14} /> Sign In
            </button>
          )}
        </div>

        <button onClick={toggleMobileMenu} className="lg:hidden" aria-label="Toggle navigation menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

       <AnimatePresence>
       {isDropdownOpen && activeMenuItemIndex !== null && (
           <motion.div
               key="desktop-dropdown-container"
               className="hidden lg:block absolute top-[100%] left-0 right-0 bg-platinum text-night-forest shadow-lg border-t border-night-forest/10"
               initial="closed"
               animate="open"
               exit="closed"
               variants={containerVariants}
               transition={{ duration: 0.3 }}
               onMouseEnter={() => { if (closeTimeoutRef.current !== null) clearTimeout(closeTimeoutRef.current); }}
               onMouseLeave={closeDropdown}
               onAnimationComplete={handleDropdownTransitionEnd}
           >
                <AnimatePresence mode="wait">
                   {menuItems[activeMenuItemIndex]?.dropdownData && (
                       <motion.div
                           key={`desktop-dropdown-content-${activeMenuItemIndex}`}
                           variants={contentVariants[animationDirection]}
                           initial="initial"
                           animate="animate"
                           exit="exit"
                           className="max-w-[1600px] mx-auto px-6 py-12"
                       >
                           <div className="flex gap-16">
                               {menuItems[activeMenuItemIndex]?.dropdownData?.map((column, colIndex) => (
                                   <div key={`desktop-col-${colIndex}`} className="min-w-[200px]">
                                       <h3 className="mb-4 text-[10px] font-semibold tracking-widest uppercase opacity-50">
                                           {column.heading}
                                       </h3>
                                       <ul className="flex flex-col gap-3 p-0 m-0">
                                           {column.links.map((link, linkIndex) => (
                                               <li key={`desktop-link-${colIndex}-${linkIndex}`}>
                                                   <Link
                                                     href={link.href}
                                                     className="text-base font-serif hover:opacity-60 transition-opacity"
                                                     onClick={closeDropdown}
                                                   >
                                                       {link.text}
                                                   </Link>
                                               </li>
                                           ))}
                                       </ul>
                                   </div>
                               ))}
                           </div>
                       </motion.div>
                   )}
               </AnimatePresence>
           </motion.div>
       )}
       </AnimatePresence>

       <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  key="mobile-menu-overlay"
                  className="fixed inset-0 bg-night-forest/20 backdrop-blur-sm z-40 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                   onClick={(e) => {
                       if (e.target === e.currentTarget) {
                           toggleMobileMenu();
                       }
                   }}
              >
                  <motion.div
                      key="mobile-menu-content"
                      className="absolute top-0 right-0 h-full w-[85%] max-w-[400px] bg-platinum text-night-forest shadow-2xl flex flex-col p-6 overflow-y-auto"
                      variants={mobileMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                       onClick={(e) => e.stopPropagation()}
                  >
                      <div className="flex justify-between items-center mb-12">
                          <h2 className="font-serif text-xl">Menu</h2>
                          <button onClick={toggleMobileMenu} aria-label="Close navigation menu">
                              <X size={24} />
                          </button>
                      </div>

                      <ul className="flex flex-col gap-6 text-sm font-semibold tracking-widest uppercase">
                          {menuItems.map((item, index) => (
                              <li key={`mobile-menu-${index}`}>
                                  {item.dropdownData ? (
                                      <>
                                          <button
                                              className="flex justify-between items-center w-full text-left py-2"
                                              onClick={() => toggleMobileDropdown(index)}
                                          >
                                              {item.label}
                                              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${mobileActiveDropdownIndex === index ? 'rotate-90' : ''}`} />
                                          </button>
                                           <AnimatePresence>
                                              {mobileActiveDropdownIndex === index && (
                                                   <motion.div
                                                       key={`mobile-dropdown-content-${index}`}
                                                       initial="closed"
                                                       animate="open"
                                                       exit="closed"
                                                       variants={mobileDropdownVariants}
                                                       transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                       className="mt-4 pl-4 border-l border-night-forest/20 flex flex-col gap-6"
                                                   >
                                                       {item.dropdownData.map((column, colIndex) => (
                                                           <div key={`mobile-col-${colIndex}`}>
                                                               <h4 className="text-[10px] opacity-50 mb-3">{column.heading}</h4>
                                                               <ul className="flex flex-col gap-3 font-serif text-base capitalize tracking-normal">
                                                                   {column.links.map((link, linkIndex) => (
                                                                       <li key={`mobile-link-${colIndex}-${linkIndex}`}>
                                                                           <Link href={link.href} className="hover:opacity-60" onClick={handleMobileLinkClick}>
                                                                               {link.text}
                                                                           </Link>
                                                                       </li>
                                                                   ))}
                                                               </ul>
                                                           </div>
                                                       ))}
                                                   </motion.div>
                                              )}
                                           </AnimatePresence>
                                      </>
                                  ) : (
                                      <Link href={item.href || '#'} className="block py-2 hover:opacity-60" onClick={handleMobileLinkClick}>
                                           {item.label}
                                       </Link>
                                  )}
                              </li>
                          ))}
                      </ul>

                      <div className="mt-12 pt-8 border-t border-night-forest/10 flex flex-col gap-4 text-xs font-semibold tracking-widest uppercase">
                           <Link
                             href="/support-us"
                             className="text-center py-3 rounded-full border border-night-forest text-night-forest hover:bg-night-forest hover:text-neon-lime transition-colors active:scale-[0.98]"
                             onClick={handleMobileLinkClick}
                           >
                             Support Us
                           </Link>

                           {user ? (
                             <Link
                               href="/dashboard"
                               className="flex justify-center items-center gap-2 py-3 bg-night-forest text-platinum rounded-full hover:bg-night-forest/90 transition-colors"
                               onClick={handleMobileLinkClick}
                             >
                               <UserIcon size={14} /> Dashboard
                             </Link>
                           ) : (
                             <button
                               onClick={() => {
                                 handleMobileLinkClick();
                                 signInWithGoogle();
                               }}
                               className="flex justify-center items-center gap-2 py-3 bg-night-forest text-platinum rounded-full hover:bg-night-forest/90 transition-colors"
                             >
                               <LogIn size={14} /> Sign In
                             </button>
                           )}
                       </div>
                  </motion.div>
              </motion.div>
          )}
       </AnimatePresence>
    </motion.header>
  );
}
