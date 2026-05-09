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
        { text: 'About Us', href: '/#about-us' }, 
        { text: 'Our Work', href: '/#our-work' },
        { text: 'Learning & Innovation', href: '/#learning-and-innovation' }
      ] 
    }
];

const communityDropdownData: DropdownData = [
    { 
      heading: 'People & Impact', 
      links: [
        { text: 'Community & Partnerships', href: '/#community-and-partnerships' }, 
        { text: 'Education & Resources', href: '/#education-and-resources' },
        { text: 'Economic Opportunities', href: '/#economic-opportunities' }
      ] 
    }
];

const menuItems: MenuItem[] = [
    { label: 'About', dropdownData: aboutDropdownData },
    { label: 'Community', dropdownData: communityDropdownData },
    { label: 'Get Involved', href: '/#get-involved' },
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
        scrolled || isMobileMenuOpen || isDropdownOpen ? 'bg-[#F4F4F0] shadow-sm text-[#111111]' : 'bg-transparent text-white'
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
                    className={`flex items-center h-full py-2 relative`}
                    onMouseEnter={() => openDropdown(index, !!item.dropdownData)}
                 >
                     <Link href={item.href || '#'} className="hover:opacity-60 transition-opacity">
                         {item.label}
                     </Link>
                     {activeMenuItemIndex === index && isDropdownOpen && item.dropdownData && (
                        <motion.div
                            layoutId="underline"
                            className={`absolute -bottom-1 left-0 right-0 h-[2px] ${scrolled || isDropdownOpen ? 'bg-[#111111]' : 'bg-white'}`}
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
          <div className={`w-px h-4 ${scrolled || isDropdownOpen ? 'bg-[#111111]/20' : 'bg-white/20'}`}></div>

          <Link
            href="/support-us"
            className={`px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
              scrolled || isDropdownOpen
                ? 'border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#C7F16C]' 
                : 'border-white text-white hover:bg-white hover:text-[#111111]'
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

        <button onClick={toggleMobileMenu} className="lg:hidden">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

       <AnimatePresence>
       {isDropdownOpen && activeMenuItemIndex !== null && (
           <motion.div
               key="desktop-dropdown-container"
               className="hidden lg:block absolute top-[100%] left-0 right-0 bg-[#F4F4F0] text-[#111111] shadow-lg border-t border-[#111111]/10"
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
                  className="fixed inset-0 bg-[#111111]/20 backdrop-blur-sm z-40 lg:hidden"
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
                      className="absolute top-0 right-0 h-full w-[85%] max-w-[400px] bg-[#F4F4F0] text-[#111111] shadow-2xl flex flex-col p-6 overflow-y-auto"
                      variants={mobileMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                       onClick={(e) => e.stopPropagation()}
                  >
                      <div className="flex justify-between items-center mb-12">
                          <h2 className="font-serif text-xl">Menu</h2>
                          <button onClick={toggleMobileMenu}>
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
                                                       className="mt-4 pl-4 border-l border-[#111111]/20 flex flex-col gap-6"
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
                      
                      <div className="mt-12 pt-8 border-t border-[#111111]/10 flex flex-col gap-4 text-xs font-semibold tracking-widest uppercase">
                           <Link 
                             href="/support-us" 
                             className="text-center py-3 rounded-full border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#C7F16C] transition-colors"
                             onClick={handleMobileLinkClick}
                           >
                             Support Us
                           </Link>
                           
                           {user ? (
                             <Link 
                               href="/dashboard"
                               className="flex justify-center items-center gap-2 py-3 bg-[#2C3E35] text-white rounded-full hover:bg-[#2C3E35]/90 transition-colors"
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
                               className="flex justify-center items-center gap-2 py-3 bg-[#2C3E35] text-white rounded-full hover:bg-[#2C3E35]/90 transition-colors"
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
