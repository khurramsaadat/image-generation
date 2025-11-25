"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaImage, FaDownload, FaSpinner, FaMagic } from "react-icons/fa";

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
}

export default function ImageGenerator({ onImageGenerated }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<"ghibli" | "action" | "none">("none");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: style !== "none" ? style : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Failed to generate image";
        const errorDetails = data.details ? `\n\nDetails: ${data.details}` : "";
        const errorHint = data.hint ? `\n\nHint: ${data.hint}` : "";
        const errorSteps = data.steps ? `\n\n${data.steps.join("\n")}` : "";
        throw new Error(errorMsg + errorDetails + errorHint + errorSteps);
      }

      if (data.image) {
        setGeneratedImage(data.image);
        if (onImageGenerated) {
          onImageGenerated(data.image);
        }
      } else {
        throw new Error("No image returned from API");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate image");
      console.error("Generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaImage className="text-cyan-400" />
          Generate Image from Text
        </CardTitle>
        <CardDescription>
          Create stunning images from text prompts using AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter your prompt</label>
          <Textarea
            placeholder="e.g., A serene mountain landscape at sunset with cherry blossoms..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Style (Optional)</label>
          <div className="flex gap-2">
            <Button
              variant={style === "ghibli" ? "default" : "outline"}
              size="sm"
              onClick={() => setStyle(style === "ghibli" ? "none" : "ghibli")}
              className={style === "ghibli" ? "bg-cyan-500 hover:bg-cyan-600" : ""}
            >
              Ghibli Style
            </Button>
            <Button
              variant={style === "action" ? "default" : "outline"}
              size="sm"
              onClick={() => setStyle(style === "action" ? "none" : "action")}
              className={style === "action" ? "bg-red-500 hover:bg-red-600" : ""}
            >
              Action Style
            </Button>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
        >
          {loading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FaMagic className="mr-2" />
              Generate Image
            </>
          )}
        </Button>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm whitespace-pre-line">
            {error}
          </div>
        )}

        {generatedImage && (
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-auto"
              />
            </div>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full"
            >
              <FaDownload className="mr-2" />
              Download Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

