import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'ResumeBoost AI - Your Resume, Optimized by AI',
  description: 'Upload your resume or generate a new one with AI that passes ATS systems and increases your interview chances.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased selection:bg-indigo-500/30`}>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{ className: 'border shadow-lg text-foreground bg-white' }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

