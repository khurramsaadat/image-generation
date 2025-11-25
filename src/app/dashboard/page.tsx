import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaImage, FaUpload, FaHistory, FaCog } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your AI image transformation workspace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upload New Image */}
          <Card className="border-dashed border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUpload className="text-white text-xl" />
              </div>
              <CardTitle>Upload New Image</CardTitle>
              <CardDescription>
                Transform your photos with AI magic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Choose Image
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transformations */}
          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHistory className="text-white text-xl" />
              </div>
              <CardTitle>Recent Transformations</CardTitle>
              <CardDescription>
                View your latest AI creations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Gallery
              </Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCog className="text-white text-xl" />
              </div>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Customize your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">0</div>
              <div className="text-sm text-muted-foreground">Images Transformed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">5</div>
              <div className="text-sm text-muted-foreground">Free Credits Remaining</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-2">Pro</div>
              <div className="text-sm text-muted-foreground">Account Type</div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
