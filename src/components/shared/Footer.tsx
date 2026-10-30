"use client"

import Link from "next/link";
import { Aperture, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
    { name: "Contact Support", href: "/contact" },
  ];

  const categories = [
    { name: "Photography Studios", href: "/studios?category=photography" },
    { name: "Cinema Sound Stages", href: "/studios?category=cinema" },
    { name: "Podcast Lounges", href: "/studios?category=podcast" },
    { name: "Music Recording Suites", href: "/studios?category=music" },
    { name: "Art & Creative Workshops", href: "/studios?category=art" },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* 1. Branding & Mission Statement */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-sm backdrop-blur-sm">
                <Aperture className="h-7 w-7 text-[#00A8E8]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#00A8E8] via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                CreativeNest
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              CreativeNest is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. We connect visionary creators with the perfect creative spaces.
            </p>
          </div>

          {/* 2. Quick Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-[#00A8E8]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Popular Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Popular Categories</h3>
            <ul className="flex flex-col gap-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-slate-400 transition-colors hover:text-[#00A8E8]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter Input */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Stay in the loop</h3>
            <p className="mb-4 text-sm text-slate-400">
              Get the latest updates on new studios, exclusive offers, and creator tips.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus-visible:ring-[#00A8E8]"
                required
              />
              <Button type="submit" size="icon" className="bg-[#00A8E8] hover:bg-[#0090c9] text-white">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright, Terms & Socials */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 sm:flex-row">

          {/* Copyright & Terms */}
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <p className="text-xs text-slate-500">
              &copy; {currentYear} CreativeNest Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/terms" className="hover:text-[#00A8E8] transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-[#00A8E8] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social Links using React Icons */}
          <div className="flex items-center gap-5">
            <Link href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00A8E8] transition-colors" aria-label="X">
              <FaXTwitter className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00A8E8] transition-colors" aria-label="Instagram">
              <FaInstagram className="h-5 w-5" />
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00A8E8] transition-colors" aria-label="YouTube">
              <FaYoutube className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00A8E8] transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="h-5 w-5" />
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00A8E8] transition-colors" aria-label="Facebook">
              <FaFacebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
