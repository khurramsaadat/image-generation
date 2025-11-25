"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  FaArrowRight,
  FaPlay,
  FaCheck,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { 
  MdAutoAwesome, 
  MdPhotoCamera, 
  MdBrush, 
  MdSpeed 
} from "react-icons/md";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const examples = [
    {
      title: "Portrait → Ghibli Character",
      description: "Transform portraits into magical Ghibli-style characters with dreamy backgrounds",
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Landscape → Magical World", 
      description: "Turn ordinary landscapes into enchanted Ghibli-style worlds with floating islands",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: "Pet → Magical Companion",
      description: "Transform your pets into adorable Ghibli-style magical creatures and companions", 
      gradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      title: "Urban → Fantasy City",
      description: "Convert modern cityscapes into fantastical Ghibli-inspired floating cities",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Nature → Enchanted Forest",
      description: "Transform natural scenes into mystical Ghibli-style enchanted forests",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Action → Epic Adventure",
      description: "Turn action shots into epic Ghibli-style adventure scenes with dynamic effects",
      gradient: "from-red-500/20 to-pink-500/20"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % examples.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [examples.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % examples.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + examples.length) % examples.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

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
                    <FaArrowRight className="mr-2" />
                    Start Creating
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="text-lg px-8 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                    <FaArrowRight className="mr-2" />
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
        </div>
      </section>

      {/* Examples Section with Carousel */}
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
          
          {/* Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {examples.map((example, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="mx-4 overflow-hidden border-0 shadow-lg">
                      <div className="relative">
                        <div className={`aspect-video bg-linear-to-br ${example.gradient} flex items-center justify-center`}>
                          <div className="text-center">
                            <MdPhotoCamera className="text-6xl text-muted-foreground mb-4 mx-auto animate-pulse" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FaArrowRight className="text-white text-3xl animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-semibold mb-4">{example.title}</h3>
                        <p className="text-muted-foreground text-lg">{example.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-background transition-all duration-300 shadow-lg"
            >
              <FaChevronLeft className="text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-background transition-all duration-300 shadow-lg"
            >
              <FaChevronRight className="text-foreground" />
            </button>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {examples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-cyan-500 scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
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
                  <FaArrowRight className="text-white text-xl" />
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

      <Footer />
    </div>
  );
}
