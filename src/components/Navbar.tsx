"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { 
  FaImage, 
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <FaImage className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">ImageGen</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="/#examples" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a>
              <a href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" size="sm">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                  <Button size="sm">Get Started</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-foreground hover:text-cyan-400 transition-colors p-2 relative w-8 h-8 flex items-center justify-center"
                aria-label="Toggle mobile menu"
              >
                <div className="relative w-6 h-6">
                  {/* Animated Burger Icon */}
                  <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
                  }`}></span>
                  <span className={`absolute left-0 top-2.5 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute left-0 top-4 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay using Portal */}
        {isMobileMenuOpen && mounted && createPortal(
          <div 
            className="fixed inset-0 z-[999999]"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
              zIndex: 999999
            }}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-float"></div>
              <div className="absolute top-40 right-16 w-24 h-24 bg-blue-500/10 rounded-full blur-lg animate-float delay-1000"></div>
              <div className="absolute bottom-32 left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl animate-float delay-500"></div>
              <div className="absolute bottom-20 right-8 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-float delay-700"></div>
            </div>
            <div className="relative flex flex-col h-full w-full overflow-y-auto mobile-menu-scroll">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 backdrop-blur-sm">
                    <FaImage className="text-white text-lg" />
                  </div>
                  <span className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">ImageGen</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <div className="relative w-6 h-6">
                    <span className="absolute left-0 top-1 w-6 h-0.5 bg-white rotate-45 translate-y-2 transition-all duration-300"></span>
                    <span className="absolute left-0 top-4 w-6 h-0.5 bg-white -rotate-45 -translate-y-2 transition-all duration-300"></span>
                  </div>
                </button>
                </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 flex flex-col items-center space-y-4 px-8 py-8 overflow-y-auto min-h-0">

                <a 
                  href="/#examples" 
                  onClick={closeMobileMenu}
                  className="group w-full max-w-sm"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 animate-fade-in-up">
                    <div className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 text-center">
                      Examples
                    </div>
                    <div className="text-xs text-white/70 text-center mt-1">View our gallery</div>
                  </div>
                </a>

                <a 
                  href="/#features" 
                  onClick={closeMobileMenu}
                  className="group w-full max-w-sm"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 animate-fade-in-up delay-100">
                    <div className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 text-center">
                      Features
                    </div>
                    <div className="text-xs text-white/70 text-center mt-1">Discover capabilities</div>
                  </div>
                </a>

                <Link 
                  href="/pricing" 
                  onClick={closeMobileMenu}
                  className="group w-full max-w-sm"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20 animate-fade-in-up delay-200">
                    <div className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors duration-300 text-center">
                      Pricing
                    </div>
                    <div className="text-xs text-white/70 text-center mt-1">Choose your plan</div>
                  </div>
                </Link>
                
                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-4 mt-8 w-full max-w-sm animate-fade-in-up delay-300">
                  <SignedOut>
                    <SignInButton>
                      <Button variant="outline" size="lg" className="w-full text-lg h-14 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-cyan-400 transition-all duration-300">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button size="lg" className="w-full text-lg h-14 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
                        Get Started Free
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "w-16 h-16 shadow-lg shadow-cyan-500/25"
                          }
                        }}
                      />
                      <div className="text-white/70 text-sm">Welcome back!</div>
                    </div>
                  </SignedIn>
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="p-6 border-t border-white/10 backdrop-blur-sm bg-white/5">
                <div className="text-center text-white/50 text-sm">
                  Transform your images with AI magic ✨
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </nav>
    </>
  );
}
