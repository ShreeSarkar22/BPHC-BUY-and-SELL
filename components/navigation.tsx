"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingBag } from "lucide-react"

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <ShoppingBag size={24} />
            BUY and SELL
          </Link>

          <button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            <ul>
              <li>
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/create" onClick={() => setMenuOpen(false)}>
                  Post a Listing
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <Link href="/create">
              <button className="button button-primary">
                <ShoppingBag size={16} className="mr-2" />
                Post a Listing
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

