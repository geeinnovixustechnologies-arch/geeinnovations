import Joi from "joi";

// User validation schemas
export const userValidation = {
  register: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name cannot exceed 100 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
    phone: Joi.string()
      .pattern(/^[\+]?[1-9][\d]{0,15}$/)
      .optional()
      .messages({
        "string.pattern.base": "Please enter a valid phone number",
      }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
        "any.required": "Please confirm your password",
      }),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string()
      .pattern(/^[\+]?[1-9][\d]{0,15}$/)
      .optional()
      .messages({
        "string.pattern.base": "Please enter a valid phone number",
      }),
    avatar: Joi.string().uri().optional(),
  }),
};

// Project validation schemas
export const projectValidation = {
  create: Joi.object({
    title: Joi.string().min(5).max(200).required().messages({
      "string.min": "Title must be at least 5 characters long",
      "string.max": "Title cannot exceed 200 characters",
      "any.required": "Title is required",
    }),
    description: Joi.string().min(50).max(2000).required().messages({
      "string.min": "Description must be at least 50 characters long",
      "string.max": "Description cannot exceed 2000 characters",
      "any.required": "Description is required",
    }),
    shortDescription: Joi.string().min(20).max(300).required().messages({
      "string.min": "Short description must be at least 20 characters long",
      "string.max": "Short description cannot exceed 300 characters",
      "any.required": "Short description is required",
    }),
    category: Joi.string()
      .valid(
        "AI/ML",
        "Blockchain",
        "Web Development",
        "Mobile Development",
        "IoT",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "Other"
      )
      .required()
      .messages({
        "any.only": "Please select a valid category",
        "any.required": "Category is required",
      }),
    domain: Joi.array()
      .items(
        Joi.string().valid(
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",
          "Computer Vision",
          "NLP",
          "Blockchain",
          "Web3",
          "Frontend",
          "Backend",
          "Full Stack",
          "Mobile",
          "IoT",
          "Data Analytics",
          "Cybersecurity",
          "Cloud",
          "DevOps"
        )
      )
      .min(1)
      .required()
      .messages({
        "array.min": "Please select at least one domain",
        "any.required": "Domain is required",
      }),
    technologies: Joi.array()
      .items(Joi.string().min(1).max(50))
      .min(1)
      .required()
      .messages({
        "array.min": "Please specify at least one technology",
        "any.required": "Technologies are required",
      }),
    pricing: Joi.object({
      basePrice: Joi.number().min(0).required().messages({
        "number.min": "Price cannot be negative",
        "any.required": "Base price is required",
      }),
      currency: Joi.string().valid("USD", "INR", "EUR", "GBP").default("USD"),
      discountedPrice: Joi.number().min(0).optional(),
      isOnSale: Joi.boolean().default(false),
    }).required(),
    features: Joi.array()
      .items(Joi.string().min(5).max(100))
      .min(1)
      .required()
      .messages({
        "array.min": "Please specify at least one feature",
        "any.required": "Features are required",
      }),
    difficulty: Joi.string()
      .valid("beginner", "intermediate", "advanced")
      .default("intermediate"),
    estimatedTime: Joi.string().min(1).max(100).required().messages({
      "any.required": "Estimated time is required",
    }),
    requirements: Joi.array().items(Joi.string().min(5).max(200)).optional(),
    deliverables: Joi.array().items(Joi.string().min(5).max(200)).optional(),
    demoUrl: Joi.string().uri().optional().messages({
      "string.uri": "Please enter a valid URL",
    }),
    downloadUrl: Joi.string().uri().optional().messages({
      "string.uri": "Please enter a valid URL",
    }),
    tags: Joi.array().items(Joi.string().min(1).max(30)).optional(),
    seo: Joi.object({
      metaTitle: Joi.string().max(60).optional(),
      metaDescription: Joi.string().max(160).optional(),
      keywords: Joi.array().items(Joi.string().min(1).max(30)).optional(),
    }).optional(),
    isActive: Joi.boolean().optional(),
    isFeatured: Joi.boolean().optional(),
  }),

  update: Joi.object({
    title: Joi.string().min(5).max(200).optional(),
    description: Joi.string().min(50).max(2000).optional(),
    shortDescription: Joi.string().min(20).max(300).optional(),
    category: Joi.string()
      .valid(
        "AI/ML",
        "Blockchain",
        "Web Development",
        "Mobile Development",
        "IoT",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "Other"
      )
      .optional(),
    domain: Joi.array()
      .items(
        Joi.string().valid(
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",
          "Computer Vision",
          "NLP",
          "Blockchain",
          "Web3",
          "Frontend",
          "Backend",
          "Full Stack",
          "Mobile",
          "IoT",
          "Data Analytics",
          "Cybersecurity",
          "Cloud",
          "DevOps"
        )
      )
      .min(1)
      .optional(),
    technologies: Joi.array()
      .items(Joi.string().min(1).max(50))
      .min(1)
      .optional(),
    pricing: Joi.object({
      basePrice: Joi.number().min(0).optional(),
      currency: Joi.string().valid("USD", "INR", "EUR", "GBP").optional(),
      discountedPrice: Joi.number().min(0).optional(),
      isOnSale: Joi.boolean().optional(),
    }).optional(),
    features: Joi.array().items(Joi.string().min(5).max(100)).min(1).optional(),
    difficulty: Joi.string()
      .valid("beginner", "intermediate", "advanced")
      .optional(),
    estimatedTime: Joi.string().min(1).max(100).optional(),
    requirements: Joi.array().items(Joi.string().min(5).max(200)).optional(),
    deliverables: Joi.array().items(Joi.string().min(5).max(200)).optional(),
    demoUrl: Joi.string().uri().optional().messages({
      "string.uri": "Please enter a valid URL",
    }),
    downloadUrl: Joi.string().uri().optional().messages({
      "string.uri": "Please enter a valid URL",
    }),
    tags: Joi.array().items(Joi.string().min(1).max(30)).optional(),
    isActive: Joi.boolean().optional(),
    isFeatured: Joi.boolean().optional(),
  }),
};

