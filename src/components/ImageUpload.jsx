"use client";

import { useState, useRef } from "react";
import { Upload, X, Eye, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ImageUpload({
  images = [],
  onImagesChange,
  maxImages = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (files) => {
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    const newImages = [...images];

    try {
      for (const file of files) {
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
          toast.error(
            `Invalid file type: ${file.name}. Only JPEG, PNG, and WebP are allowed.`
          );
          continue;
        }

        // Validate file size
        if (file.size > maxSize) {
          toast.error(`File too large: ${file.name}. Maximum size is 5MB.`);
          continue;
        }

        // Upload file
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload/image", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          newImages.push({
            url: result.data.url,
            alt: file.name.split(".")[0],
            isPrimary: newImages.length === 0, // First image is primary by default
          });
        } else {
          toast.error(`Failed to upload ${file.name}: ${result.message}`);
        }
      }

      onImagesChange(newImages);
      if (newImages.length > images.length) {
        toast.success(
          `${newImages.length - images.length} image(s) uploaded successfully`
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFileSelect(files);
    e.target.value = ""; // Reset input
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);

    // If we removed the primary image, make the first remaining image primary
    if (images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }

    onImagesChange(newImages);
    toast.success("Image removed");
  };

  const setPrimaryImage = (index) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onImagesChange(newImages);
    toast.success("Primary image updated");
  };

  const updateImageAlt = (index, alt) => {
    const newImages = [...images];
    newImages[index].alt = alt;
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Upload Project Images
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop images here, or click to select files
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Maximum {maxImages} images, 5MB each. Supported: JPEG, PNG, WebP
        </p>
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxImages}
          variant="outline"
        >
          {uploading ? "Uploading..." : "Select Images"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes.join(",")}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-md"
                  />

                  {/* Primary Badge */}
                  {image.isPrimary && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Primary
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-6 w-6 p-0"
                        onClick={() => setPrimaryImage(index)}
                        disabled={image.isPrimary}
                        title="Set as primary"
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                        title="Remove image"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Alt Text Input */}
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => updateImageAlt(index, e.target.value)}
                  placeholder="Image description"
                  className="w-full mt-2 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Count */}
      {images.length > 0 && (
        <p className="text-sm text-gray-600">
          {images.length} of {maxImages} images uploaded
        </p>
      )}
    </div>
  );
}
