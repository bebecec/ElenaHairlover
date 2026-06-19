"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#FAFAF8]/85 backdrop-blur-md border-b border-[#1A1A18]/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="font-display font-light text-2xl tracking-widest text-[#1A1A18]">
          ELEGANCE <span className="text-xs tracking-normal align-middle block md:inline md:ml-1">BY STOICA</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/70 hover:text-[#1A1A18] transition-colors">
            Inicio
          </Link>
          <Link href="/servicios" className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/70 hover:text-[#1A1A18] transition-colors">
            Servicios
          </Link>
          <Link href="/galeria" className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/70 hover:text-[#1A1A18] transition-colors">
            Galería
          </Link>
          <Link href="/nosotros" className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/70 hover:text-[#1A1A18] transition-colors">
            Nosotros
          </Link>
          <Link href="/contacto" className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/70 hover:text-[#1A1A18] transition-colors">
            Contacto
          </Link>
          <Link
            href="/reserva"
            className="px-6 py-2.5 bg-[#C9CBA7] text-[#1A1A18] font-body text-xs uppercase tracking-widest hover:bg-[#B8A89A] transition-colors shadow-sm"
          >
            Reservar Cita
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#1A1A18] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE NAV OVERLAY */}
      {isOpen && (
        <nav className="md:hidden bg-[#FAFAF8] border-b border-[#1A1A18]/5 py-6 px-6 flex flex-col space-y-4 animate-fade-in">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/80 hover:text-[#1A1A18]"
          >
            Inicio
          </Link>
          <Link
            href="/servicios"
            onClick={() => setIsOpen(false)}
            className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/80 hover:text-[#1A1A18]"
          >
            Servicios
          </Link>
          <Link
            href="/galeria"
            onClick={() => setIsOpen(false)}
            className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/80 hover:text-[#1A1A18]"
          >
            Galería
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsOpen(false)}
            className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/80 hover:text-[#1A1A18]"
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            onClick={() => setIsOpen(false)}
            className="font-body text-xs uppercase tracking-widest text-[#1A1A18]/80 hover:text-[#1A1A18]"
          >
            Contacto
          </Link>
          <Link
            href="/reserva"
            onClick={() => setIsOpen(false)}
            className="text-center py-3 bg-[#C9CBA7] text-[#1A1A18] font-body text-xs uppercase tracking-widest"
          >
            Reservar Cita
          </Link>
        </nav>
      )}
    </header>
  );
}
