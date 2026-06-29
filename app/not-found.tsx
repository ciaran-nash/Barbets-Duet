import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <p className="text-sm font-medium tracking-widest text-foreground/40 uppercase mb-4 font-['DM_Sans']">
          404
        </p>
        <h1 className="text-3xl font-semibold text-foreground mb-3 font-['DM_Sans']">
          Page not found
        </h1>
        <p className="text-base text-foreground/60 leading-relaxed font-['DM_Sans']">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-foreground underline underline-offset-4 font-['DM_Sans']"
        >
          Return to home
        </Link>
      </div>
    </main>
  );
}
