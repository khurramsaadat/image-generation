import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs";
import Link from "next/link";
import { 
  FaStar, 
  FaRocket, 
  FaShieldAlt, 
  FaCheck
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h1>
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
      </div>

      <Footer />
    </div>
  );
}