// Service validation schemas
export const serviceValidation = {
  create: Joi.object({
    name: Joi.string().min(5).max(200).required().messages({
      "string.min": "Service name must be at least 5 characters long",
      "string.max": "Service name cannot exceed 200 characters",
      "any.required": "Service name is required",
    }),
    description: Joi.string().min(50).max(2000).required().messages({
      "string.min": "Description must be at least 50 characters long",
      "string.max": "Description cannot exceed 2000 characters",
      "any.required": "Description is required",
    }),
    shortDescription: Joi.string().min(20).max(300).required().messages({
      "string.min": "Short description must be at least 20 characters long",
      "string.max": "Short description cannot exceed 300 characters",
      "any.required": "Short description is required",
    }),
    category: Joi.string()
      .valid(
        "Academic Projects",
        "Research Publication",
        "Assignment Writing",
        "Consulting",
        "Training",
        "Support"
      )
      .required()
      .messages({
        "any.only": "Please select a valid category",
        "any.required": "Category is required",
      }),
    subcategory: Joi.string().min(1).max(100).optional(),
    pricing: Joi.object({
      startingPrice: Joi.number().min(0).required().messages({
        "number.min": "Price cannot be negative",
        "any.required": "Starting price is required",
      }),
      currency: Joi.string().valid("USD", "INR", "EUR", "GBP").default("USD"),
      pricingModel: Joi.string()
        .valid("fixed", "hourly", "per_page", "per_project")
        .default("fixed"),
      customPricing: Joi.boolean().default(false),
    }).required(),
    features: Joi.array()
      .items(Joi.string().min(5).max(100))
      .min(1)
      .required()
      .messages({
        "array.min": "Please specify at least one feature",
        "any.required": "Features are required",
      }),
    deliveryTime: Joi.string().min(1).max(100).required().messages({
      "any.required": "Delivery time is required",
    }),
    requirements: Joi.array().items(Joi.string().min(5).max(200)).optional(),
    deliverables: Joi.array().items(Joi.string().min(5).max(200)).optional(),
    tags: Joi.array().items(Joi.string().min(1).max(30)).optional(),
  }),

  update: Joi.object({
    name: Joi.string().min(5).max(200).optional(),
    description: Joi.string().min(50).max(2000).optional(),
    shortDescription: Joi.string().min(20).max(300).optional(),
    category: Joi.string()
      .valid(
        "Academic Projects",
        "Research Publication",
        "Assignment Writing",
        "Consulting",
        "Training",
        "Support"
      )
      .optional(),
    subcategory: Joi.string().min(1).max(100).optional(),
    pricing: Joi.object({
      startingPrice: Joi.number().min(0).optional(),
      currency: Joi.string().valid("USD", "INR", "EUR", "GBP").optional(),
      pricingModel: Joi.string()
        .valid("fixed", "hourly", "per_page", "per_project")
        .optional(),
      customPricing: Joi.boolean().optional(),
    }).optional(),
    features: Joi.array().items(Joi.string().min(5).max(100)).min(1).optional(),
    deliveryTime: Joi.string().min(1).max(100).optional(),
    requirements: Joi.array().items(Joi.string().min(5).max(200)).optional(),
    deliverables: Joi.array().items(Joi.string().min(5).max(200)).optional(),
    tags: Joi.array().items(Joi.string().min(1).max(30)).optional(),
    isActive: Joi.boolean().optional(),
    isPopular: Joi.boolean().optional(),
  }),
};

