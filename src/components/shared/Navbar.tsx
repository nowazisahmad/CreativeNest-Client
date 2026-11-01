"use client";

import Link from "next/link";
import { Aperture, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense, type ReactElement, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" }, 
  { href: "/about", label: "About Us" },
];

function NavbarContent(): ReactElement {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const user = session?.user;
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("#")) return false; 
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Aperture className="h-7 w-7 text-[#00A8E8]" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            CreativeNest
          </span>
        </Link>

        {/* Desktop Navigation Links (hidden on mobile) */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-[#00A8E8]",
                  isActive(link.href)
                    ? "font-medium text-[#00A8E8]" 
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side: Auth / Profile */}
        <div className="flex items-center gap-4">
          
          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/login" className="text-sm transition-colors hover:text-[#00A8E8]">Login</Link>
                <Link href="/signup" className="text-sm font-medium bg-[#00A8E8] text-white px-4 py-2 rounded-md hover:bg-[#0090c9] transition-colors">Register</Link>
              </>
            ) : (
              <Popover>
  <PopoverTrigger
    render={
      <button className="flex items-center gap-2 rounded-full border p-1 pr-3 transition-colors hover:bg-accent focus:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image as string} alt={user.name} />
          <AvatarFallback className="bg-[#00A8E8]/10 text-[#00A8E8] text-xs font-semibold">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden sm:inline-block">
          {user.name}
        </span>
      </button>
    }
  />
  
  <PopoverContent className="w-56 p-2" align="end">
    <div className="flex items-center gap-3 px-2 py-2 mb-2 border-b border-border">
      <Avatar className="h-9 w-9">
        <AvatarImage src={user.image as string} alt={user.name} />
        <AvatarFallback className="bg-[#00A8E8]/10 text-[#00A8E8]">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Signed in as</span>
        <span className="text-sm font-medium truncate max-w-32">{user.name}</span>
      </div>
    </div>

    <div className="flex flex-col gap-0.5">
      <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-[#00A8E8] transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        Dashboard
      </Link>
      <Link href="/add-studio" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-[#00A8E8] transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
        Add New Studio
      </Link>
      <Link href="/my-listings" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-[#00A8E8] transition-colors">
         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        My Studio Listings
      </Link>
      <Link href="/my-bookings" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-[#00A8E8] transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        My Bookings
      </Link>
    </div>

    <div className="mt-1 pt-1 border-t border-border">
      <button 
        onClick={() => authClient.signOut()} 
        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        Logout
      </button>
    </div>
  </PopoverContent>
</Popover>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-[#00A8E8] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-4 shadow-lg absolute w-full">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={cn(
                    "block text-sm transition-colors hover:text-[#00A8E8]",
                    isActive(link.href)
                      ? "font-medium text-[#00A8E8]"
                      : "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            {!user ? (
              <>
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-center py-2 rounded-md border hover:bg-muted transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-center py-2 rounded-md bg-[#00A8E8] text-white hover:bg-[#0090c9] transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/dashboard" className="text-sm py-1.5 hover:text-[#00A8E8]">Dashboard</Link>
                <Link href="/add-studio" className="text-sm py-1.5 hover:text-[#00A8E8]">Add New Studio</Link>
                <Link href="/my-listings" className="text-sm py-1.5 hover:text-[#00A8E8]">My Studio Listings</Link>
                <Link href="/my-bookings" className="text-sm py-1.5 hover:text-[#00A8E8]">My Bookings</Link>
                <button 
                  onClick={() => authClient.signOut()}
                  className="text-sm py-1.5 text-left text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 border-b bg-background"></div>}>
      <NavbarContent />
    </Suspense>
  );
}