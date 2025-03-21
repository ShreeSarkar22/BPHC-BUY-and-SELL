"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useListings } from "@/components/listings-provider"
import type { Listing } from "@/types/listing"
import { ArrowLeft, Package, ShoppingCart, Calendar, Phone, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ListingDetail() {
  const params = useParams()
  const router = useRouter()
  const { listings, deleteListing } = useListings()
  const [listing, setListing] = useState<Listing | null>(null)
  const [showContact, setShowContact] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    if (params.id && listings.length > 0) {
      setIsLoading(true)
      const found = listings.find((item) => item.id === params.id)
      if (found) {
        setListing(found)
      } else {
        router.push("/")
      }
      setIsLoading(false)
    }
  }, [params.id, listings, router])

  const handleDelete = () => {
    if (listing) {
      deleteListing(listing.id)
      setShowDeleteModal(false)
      router.push("/")
    }
  }

  if (isLoading) {
    return <div className="loading">Loading listing details...</div>
  }

  if (!listing) {
    return <div className="loading">Listing not found</div>
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <>
      <div className="listing-detail">
        <Link href="/" className="inline-flex items-center text-primary-color mb-6 hover:underline">
          <ArrowLeft size={16} className="mr-2" />
          Back to listings
        </Link>

        <div className="listing-header">
          <h1>{listing.title}</h1>
          <div className="listing-meta">
            <span className={`listing-type ${listing.type}`}>
              {listing.type === "sell" ? (
                <>
                  <Package size={16} className="mr-1" /> For Sale
                </>
              ) : (
                <>
                  <ShoppingCart size={16} className="mr-1" /> Wanted
                </>
              )}
            </span>
            <span className="listing-price">₹{listing.price.toFixed(2)}</span>
            <span className="listing-date">
              <Calendar size={16} />
              {formatDate(listing.createdAt)}
            </span>
          </div>
        </div>

        <div className="listing-body">
          <div className="listing-description">
            <h2>Description</h2>
            <p>{listing.description}</p>
          </div>

          <div className="listing-contact">
            <h2>Contact Information</h2>
            <p>
              Posted by: <strong>{listing.contactName}</strong>
            </p>

            {!showContact ? (
              <button onClick={() => setShowContact(true)} className="button button-primary w-full mt-4">
                Show Contact Details
              </button>
            ) : (
              <div className="contact-details">
                <p>
                  <Phone size={18} />
                  {listing.contactPhone}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="listing-actions">
          <button onClick={() => router.push("/")} className="button button-outline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Listings
          </button>

          <button onClick={() => setShowDeleteModal(true)} className="button button-danger">
            <Trash2 size={16} className="mr-2" />
            Delete Listing
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Delete Listing</h2>
            </div>
            <div className="modal-body">
              <div className="flex items-center gap-3 mb-4 text-danger-color">
                <AlertTriangle size={24} />
                <p className="text-danger-color font-semibold">This action cannot be undone</p>
              </div>
              <p>Are you sure you want to delete this listing?</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowDeleteModal(false)} className="button button-outline">
                Cancel
              </button>
              <button onClick={handleDelete} className="button button-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

