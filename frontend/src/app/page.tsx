import Link from 'next/link';

// This page is statically generated at build time (SSG) — no data fetching needed
export default function HomePage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80 }}>
      <h1 style={{ fontSize: 48, letterSpacing: 4 }}>SNAKE</h1>
      <p style={{ color: '#888', marginBottom: 40 }}>Multiplayer · Real-time · WebSockets</p>
      <div style={{ display: 'flex', gap: 16 }}>
        <Link href="/login">
          <button style={btnStyle}>Login</button>
        </Link>
        <Link href="/register">
          <button style={{ ...btnStyle, background: '#2a9d8f' }}>Register</button>
        </Link>
      </div>
    </main>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '12px 32px',
  fontSize: 16,
  background: '#e63946',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
};
