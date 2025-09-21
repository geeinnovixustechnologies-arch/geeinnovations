"use client";

import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function FormField({
  label,
  required = false,
  error,
  children,
  helpText,
  maxLength,
  currentLength,
  className = "",
}) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {maxLength && (
          <span className="text-gray-500 ml-2 text-xs">
            ({currentLength || 0}/{maxLength})
          </span>
        )}
      </label>

      {/* Input */}
      <div className="relative">
        {children}

        {/* Validation Icon */}
        {error && showError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
        {!error && currentLength > 0 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        )}
      </div>

      {/* Help Text */}
      {helpText && !error && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}

      {/* Error Message */}
      {error && showError && (
        <div className="flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}
