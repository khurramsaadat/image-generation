"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  FaImage, 
  FaMagic, 
  FaRocket, 
  FaShieldAlt, 
  FaStar, 
  FaArrowRight,
  FaPlay,
  FaCheck,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { 
  MdAutoAwesome, 
  MdPhotoCamera, 
  MdBrush, 
  MdSpeed 
} from "react-icons/md";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <FaImage className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">ImageGeneration</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="#examples" className="text-muted-foreground hover:text-foreground transition-colors">Examples</a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
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
                className="text-foreground hover:text-cyan-400 transition-colors p-2"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-background/95 backdrop-blur-lg">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/40">
                  <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                      <FaImage className="text-white text-sm" />
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">ImageGeneration</span>
                  </Link>
                  <button
                    onClick={closeMobileMenu}
                    className="text-foreground hover:text-cyan-400 transition-colors p-2"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-4">
                  <a 
                    href="#examples" 
                    onClick={closeMobileMenu}
                    className="text-2xl font-semibold text-muted-foreground hover:text-cyan-400 transition-all duration-300 animate-fade-in-up"
                  >
                    Examples
                  </a>
                  <a 
                    href="#features" 
                    onClick={closeMobileMenu}
                    className="text-2xl font-semibold text-muted-foreground hover:text-cyan-400 transition-all duration-300 animate-fade-in-up delay-100"
                  >
                    Features
          </a>
          <a
                    href="#pricing" 
                    onClick={closeMobileMenu}
                    className="text-2xl font-semibold text-muted-foreground hover:text-cyan-400 transition-all duration-300 animate-fade-in-up delay-200"
                  >
                    Pricing
                  </a>
                  
                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col gap-4 mt-8 animate-fade-in-up delay-300">
                    <SignedOut>
                      <SignInButton>
                        <Button variant="outline" size="lg" className="w-48" onClick={closeMobileMenu}>
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button size="lg" className="w-48 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700" onClick={closeMobileMenu}>
                          Get Started
                        </Button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <Link href="/dashboard" onClick={closeMobileMenu}>
                        <Button size="lg" className="w-48 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                          Dashboard
                        </Button>
                      </Link>
                      <div className="flex justify-center">
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-12 h-12"
                            }
                          }}
                        />
                      </div>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-200"></div>
          <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-800"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-6 bg-linear-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300">
              <MdAutoAwesome className="mr-1 animate-spin-slow" />
              Powered by GPT-4 Vision
            </Badge>
          </div>
          
          <div className="animate-fade-in-up delay-200">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
              Transform Your Images with AI Magic
          </h1>
          </div>
          
          <div className="animate-fade-in-up delay-400">
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Turn any photo into stunning Ghibli-style artwork or action-packed illustrations. 
              Professional AI image transformation in seconds.
            </p>
          </div>
          
          <div className="animate-fade-in-up delay-600">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <SignedOut>
                <SignUpButton>
                  <Button size="lg" className="text-lg px-8 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                    <FaRocket className="mr-2" />
                    Start Creating
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="text-lg px-8 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                    <FaRocket className="mr-2" />
                    Start Creating
                  </Button>
                </Link>
              </SignedIn>
              <Button size="lg" variant="outline" className="text-lg px-8 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transform hover:scale-105 transition-all duration-300">
                <FaPlay className="mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Enhanced Hero Image Showcase */}
          <div className="animate-fade-in-up delay-800">
            <div className="relative max-w-5xl mx-auto">
              {/* Floating decoration elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full animate-float opacity-60"></div>
              <div className="absolute -top-4 -right-8 w-8 h-8 bg-linear-to-r from-indigo-400 to-purple-500 rounded-full animate-float delay-300 opacity-60"></div>
              <div className="absolute -bottom-6 -left-8 w-10 h-10 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full animate-float delay-700 opacity-60"></div>
              <div className="absolute -bottom-4 -right-6 w-6 h-6 bg-linear-to-r from-teal-400 to-emerald-500 rounded-full animate-float delay-1000 opacity-60"></div>
              
              <div className="bg-linear-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:scale-[1.02]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Original Image */}
                  <div className="group">
                    <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl aspect-square flex items-center justify-center border border-slate-700 transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                      <div className="text-center">
                        <div className="relative">
                          <MdPhotoCamera className="text-5xl text-slate-400 mb-3 mx-auto animate-pulse" />
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Original Photo</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow with animation */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <FaArrowRight className="text-3xl text-cyan-400 animate-pulse" />
                      <div className="absolute inset-0 text-3xl text-cyan-400 animate-ping opacity-30">
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Transformed */}
                  <div className="group">
                    <div className="bg-linear-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-xl aspect-square flex items-center justify-center border border-cyan-500/40 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                      <div className="text-center">
                        <div className="relative">
                          <FaMagic className="text-5xl text-cyan-400 mb-3 mx-auto animate-bounce" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full animate-ping"></div>
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-teal-400 rounded-full animate-ping delay-300"></div>
                        </div>
                        <p className="text-sm text-cyan-300 font-medium">AI Transformed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats or features below */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div className="animate-fade-in-up delay-1000">
                    <div className="text-2xl font-bold text-cyan-400">2.5s</div>
                    <div className="text-xs text-muted-foreground">Avg Process Time</div>
                  </div>
                  <div className="animate-fade-in-up delay-1200">
                    <div className="text-2xl font-bold text-emerald-400">4K</div>
                    <div className="text-xs text-muted-foreground">HD Quality</div>
                  </div>
                  <div className="animate-fade-in-up delay-1400">
                    <div className="text-2xl font-bold text-indigo-400">99%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See the Magic in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform ordinary photos into extraordinary Ghibli-style artwork with our AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Example 1 */}
            <div className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className="aspect-square bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <MdPhotoCamera className="text-4xl text-slate-400 mb-2 mx-auto" />
                      <p className="text-sm text-slate-400">Portrait Photo</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaArrowRight className="text-white text-2xl animate-pulse" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Portrait → Ghibli Character</h3>
                  <p className="text-sm text-muted-foreground">Transform portraits into magical Ghibli-style characters with dreamy backgrounds</p>
                </CardContent>
              </Card>
            </div>

            {/* Example 2 */}
            <div className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className="aspect-square bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <MdPhotoCamera className="text-4xl text-slate-400 mb-2 mx-auto" />
                      <p className="text-sm text-slate-400">Landscape Photo</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaArrowRight className="text-white text-2xl animate-pulse" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Landscape → Magical World</h3>
                  <p className="text-sm text-muted-foreground">Turn ordinary landscapes into enchanted Ghibli-style worlds with floating islands</p>
                </CardContent>
              </Card>
            </div>

            {/* Example 3 */}
            <div className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className="aspect-square bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <MdPhotoCamera className="text-4xl text-slate-400 mb-2 mx-auto" />
                      <p className="text-sm text-slate-400">Pet Photo</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaArrowRight className="text-white text-2xl animate-pulse" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Pet → Magical Companion</h3>
                  <p className="text-sm text-muted-foreground">Transform your pets into adorable Ghibli-style magical creatures and companions</p>
                </CardContent>
              </Card>
            </div>

            {/* Example 4 */}
            <div className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className="aspect-square bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <MdPhotoCamera className="text-4xl text-slate-400 mb-2 mx-auto" />
                      <p className="text-sm text-slate-400">City Photo</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaArrowRight className="text-white text-2xl animate-pulse" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Urban → Fantasy City</h3>
                  <p className="text-sm text-muted-foreground">Convert modern cityscapes into fantastical Ghibli-inspired floating cities</p>
                </CardContent>
              </Card>
            </div>

            {/* Example 5 */}
            <div className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className="aspect-square bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <MdPhotoCamera className="text-4xl text-slate-400 mb-2 mx-auto" />
                      <p className="text-sm text-slate-400">Nature Photo</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaArrowRight className="text-white text-2xl animate-pulse" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Nature → Enchanted Forest</h3>
                  <p className="text-sm text-muted-foreground">Transform natural scenes into mystical Ghibli-style enchanted forests</p>
                </CardContent>
              </Card>
            </div>

            {/* Example 6 */}
            <div className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className="aspect-square bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <MdPhotoCamera className="text-4xl text-slate-400 mb-2 mx-auto" />
                      <p className="text-sm text-slate-400">Action Photo</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaArrowRight className="text-white text-2xl animate-pulse" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Action → Epic Adventure</h3>
                  <p className="text-sm text-muted-foreground">Turn action shots into epic Ghibli-style adventure scenes with dynamic effects</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <SignedOut>
              <SignUpButton>
                <Button size="lg" className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  Try It Free Now
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  Start Creating
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced image transformation capabilities powered by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <MdBrush className="text-white text-xl" />
                </div>
                <CardTitle>Ghibli Style Transform</CardTitle>
                <CardDescription>
                  Convert your photos into beautiful Studio Ghibli-inspired artwork with magical details and dreamy aesthetics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <CardTitle>Action-Packed Style</CardTitle>
                <CardDescription>
                  Transform portraits into dynamic action figures with explosive backgrounds and heroic poses.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <MdSpeed className="text-white text-xl" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Get professional-quality results in seconds. No waiting, no complex editing required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your images are processed securely and never stored. Complete privacy guaranteed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <FaStar className="text-white text-xl" />
                </div>
                <CardTitle>HD Quality</CardTitle>
                <CardDescription>
                  Generate high-resolution images perfect for printing, social media, or professional use.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <MdAutoAwesome className="text-white text-xl" />
                </div>
                <CardTitle>Smart AI</CardTitle>
                <CardDescription>
                  Powered by GPT-4 Vision for intelligent image understanding and artistic transformation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Transform your images in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload Your Image</h3>
              <p className="text-muted-foreground">
                Simply drag and drop or click to upload any photo from your device
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Style</h3>
              <p className="text-muted-foreground">
                Select from Ghibli-style artwork or action-packed transformations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Download & Share</h3>
              <p className="text-muted-foreground">
                Get your transformed image in HD quality, ready to share or print
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your image transformation needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-2 border-border/50 hover:border-cyan-500/50 transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-linear-to-r from-slate-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStar className="text-white text-xl" />
                </div>
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <CardDescription className="text-lg">
                  Perfect for trying out our AI magic
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">5 image transformations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Standard quality (1080p)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">2 AI styles available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Community support</span>
                  </div>
                </div>
                <SignedOut>
                  <SignUpButton>
                    <Button className="w-full mt-6" variant="outline">
                      Get Started Free
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard">
                    <Button className="w-full mt-6" variant="outline">
                      Current Plan
                    </Button>
                  </Link>
                </SignedIn>
              </CardContent>
            </Card>

            {/* Monthly Plan */}
            <Card className="relative border-2 border-cyan-500 hover:border-cyan-400 transition-all duration-300 scale-105 shadow-lg shadow-cyan-500/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-linear-to-r from-cyan-500 to-blue-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaRocket className="text-white text-xl" />
                </div>
                <CardTitle className="text-2xl mb-2">Pro Monthly</CardTitle>
                <CardDescription className="text-lg">
                  For regular creators and professionals
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Unlimited transformations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">4K HD quality</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">All AI styles & filters</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Priority processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Email support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Commercial license</span>
                  </div>
                </div>
                <SignedOut>
                  <SignUpButton>
                    <Button className="w-full mt-6 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                      Start Pro Trial
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Button className="w-full mt-6 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Upgrade to Pro
                  </Button>
                </SignedIn>
              </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card className="relative border-2 border-border/50 hover:border-emerald-500/50 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-1">
                  Best Value
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <CardTitle className="text-2xl mb-2">Pro Yearly</CardTitle>
                <CardDescription className="text-lg">
                  Best value for power users
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$100</span>
                  <span className="text-muted-foreground">/year</span>
                  <div className="text-sm text-emerald-400 mt-1">
                    Save $20 (17% off)
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Everything in Pro Monthly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Priority customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Early access to new features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">API access (coming soon)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">Custom AI model training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <span className="text-sm">2 months free</span>
                  </div>
                </div>
                <SignedOut>
                  <SignUpButton>
                    <Button className="w-full mt-6 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                      Start Yearly Plan
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Button className="w-full mt-6 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                    Upgrade to Yearly
                  </Button>
                </SignedIn>
              </CardContent>
            </Card>
          </div>

          {/* Pricing FAQ */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <div>
                <h4 className="font-medium mb-2">Can I change plans anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and other secure payment methods through Stripe.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Is there a free trial?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! Every new user gets 5 free transformations to try our AI magic before choosing a paid plan.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Do you offer refunds?</h4>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements - Same as Hero */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements - Same as Hero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-40 left-20 w-5 h-5 bg-indigo-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-500"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Images?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using AI to bring their images to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <SignedOut>
              <Input 
                placeholder="Enter your email address" 
                className="max-w-sm"
              />
              <SignUpButton>
                <Button size="lg" className="px-8">
                  Get Started Free
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="px-8">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              <span>5 free transformations</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* Column 1 - Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <FaImage className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">ImageGeneration</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                Transform your photos into stunning AI-generated artwork with the power of advanced machine learning.
              </p>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors cursor-pointer">
                  <span className="text-xs">𝕏</span>
                </div>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors cursor-pointer">
                  <span className="text-xs">in</span>
                </div>
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition-colors cursor-pointer">
                  <span className="text-xs">ig</span>
                </div>
              </div>
            </div>

            {/* Column 2 - Product */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#examples" className="hover:text-foreground transition-colors">Examples</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Partners</a></li>
              </ul>
            </div>

            {/* Column 4 - Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Bug Reports</a></li>
              </ul>
            </div>

            {/* Column 5 - Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GDPR</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              <p>&copy; 2025 ImageGeneration. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Made with ❤️ for creators</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
