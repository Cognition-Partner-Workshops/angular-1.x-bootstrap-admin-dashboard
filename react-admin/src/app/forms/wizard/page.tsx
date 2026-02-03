"use client";

import React, { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardStep {
  id: number;
  title: string;
  description: string;
}

const steps: WizardStep[] = [
  { id: 1, title: "Personal Info", description: "Enter your personal details" },
  { id: 2, title: "Product Info", description: "Select your product preferences" },
  { id: 3, title: "Shipment", description: "Choose shipping options" },
  { id: 4, title: "Confirmation", description: "Review and confirm" },
];

export default function FormWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    productType: "",
    quantity: 1,
    features: [] as string[],
    shippingMethod: "standard",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.includes(feature)
        ? formData.features.filter((f) => f !== feature)
        : [...formData.features, feature],
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert("Form submitted successfully!");
    setCurrentStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      productType: "",
      quantity: 1,
      features: [],
      shippingMethod: "standard",
      address: "",
      city: "",
      zipCode: "",
    });
  };

  return (
    <div>
      <ContentTop title="Form Wizard" />

      <Panel>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                      currentStep > step.id
                        ? "bg-[#90b900] text-white"
                        : currentStep === step.id
                        ? "bg-[#209e91] text-white"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-800">{step.title}</p>
                    <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 mx-4 rounded",
                      currentStep > step.id ? "bg-[#90b900]" : "bg-gray-200"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="min-h-[300px]">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Product Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Type *
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent bg-white"
                >
                  <option value="">Select product type</option>
                  <option value="basic">Basic Package</option>
                  <option value="standard">Standard Package</option>
                  <option value="premium">Premium Package</option>
                  <option value="enterprise">Enterprise Package</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Additional Features
                </label>
                <div className="space-y-2">
                  {["Priority Support", "Extended Warranty", "Training Sessions", "Custom Branding"].map(
                    (feature) => (
                      <label key={feature} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="w-4 h-4 rounded border-gray-300 text-[#209e91] focus:ring-[#209e91]"
                        />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Shipment Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Shipping Method
                </label>
                <div className="space-y-2">
                  {[
                    { value: "standard", label: "Standard Shipping (5-7 days)", price: "Free" },
                    { value: "express", label: "Express Shipping (2-3 days)", price: "$9.99" },
                    { value: "overnight", label: "Overnight Shipping (1 day)", price: "$19.99" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.value}
                          checked={formData.shippingMethod === method.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 border-gray-300 text-[#209e91] focus:ring-[#209e91]"
                        />
                        <span className="text-sm text-gray-700">{method.label}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{method.price}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter your full address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter ZIP code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Order Confirmation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Personal Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500">Name:</span>{" "}
                        <span className="text-gray-800">{formData.firstName} {formData.lastName}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Email:</span>{" "}
                        <span className="text-gray-800">{formData.email}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Product Details</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500">Product:</span>{" "}
                        <span className="text-gray-800 capitalize">{formData.productType || "Not selected"}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Quantity:</span>{" "}
                        <span className="text-gray-800">{formData.quantity}</span>
                      </p>
                      {formData.features.length > 0 && (
                        <p className="text-sm">
                          <span className="text-gray-500">Features:</span>{" "}
                          <span className="text-gray-800">{formData.features.join(", ")}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Shipping Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500">Method:</span>{" "}
                        <span className="text-gray-800 capitalize">{formData.shippingMethod}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Address:</span>{" "}
                        <span className="text-gray-800">{formData.address || "Not provided"}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">City:</span>{" "}
                        <span className="text-gray-800">{formData.city || "Not provided"}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">ZIP:</span>{" "}
                        <span className="text-gray-800">{formData.zipCode || "Not provided"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={cn(
              "px-6 py-2 rounded-lg transition-colors",
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            Previous
          </button>
          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#90b900] text-white rounded-lg hover:bg-[#7a9d00] transition-colors"
            >
              Submit Order
            </button>
          )}
        </div>
      </Panel>
    </div>
  );
}
