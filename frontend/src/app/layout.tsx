import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snake Multiplayer',
  description: 'Real-time multiplayer Snake game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0f0f1a', color: '#eee', fontFamily: 'monospace' }}>
        {children}
      </body>
    </html>
  );
}
