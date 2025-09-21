"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Upload, X, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function NewProjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "",
    pricing: {
      basePrice: "",
      currency: "USD",
    },
    technologies: "",
    demoUrl: "",
    downloadUrl: "",
    images: [],
    isActive: true,
    isFeatured: false,
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "AI/ML",
    "Blockchain",
    "Web Development",
    "Mobile Development",
    "IoT",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Other",
  ];

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleImageUpload = async (files) => {
    if (formData.images.length + files.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    setUploading(true);
    const newImages = [...formData.images];

    try {
      for (const file of files) {
        // Validate file type
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        if (!allowedTypes.includes(file.type)) {
          toast.error(
            `Invalid file type: ${file.name}. Only JPEG, PNG, and WebP are allowed.`
          );
          continue;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
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
            isPrimary: newImages.length === 0, // First image is primary
          });
        } else {
          toast.error(`Failed to upload ${file.name}: ${result.message}`);
        }
      }

      setFormData((prev) => ({ ...prev, images: newImages }));
      if (newImages.length > formData.images.length) {
        toast.success(
          `${
            newImages.length - formData.images.length
          } image(s) uploaded successfully`
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);

    // If we removed the primary image, make the first remaining image primary
    if (formData.images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }

    setFormData((prev) => ({ ...prev, images: newImages }));
    toast.success("Image removed");
  };

  const setPrimaryImage = (index) => {
    const newImages = formData.images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    setFormData((prev) => ({ ...prev, images: newImages }));
    toast.success("Primary image updated");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.shortDescription.trim())
      newErrors.shortDescription = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.pricing.basePrice) newErrors.basePrice = "Price is required";
    if (!formData.technologies.trim())
      newErrors.technologies = "Technologies are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Prepare data for submission
      const submitData = {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim(),
        description: formData.shortDescription.trim(), // Use short description as main description
        category: formData.category,
        domain: [formData.category], // Use category as domain
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech),
        pricing: {
          basePrice: parseFloat(formData.pricing.basePrice),
          currency: formData.pricing.currency,
        },
        images: formData.images,
        demoUrl: formData.demoUrl.trim() || undefined,
        downloadUrl: formData.downloadUrl.trim() || undefined,
        features: [`${formData.category} project`], // Simple feature
        requirements: ["Basic understanding of the technology"], // Simple requirement
        deliverables: ["Complete project files and documentation"], // Simple deliverable
        difficulty: "intermediate", // Default difficulty
        estimatedTime: "1-2 weeks", // Default time
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };

      console.log("Submitting project data:", submitData);

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Project created successfully!");
        router.push("/admin/projects");
      } else {
        console.error("Project creation error:", result);
        toast.error(result.message || "Failed to create project");

        if (result.errors) {
          const fieldErrors = {};
          result.errors.forEach((error) => {
            fieldErrors[error.field] = error.message;
          });
          setErrors(fieldErrors);
        }
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-8">
            You need admin privileges to access this page.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/admin/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create New Project
              </h1>
              <p className="text-gray-600 mt-1">
                Quick project creation for showcasing
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter project title..."
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    handleInputChange("shortDescription", e.target.value)
                  }
                  placeholder="Brief description of the project (2-3 lines)..."
                  rows={3}
                  className={errors.shortDescription ? "border-red-500" : ""}
                />
                {errors.shortDescription && (
                  <p className="text-sm text-red-600">
                    {errors.shortDescription}
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.pricing.basePrice}
                    onChange={(e) =>
                      handleInputChange("pricing.basePrice", e.target.value)
                    }
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={errors.basePrice ? "border-red-500" : ""}
                  />
                  {errors.basePrice && (
                    <p className="text-sm text-red-600">{errors.basePrice}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.pricing.currency}
                    onValueChange={(value) =>
                      handleInputChange("pricing.currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies *</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) =>
                    handleInputChange("technologies", e.target.value)
                  }
                  placeholder="React, Node.js, MongoDB (comma-separated)"
                  className={errors.technologies ? "border-red-500" : ""}
                />
                {errors.technologies && (
                  <p className="text-sm text-red-600">{errors.technologies}</p>
                )}
                <p className="text-xs text-gray-500">
                  Separate multiple technologies with commas
                </p>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">Demo URL (Optional)</Label>
                  <Input
                    id="demoUrl"
                    value={formData.demoUrl}
                    onChange={(e) =>
                      handleInputChange("demoUrl", e.target.value)
                    }
                    placeholder="https://demo.example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="downloadUrl">
                    GitHub/Download URL (Optional)
                  </Label>
                  <Input
                    id="downloadUrl"
                    value={formData.downloadUrl}
                    onChange={(e) =>
                      handleInputChange("downloadUrl", e.target.value)
                    }
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Label>Project Images (Max 3)</Label>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop images here, or click to select files
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Maximum 3 images, 5MB each. Supported: JPEG, PNG, WebP
                  </p>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("imageInput")?.click()
                    }
                    disabled={uploading || formData.images.length >= 3}
                    variant="outline"
                    size="sm"
                  >
                    {uploading ? "Uploading..." : "Select Images"}
                  </Button>
                  <input
                    id="imageInput"
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) =>
                      handleImageUpload(Array.from(e.target.files))
                    }
                    className="hidden"
                  />
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square">
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            className="object-cover rounded-md"
                          />

                          {/* Primary Badge */}
                          {image.isPrimary && (
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
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
                                ★
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
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="isActive" className="text-sm font-medium">
                    Active Project
                  </Label>
                  <p className="text-xs text-gray-500">
                    Make this project visible to users
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleInputChange("isActive", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="isFeatured" className="text-sm font-medium">
                    Featured Project
                  </Label>
                  <p className="text-xs text-gray-500">
                    Highlight this project on the homepage
                  </p>
                </div>
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    handleInputChange("isFeatured", checked)
                  }
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Project
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
