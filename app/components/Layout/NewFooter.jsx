import React from 'react';
import { Link } from 'react-router';
import { IMAGE_ASSETS } from '~/lib/imagePaths';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const NewFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1D1E20] overflow-hidden">
      {/* Decorative top accent — thin brand-color stripe */}
      <div className="flex h-[3px]">
        <div className="flex-1 bg-[#0063AD]" />
        <div className="flex-1 bg-[#E00B0B]" />
        <div className="flex-1 bg-[#6813AA]" />
      </div>

      {/* Big CTA banner */}
      <div className="border-b border-white/15">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <Link
            to="/products"
            className="group flex items-end md:items-center justify-between gap-6 !no-underline hover:!no-underline !text-white"
          >
            <div className="relative inline-block isolate">
              <h2 className="relative z-10 text-[clamp(2rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-tight text-white">
                Elevate Your
                <br />
                <span className="bg-gradient-to-r from-[#0063AD] via-[#E00B0B] to-[#6813AA] bg-clip-text text-transparent">
                  Daily Ritual
                </span>
              </h2>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 bottom-[0.15em] z-0 h-[0.2em] origin-left scale-x-0 rounded-full bg-white/22 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </div>
            <motion.div
              className="flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-full border-2 border-white/40 text-white group-hover:bg-white group-hover:text-[#1D1E20] transition-all duration-400"
              whileHover={{ rotate: 45 }}
            >
              <ArrowUpRight className="h-5 w-5 md:h-7 md:w-7" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5 flex flex-col gap-5">
            <Link to="/" className="inline-block w-fit !text-white">
              <img
                src={IMAGE_ASSETS.branding.logo.avif}
                alt="Salt & Spirit"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Essential Rituals for Modern Living. Bringing peace and clarity to every home.
            </p>
          </div>

          {/* Shop */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#E00B0B] mb-5">
              Shop
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Pure Blue', to: '/products/pure-blue' },
                { label: 'Vital Red', to: '/products/vital-red' },
                { label: 'Hydra-Rest', to: '/products/hydra-rest' },
                { label: 'Mix', to: '/products/mix' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="!text-white text-sm font-medium hover:!text-white transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#0063AD] mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Products', to: '/products' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="!text-white text-sm font-medium hover:!text-white transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#6813AA] mb-5">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Privacy Policy', to: '/policies/privacy-policy' },
                { label: 'Terms of Service', to: '/policies/terms-of-service' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="!text-white text-sm font-medium hover:!text-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/50 text-xs tracking-wide">
            &copy;{currentYear} Salt &amp; Spirit. All rights reserved.
            <span className="ml-3 text-[9px] uppercase tracking-[0.25em] text-white/35">
              Made by BlinkStudio
            </span>
          </p>

          <a
            href="https://www.instagram.com/saltandspirit__/"
            target="_blank"
            rel="nofollow noopener"
            className="group flex items-center gap-2 !text-white hover:!text-white transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
            <span className="text-xs font-medium">@saltandspirit__</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
