export default function AccessDeniedPage() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-[#F4F4F5]">
      <div className="text-center max-w-md px-6">
        <p className="text-sm font-medium tracking-widest text-[#06211A]/40 uppercase mb-4 font-['DM_Sans']">
          403
        </p>
        <h1 className="text-3xl font-semibold text-[#06211A] mb-3 font-['DM_Sans']">
          Access denied
        </h1>
        <p className="text-base text-[#06211A]/60 leading-relaxed font-['DM_Sans']">
          You do not have permission to view this page. Contact your administrator
          if you believe this is an error.
        </p>
        <a
          href="/"
          className="mt-8 inline-block text-sm font-medium text-[#06211A] underline underline-offset-4 font-['DM_Sans']"
        >
          Return to home
        </a>
      </div>
    </main>
  )
}