// Order validation schemas
export const orderValidation = {
  create: Joi.object({
    orderType: Joi.string()
      .valid("project", "service", "custom")
      .required()
      .messages({
        "any.only": "Please select a valid order type",
        "any.required": "Order type is required",
      }),
    projectId: Joi.when("orderType", {
      is: "project",
      then: Joi.string().required().messages({
        "any.required": "Project ID is required for project orders",
      }),
      otherwise: Joi.string().optional(),
    }),
    serviceId: Joi.when("orderType", {
      is: "service",
      then: Joi.string().required().messages({
        "any.required": "Service ID is required for service orders",
      }),
      otherwise: Joi.string().optional(),
    }),
    requirements: Joi.string().min(20).max(5000).required().messages({
      "string.min": "Requirements must be at least 20 characters long",
      "string.max": "Requirements cannot exceed 5000 characters",
      "any.required": "Requirements are required",
    }),
    budget: Joi.number().min(0).required().messages({
      "number.min": "Budget cannot be negative",
      "any.required": "Budget is required",
    }),
    currency: Joi.string().valid("USD", "INR", "EUR", "GBP").default("USD"),
    deadline: Joi.date().min("now").required().messages({
      "date.min": "Deadline must be in the future",
      "any.required": "Deadline is required",
    }),
    priority: Joi.string()
      .valid("low", "normal", "high", "urgent")
      .default("normal"),
  }),

  update: Joi.object({
    status: Joi.string()
      .valid(
        "pending",
        "confirmed",
        "in_progress",
        "review",
        "completed",
        "cancelled",
        "refunded"
      )
      .optional(),
    priority: Joi.string().valid("low", "normal", "high", "urgent").optional(),
    requirements: Joi.string().min(20).max(5000).optional(),
    budget: Joi.number().min(0).optional(),
    deadline: Joi.date().min("now").optional(),
    estimatedDelivery: Joi.date().optional(),
    assignedTo: Joi.string().optional(),
  }),
};

// Contact form validation schema (simple)
export const contactValidation = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name cannot exceed 100 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
    message: Joi.string().min(5).max(2000).required().messages({
      "string.min": "Message must be at least 5 characters long",
      "string.max": "Message cannot exceed 2000 characters",
      "any.required": "Message is required",
    }),
  }),
};

