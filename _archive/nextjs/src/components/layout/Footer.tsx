import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A18] text-[#FAFAF8]/60 py-16 px-6 border-t border-[#FAFAF8]/5 font-body">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display font-light text-2xl tracking-widest text-[#FAFAF8] mb-4">
            ELEGANCE <span className="text-xs tracking-normal align-middle block md:inline md:ml-1">BY STOICA</span>
          </h3>
          <p className="text-xs leading-relaxed max-w-xs">
            Experiencia estética premium combinando rigor clínico y lujo sensorial en un ambiente de bienestar y personalización absoluta.
          </p>
        </div>
        <div>
          <h4 className="text-[#FAFAF8] text-xs uppercase tracking-widest mb-4">Navegación</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-[#FAFAF8] transition-colors">Inicio</Link>
            </li>
            <li>
              <Link href="/servicios" className="hover:text-[#FAFAF8] transition-colors">Servicios</Link>
            </li>
            <li>
              <Link href="/galeria" className="hover:text-[#FAFAF8] transition-colors">Galería</Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-[#FAFAF8] transition-colors">Nosotros</Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-[#FAFAF8] transition-colors">Contacto</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#FAFAF8] text-xs uppercase tracking-widest mb-4">Contacto</h4>
          <p className="text-xs mb-2">Dirección: [Por definir, Ciudad]</p>
          <p className="text-xs mb-2">Teléfono: [Por definir]</p>
          <p className="text-xs mb-4">Horarios: Lun - Vie: 10:00 - 20:00</p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Elegance by Stoica. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
