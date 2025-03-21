"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useListings } from "@/components/listings-provider"
import { Package, ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateListing() {
  const router = useRouter()
  const { addListing } = useListings()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "sell", // sell or buy
    contactName: "",
    contactPhone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeSelect = (type: "sell" | "buy") => {
    setFormData((prev) => ({ ...prev, type }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create new listing with form data
    addListing({
      id: Date.now().toString(),
      ...formData,
      price: Number.parseFloat(formData.price) || 0,
      createdAt: new Date().toISOString(),
    })

    // Simulate a short delay for better UX
    setTimeout(() => {
      // Redirect to home page
      router.push("/")
    }, 500)
  }

  return (
    <div className="create-listing">
      
      <Link href="/" className="inline-flex items-center text-primary-color mb-6 hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Back to listings
      </Link>

      <h1>Create a New Listing</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Listing Type</label>
          <div className="listing-type-options">
            <div
              className={`type-option ${formData.type === "sell" ? "selected" : ""}`}
              onClick={() => handleTypeSelect("sell")}
            >
              <div className="type-option-icon">
                <Package size={20} />
              </div>
              <div className="type-option-text">I want to sell</div>
              <input
                type="radio"
                name="type"
                value="sell"
                checked={formData.type === "sell"}
                onChange={handleChange}
                className="sr-only"
              />
            </div>

            <div
              className={`type-option ${formData.type === "buy" ? "selected" : ""}`}
              onClick={() => handleTypeSelect("buy")}
            >
              <div className="type-option-icon">
                <ShoppingCart size={20} />
              </div>
              <div className="type-option-text">I want to buy</div>
              <input
                type="radio"
                name="type"
                value="buy"
                checked={formData.type === "buy"}
                onChange={handleChange}
                className="sr-only"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="What are you selling/buying?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Provide details about the item"
            rows={5}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="1"
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactName">Your Name</label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Phone Number</label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
            placeholder="Your phone number"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button button-primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Listing"}
          </button>
          <Link href="/">
            <button type="button" className="button button-outline">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

