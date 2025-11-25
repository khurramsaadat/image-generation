"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaEdit, FaUpload, FaDownload, FaSpinner, FaTimes } from "react-icons/fa";

interface ImageEditorProps {
  onImageEdited?: (imageUrl: string) => void;
}

export default function ImageEditor({ onImageEdited }: ImageEditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<"ghibli" | "action" | "none">("none");
  const [loading, setLoading] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setUploadedImage(result);
      setEditedImage(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = async () => {
    if (!uploadedImage) {
      setError("Please upload an image first");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter edit instructions");
      return;
    }

    setLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedImage,
          prompt: prompt.trim(),
          style: style !== "none" ? style : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Failed to edit image";
        const errorDetails = data.details ? `\n\nDetails: ${data.details}` : "";
        const errorHint = data.hint ? `\n\nHint: ${data.hint}` : "";
        const errorSteps = data.steps ? `\n\n${data.steps.join("\n")}` : "";
        throw new Error(errorMsg + errorDetails + errorHint + errorSteps);
      }

      if (data.image) {
        setEditedImage(data.image);
        if (onImageEdited) {
          onImageEdited(data.image);
        }
      } else {
        throw new Error("No edited image returned from API");
      }
    } catch (err: any) {
      setError(err.message || "Failed to edit image");
      console.error("Edit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setEditedImage(null);
    setPrompt("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaEdit className="text-emerald-400" />
          Edit Image with AI
        </CardTitle>
        <CardDescription>
          Upload an image and transform it with AI-powered editing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload Image</label>
          {!uploadedImage ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500/50 transition-colors"
            >
              <FaUpload className="mx-auto text-2xl text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-auto max-h-64 object-contain"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        {uploadedImage && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Edit Instructions</label>
              <Textarea
                placeholder="e.g., Transform this into a Studio Ghibli style artwork, add magical elements..."
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
              onClick={handleEdit}
              disabled={loading || !prompt.trim()}
              className="w-full bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {loading ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Editing...
                </>
              ) : (
                <>
                  <FaEdit className="mr-2" />
                  Edit Image
                </>
              )}
            </Button>
          </>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm whitespace-pre-line">
            {error}
          </div>
        )}

        {editedImage && (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Edited Image</h4>
              <div className="relative rounded-lg overflow-hidden border border-border">
                <img
                  src={editedImage}
                  alt="Edited"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleDownload(editedImage, `edited-image-${Date.now()}.png`)}
                variant="outline"
                className="flex-1"
              >
                <FaDownload className="mr-2" />
                Download Edited
              </Button>
              {uploadedImage && (
                <Button
                  onClick={() => handleDownload(uploadedImage, `original-image-${Date.now()}.png`)}
                  variant="outline"
                  className="flex-1"
                >
                  <FaDownload className="mr-2" />
                  Download Original
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

