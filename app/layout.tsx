import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'GREEN WHEELS // Hyper-Electric Scooter',
  description:
    'Experience the next-generation electric scrollytelling teardown of the Green Wheels Apex-1. Hydroformed aluminum unibody, 4.2 kWh HyperCell battery, 160km range, and explosive acceleration.',
  keywords: [
    'Green Wheels',
    'EV Scooter',
    'Apex-1',
    'Electric Scooter',
    'Scrollytelling',
    'Hyper-Electric',
    'Electric Mobility',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b0d10',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0b0d10] text-slate-100 antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
