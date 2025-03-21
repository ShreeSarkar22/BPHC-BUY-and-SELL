"use client"

import Link from "next/link"
import { useListings } from "./listings-provider"
import { ShoppingCart, Package } from "lucide-react"

export default function ListingsList() {
  const { listings } = useListings()

  if (listings.length === 0) {
    return (
      <div className="no-listings">
        <p>No listings found. Be the first to post one!</p>
        <Link href="/create">
          <button className="button button-primary">Post a Listing</button>
        </Link>
      </div>
    )
  }

  return (
    <div className="listings-list">
      {listings.map((listing) => (
        <Link href={`/listings/${listing.id}`} key={listing.id} className="block h-full">
          <div className="listing-card">
            <div className="listing-card-content">
              <h3>{listing.title}</h3>
              <p className="listing-description">
                {listing.description.length > 100 ? `${listing.description.substring(0, 100)}...` : listing.description}
              </p>
              <div className="listing-meta">
                <span className={`listing-type ${listing.type}`}>
                  {listing.type === "sell" ? (
                    <>
                      <Package size={14} className="mr-1" /> For Sale
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={14} className="mr-1" /> Wanted
                    </>
                  )}
                </span>
                <span className="listing-price">₹{listing.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

