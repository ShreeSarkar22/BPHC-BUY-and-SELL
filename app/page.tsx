import ListingsList from "@/components/listings-list"
import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Buy & Sell Items</h1>
        <p>Find what you need or sell what you don't. Connect with students in campus.</p>
        <Link href="/create">
          <button className="button button-primary">
            <ShoppingBag size={18} className="mr-2" />
            Post a Listing
            <ArrowRight size={18} className="ml-2" />
          </button>
        </Link>
      </div>
      <div className="listings-container">
        <h2>Recent Listings</h2>
        <ListingsList />
      </div>
    </div>
  )
}

