'use client';

// Catches errors in the root layout itself. Replaces <html>/<body>, so it
// must render them and cannot rely on app CSS — uses inline styles only.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F4F4F5',
          color: '#06211A',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <main style={{ textAlign: 'center', maxWidth: 420, padding: '0 24px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ color: 'rgba(6,33,26,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: '#06211A',
              textDecoration: 'underline',
              textUnderlineOffset: 4,
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
