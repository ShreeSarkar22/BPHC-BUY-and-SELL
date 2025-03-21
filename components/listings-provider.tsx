"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Listing } from "@/types/listing"

interface ListingsContextType {
  listings: Listing[]
  addListing: (listing: Listing) => void
  deleteListing: (id: string) => void
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined)

export function Listings({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([])

  // Load listings from localStorage on mount
  useEffect(() => {
    const savedListings = localStorage.getItem("listings")
    if (savedListings) {
      try {
        setListings(JSON.parse(savedListings))
      } catch (error) {
        console.error("Failed to parse listings from localStorage", error)
      }
    }
  }, [])

  // Save listings to localStorage when they change
  useEffect(() => {
    if (listings.length > 0) {
      localStorage.setItem("listings", JSON.stringify(listings))
    }
  }, [listings])

  const addListing = (listing: Listing) => {
    setListings((prev) => [listing, ...prev])
  }

  const deleteListing = (id: string) => {
    setListings((prev) => {
      const updated = prev.filter((listing) => listing.id !== id)
      // If we deleted all listings, clear localStorage
      if (updated.length === 0) {
        localStorage.removeItem("listings")
      }
      return updated
    })
  }

  return <ListingsContext.Provider value={{ listings, addListing, deleteListing }}>{children}</ListingsContext.Provider>
}

export function useListings() {
  const context = useContext(ListingsContext)
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingsProvider")
  }
  return context
}

