"use client";

import Link from "next/link";
import { Aperture } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense, type ReactElement } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

function NavbarContent(): ReactElement {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const user = session?.user;

  const handleSignout = () => {
    authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#00A8E8]/5 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00A8E8]/30 bg-[#00A8E8]/10 shadow-sm">
              <Aperture className="h-7 w-7 text-[#00A8E8]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#00A8E8] via-sky-500 to-blue-600 bg-clip-text text-transparent">
              CreativeNest
            </span>
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative py-1 text-sm font-medium transition-colors hover:text-[#00A8E8]",
                    isActive ? "text-[#00A8E8]" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#00A8E8]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className={cn(
                  "text-sm transition-colors hover:text-[#00A8E8]",
                  pathname === "/login" ? "font-medium text-[#00A8E8]" : "text-muted-foreground"
                )}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0090c9]",
                  "bg-[#00A8E8]"
                )}
              >
                Register
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-transparent p-1 pr-3 transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image as string}
                        alt={user.name}
                      />
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
                    <AvatarImage referrerPolicy="no-referrer" src={user.image as string} alt={user.name} />
                    <AvatarFallback className="bg-[#00A8E8]/10 text-[#00A8E8]">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Signed in as</span>
                    <span className="text-sm font-medium truncate max-w-[130px]">{user.name}</span>
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
                  <button onClick={handleSignout} className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </nav>
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
