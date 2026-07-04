'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
	return (
		<footer
			className={cn('relative h-[720px] w-full bg-[#1A1A1A] text-white', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="fixed bottom-0 h-[720px] w-full">
				<div className="sticky top-[calc(100vh-720px)] h-full overflow-y-auto">
					<div className="relative flex size-full flex-col justify-between gap-5 px-4 py-8 md:px-12 max-w-7xl mx-auto">
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict"
						>
							<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
						</div>
						<div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-24 z-10">
							<AnimatedContainer className="w-full max-w-[240px] min-w-2xs space-y-8 pr-4">
								<div className="space-y-4">
									<h2 className="font-sans font-semibold text-base text-[#F4EFE6] tracking-wide">Address:</h2>
									<p className="text-white/80 text-sm leading-relaxed">
										P.O. Box 323<br />
										New Baltimore<br />
										NY 12124<br />
										U.S.A
									</p>
								</div>
								<div className="space-y-4">
									<h2 className="font-sans font-semibold text-base text-[#F4EFE6] tracking-wide">Contact:</h2>
									<a href="mailto:info@barbetsduet.com" className="hover:text-white text-white/80 transition-colors text-sm underline underline-offset-4 inline-block">
										info@barbetsduet.com
									</a>
								</div>
								{/* Social icons return here once the org's profile URLs are supplied —
								    links to "#" fail the dead-link e2e gate. */}
								{socialLinks.length > 0 && (
									<div className="flex gap-4 pt-2 pb-6">
										{socialLinks.map((link) => (
											<a key={link.title} href={link.href} className="text-white hover:text-white/70 transition-colors">
												<link.icon className="size-5" />
												<span className="sr-only">{link.title}</span>
											</a>
										))}
									</div>
								)}
								<div className="space-y-4 pt-4 border-t border-white/10">
									<h2 className="font-serif text-2xl uppercase tracking-widest text-[#F4EFE6]">Barbets Duet</h2>
									<p className="text-white/80 text-sm leading-relaxed">
										Connecting global communities through localized learning sites. Empowering people 
										with sustainable livelihoods and shared innovation.
									</p>
								</div>
							</AnimatedContainer>
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									key={group.label}
									delay={0.1 + index * 0.1}
									className="w-full"
								>
									<div className="mb-10 md:mb-0">
										<h3 className="font-sans font-semibold text-base text-[#F4EFE6] tracking-wide">{group.label}</h3>
										<ul className="text-white/80 mt-6 space-y-4 text-sm md:text-sm">
											{group.links.map((link) => (
												<li key={link.title}>
													<Link
														href={link.href}
														className="hover:text-white inline-flex items-center transition-all duration-300 underline underline-offset-4"
													>
														{link.icon && <link.icon className="me-2 size-4" />}
														{link.title}
													</Link>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}
						</div>
						<div className="text-white/40 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 pb-4 text-xs tracking-wider uppercase z-10 w-full mb-8">
							<div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start">
								<Link href="/legal/accessibility" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">Accessibility</Link>
								<Link href="/legal/cookies" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">Cookies Policy</Link>
								<Link href="/legal/privacy" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">Privacy Policy</Link>
								<Link href="/legal/terms" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">Terms of Service</Link>
								<a href="/sitemap.xml" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">Sitemap</a>
							</div>
							<p className="shrink-0 text-center md:text-right">© {new Date().getFullYear()} Barbets Duet. All rights reserved.</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

// Add entries once the org's real profile URLs are known, e.g.
// { title: 'Instagram', href: 'https://instagram.com/…', icon: InstagramIcon }
const socialLinks: {
	title: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}[] = [];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'About Us',
		links: [
			{ title: 'Who We Are', href: '/about' },
			{ title: 'Mission & Vision', href: '/about/mission-vision' },
			{ title: 'Philosophy & History', href: '/about/philosophy-history' },
			{ title: 'Our Team', href: '/about/team' },
			{ title: 'Careers & Opportunities', href: '/about/careers' },
		],
	},
	{
		label: 'Our Work',
		links: [
			{ title: 'Learning Sites', href: '/learning-sites' },
			{ title: 'Innovation Hub', href: '/projects' },
			{ title: 'Conventions & Events', href: '/events' },
			{ title: 'Impact Stories', href: '/stories' },
			{ title: 'Research & Publications', href: '/research' },
		],
	},
	{
		label: 'Community',
		links: [
			{ title: 'Community Hub', href: '/community' },
			{ title: 'Become a Member', href: '/community/sign-up' },
			{ title: 'Member Dashboard', href: '/community/dashboard' },
			{ title: 'Contribute Learnings', href: '/community/contribute' },
			{ title: 'Network Governance', href: '/community/governance' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog' },
			{ title: 'News', href: '/news' },
			{ title: 'Trials & Learnings', href: '/community/trials' },
			{ title: 'FAQs', href: '/faq' },
		],
	},
	{
		label: 'Get Involved',
		links: [
			{ title: 'Volunteer', href: '/get-involved' },
			{ title: 'Donate', href: '/support-us' },
			{ title: 'Become a Partner', href: '/get-involved' },
			{ title: 'Apply to be a Learning Site', href: '/get-involved' },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