// Inquiry validation schemas
export const inquiryValidation = {
  create: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name cannot exceed 100 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
    phone: Joi.string()
      .pattern(/^[\+]?[1-9][\d]{0,15}$/)
      .optional()
      .messages({
        "string.pattern.base": "Please enter a valid phone number",
      }),
    company: Joi.string().min(1).max(100).optional(),
    subject: Joi.string().min(5).max(200).required().messages({
      "string.min": "Subject must be at least 5 characters long",
      "string.max": "Subject cannot exceed 200 characters",
      "any.required": "Subject is required",
    }),
    message: Joi.string().min(20).max(2000).required().messages({
      "string.min": "Message must be at least 20 characters long",
      "string.max": "Message cannot exceed 2000 characters",
      "any.required": "Message is required",
    }),
    inquiryType: Joi.string()
      .valid("general", "project", "service", "support", "partnership", "other")
      .default("general"),
    projectType: Joi.string()
      .valid(
        "AI/ML",
        "Blockchain",
        "Web Development",
        "Mobile Development",
        "IoT",
        "Data Science",
        "Cybersecurity",
        "Cloud Computing",
        "Other"
      )
      .optional(),
    budget: Joi.object({
      min: Joi.number().min(0).optional(),
      max: Joi.number().min(0).optional(),
      currency: Joi.string().valid("USD", "INR", "EUR", "GBP").default("USD"),
    }).optional(),
    timeline: Joi.string()
      .valid(
        "asap",
        "1-2_weeks",
        "1_month",
        "2-3_months",
        "3-6_months",
        "6+_months",
        "flexible"
      )
      .optional(),
  }),
};

// Testimonial validation schemas
export const testimonialValidation = {
  create: Joi.object({
    clientName: Joi.string().min(2).max(100).required().messages({
      "string.min": "Client name must be at least 2 characters long",
      "string.max": "Client name cannot exceed 100 characters",
      "any.required": "Client name is required",
    }),
    clientEmail: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Client email is required",
    }),
    clientTitle: Joi.string().min(1).max(100).optional(),
    clientCompany: Joi.string().min(1).max(100).optional(),
    rating: Joi.number().min(1).max(5).required().messages({
      "number.min": "Rating must be at least 1",
      "number.max": "Rating cannot exceed 5",
      "any.required": "Rating is required",
    }),
    review: Joi.string().min(10).max(1000).required().messages({
      "string.min": "Review must be at least 10 characters long",
      "string.max": "Review cannot exceed 1000 characters",
      "any.required": "Review is required",
    }),
    projectTitle: Joi.string().min(1).max(200).optional(),
    projectCategory: Joi.string().min(1).max(100).optional(),
  }),
};

// File upload validation
export const fileValidation = {
  image: Joi.object({
    name: Joi.string().required(),
    size: Joi.number()
      .max(10 * 1024 * 1024)
      .required()
      .messages({
        // 10MB
        "number.max": "Image size cannot exceed 10MB",
      }),
    type: Joi.string()
      .valid(
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml"
      )
      .required()
      .messages({
        "any.only": "Only JPEG, PNG, GIF, WebP, and SVG images are allowed",
      }),
  }),

  document: Joi.object({
    name: Joi.string().required(),
    size: Joi.number()
      .max(50 * 1024 * 1024)
      .required()
      .messages({
        // 50MB
        "number.max": "Document size cannot exceed 50MB",
      }),
    type: Joi.string()
      .valid(
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/rtf"
      )
      .required()
      .messages({
        "any.only": "Only PDF, DOC, DOCX, TXT, and RTF documents are allowed",
      }),
  }),

  excel: Joi.object({
    name: Joi.string().required(),
    size: Joi.number()
      .max(10 * 1024 * 1024)
      .required()
      .messages({
        // 10MB
        "number.max": "Excel file size cannot exceed 10MB",
      }),
    type: Joi.string()
      .valid(
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv"
      )
      .required()
      .messages({
        "any.only": "Only XLS, XLSX, and CSV files are allowed",
      }),
  }),
};

// Validation helper function
export function validateData(data, schema) {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return {
      isValid: false,
      errors,
      data: null,
    };
  }

  return {
    isValid: true,
    errors: [],
    data: value,
  };
}
