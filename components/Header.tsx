'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { type Variants } from 'motion/react';
import { ChevronRight, LogIn, User as UserIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
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
      ]
    },
    {
      heading: 'Resources',
      links: [
        { text: 'Research Hub', href: '/research' },
        { text: 'About Our Mission', href: '/about/mission-vision' },
      ]
    }
];

const menuItems: MenuItem[] = [
    { label: 'About', dropdownData: aboutDropdownData },
    { label: 'Community', dropdownData: communityDropdownData },
    { label: 'Get Involved', href: '/get-involved' },
];

export default function Header() {
  const { user, signInWithGoogle } = useAuth();

  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>('right-to-left');
  const closeTimeoutRef = useRef<number | null>(null);
  const prevActiveMenuItemIndex = useRef<number | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [mobileActiveDropdownIndex, setMobileActiveDropdownIndex] = useState<number | null>(null);

  useEffect(() => {
      if (activeMenuItemIndex !== null && prevActiveMenuItemIndex.current !== null) {
          setAnimationDirection(
            activeMenuItemIndex > prevActiveMenuItemIndex.current
              ? 'right-to-left'
              : 'left-to-right'
          );
      } else {
          setAnimationDirection('right-to-left');
      }
      prevActiveMenuItemIndex.current = activeMenuItemIndex;
  }, [activeMenuItemIndex]);

  const openDropdown = (index: number, hasDropdown: boolean) => {
      if (closeTimeoutRef.current !== null) clearTimeout(closeTimeoutRef.current);
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
      if (!newState) setMobileActiveDropdownIndex(null);
  };

  const toggleMobileDropdown = (index: number) => {
      setMobileActiveDropdownIndex(mobileActiveDropdownIndex === index ? null : index);
  };

  const handleMobileLinkClick = () => {
      setIsMobileMenuOpen(false);
      setMobileActiveDropdownIndex(null);
  };

  useEffect(() => {
      document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
      return () => { document.body.style.overflow = 'unset'; };
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
      closed: { opacity: 0, pointerEvents: 'none', y: -8, scale: 0.98 },
      open: { opacity: 1, pointerEvents: 'auto', y: 0, scale: 1 },
  };

  const mobileDropdownVariants: Variants = {
      closed: { height: 0, opacity: 0, overflow: 'hidden' },
      open: { height: 'auto', opacity: 1, overflow: 'visible' },
  };

  return (
    <>
      {/* Floating island pill */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav
          className="pointer-events-auto flex items-center gap-6 px-5 py-2.5 rounded-full bg-background/90 backdrop-blur-xl ring-1 ring-foreground/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          onMouseLeave={closeDropdown}
        >
          {/* Logo */}
          <Link href="/" onClick={() => setIsDropdownOpen(false)}>
            <div className="group cursor-pointer text-foreground">
              <h1 className="font-serif text-sm tracking-wider uppercase font-medium leading-none">
                Barbets Duet
              </h1>
              <p className="text-[8px] tracking-widest uppercase opacity-50 mt-0.5">
                Global Learning Sites
              </p>
            </div>
          </Link>

          {/* Divider */}
          <div className="w-px h-4 bg-foreground/20 hidden lg:block" />

          {/* Desktop nav items */}
          <ul className="hidden lg:flex gap-5 items-center text-[10px] font-semibold tracking-widest uppercase m-0 p-0 text-foreground">
              {menuItems.map((item, index) => (
                   <li
                      key={`desktop-menu-${index}`}
                      className="flex items-center relative py-1"
                      onMouseEnter={() => openDropdown(index, !!item.dropdownData)}
                   >
                       <Link href={item.href || '#'} className="hover:opacity-60 transition-opacity duration-300">
                           {item.label}
                       </Link>
                       {activeMenuItemIndex === index && isDropdownOpen && item.dropdownData && (
                          <motion.div
                              layoutId="underline"
                              className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                          />
                       )}
                   </li>
              ))}
          </ul>

          {/* Divider */}
          <div className="w-px h-4 bg-foreground/20 hidden lg:block" />

          {/* CTA area */}
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-semibold tracking-widest uppercase text-foreground">
            <Link
              href="/support-us"
              className="px-4 py-1.5 rounded-full border border-foreground/30 text-foreground hover:bg-foreground/10 hover:text-background transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap active:scale-[0.98]"
            >
              Support Us
            </Link>

            <ThemeToggle />

            {user ? (
              <Link href="/dashboard" className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
                <UserIcon size={12} /> Dashboard
              </Link>
            ) : (
              <button onClick={signInWithGoogle} className="flex items-center gap-1.5 hover:opacity-60 transition-opacity">
                <LogIn size={12} /> Sign In
              </button>
            )}
          </div>

          {/* Mobile hamburger — 2-line morph */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden relative w-6 h-5 flex flex-col justify-between"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block w-full h-px bg-foreground origin-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isMobileMenuOpen ? 'translate-y-[9px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-full h-px bg-foreground origin-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isMobileMenuOpen ? '-translate-y-[9px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </motion.div>

      {/* Desktop dropdown — floating panel below pill */}
      <AnimatePresence>
        {isDropdownOpen && activeMenuItemIndex !== null && (
          <motion.div
            key="desktop-dropdown-container"
            className="hidden lg:block fixed top-[5rem] left-1/2 -translate-x-1/2 z-40 min-w-[480px]"
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            onMouseEnter={() => { if (closeTimeoutRef.current !== null) clearTimeout(closeTimeoutRef.current); }}
            onMouseLeave={closeDropdown}
            onAnimationComplete={handleDropdownTransitionEnd}
          >
            <div className="rounded-[1.5rem] ring-1 ring-foreground/10 bg-background/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
              <AnimatePresence mode="wait">
                {menuItems[activeMenuItemIndex]?.dropdownData && (
                  <motion.div
                    key={`desktop-dropdown-content-${activeMenuItemIndex}`}
                    variants={contentVariants[animationDirection]}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="px-8 py-10"
                  >
                    <div className="flex gap-12">
                      {menuItems[activeMenuItemIndex]?.dropdownData?.map((column, colIndex) => (
                        <div key={`desktop-col-${colIndex}`} className="min-w-[180px]">
                          <h3 className="mb-4 text-[9px] font-semibold tracking-widest uppercase text-foreground/40">
                            {column.heading}
                          </h3>
                          <ul className="flex flex-col gap-3 p-0 m-0">
                            {column.links.map((link, linkIndex) => (
                              <li key={`desktop-link-${colIndex}-${linkIndex}`}>
                                <Link
                                  href={link.href}
                                  className="text-base font-serif text-foreground hover:text-primary transition-colors duration-300"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            className="fixed inset-0 bg-background/80 backdrop-blur-3xl z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => { if (e.target === e.currentTarget) toggleMobileMenu(); }}
          >
            <motion.div
              key="mobile-menu-content"
              className="absolute top-0 right-0 h-full w-[85%] max-w-[400px] bg-background text-foreground flex flex-col p-8 overflow-y-auto ring-1 ring-foreground/10"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-16">
                <button onClick={toggleMobileMenu} aria-label="Close navigation menu" className="opacity-50 hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold tracking-widest uppercase">Close</span>
                </button>
              </div>

              <ul className="flex flex-col gap-8 text-sm font-semibold tracking-widest uppercase">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={`mobile-menu-${index}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {item.dropdownData ? (
                      <>
                        <button
                          className="flex justify-between items-center w-full text-left py-2 hover:opacity-60 transition-opacity"
                          onClick={() => toggleMobileDropdown(index)}
                        >
                          {item.label}
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${mobileActiveDropdownIndex === index ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileActiveDropdownIndex === index && (
                            <motion.div
                              key={`mobile-dropdown-content-${index}`}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={mobileDropdownVariants}
                              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                              className="mt-4 pl-4 border-l border-foreground/20 flex flex-col gap-6"
                            >
                              {item.dropdownData.map((column, colIndex) => (
                                <div key={`mobile-col-${colIndex}`}>
                                  <h4 className="text-[9px] text-foreground/40 uppercase tracking-widest mb-3">{column.heading}</h4>
                                  <ul className="flex flex-col gap-3 font-serif text-base capitalize tracking-normal">
                                    {column.links.map((link, linkIndex) => (
                                      <li key={`mobile-link-${colIndex}-${linkIndex}`}>
                                        <Link href={link.href} className="hover:text-primary transition-colors" onClick={handleMobileLinkClick}>
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
                      <Link href={item.href || '#'} className="block py-2 hover:opacity-60 transition-opacity" onClick={handleMobileLinkClick}>
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-12 border-t border-foreground/10 flex flex-col gap-4 text-xs font-semibold tracking-widest uppercase">
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
                <Link
                  href="/support-us"
                  className="text-center py-3 rounded-full border border-foreground/30 text-foreground hover:bg-foreground/10 hover:text-background transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                  onClick={handleMobileLinkClick}
                >
                  Support Us
                </Link>

                {user ? (
                  <Link
                    href="/dashboard"
                    className="flex justify-center items-center gap-2 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors active:scale-[0.98]"
                    onClick={handleMobileLinkClick}
                  >
                    <UserIcon size={14} /> Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => { handleMobileLinkClick(); signInWithGoogle(); }}
                    className="flex justify-center items-center gap-2 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors active:scale-[0.98]"
                  >
                    <LogIn size={14} /> Sign In
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
