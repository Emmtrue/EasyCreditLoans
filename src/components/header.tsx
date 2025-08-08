'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Contact' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
              Mwananchi Credit
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={`${link.href}-${link.label}`} href={link.href} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Button onClick={() => setMobileMenuOpen(true)} variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-primary">
                Mwananchi Credit
              </Link>
              <Button onClick={() => setMobileMenuOpen(false)} variant="ghost" size="icon">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={`${link.href}-${link.label}-mobile`} href={link.href} className="text-lg font-medium text-gray-700 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Button asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
