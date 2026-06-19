export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#E9CDB4]/30 via-[#FAFAF8] to-[#C9CBA7]/10 pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/principal.png"
          alt="Elegance by Stoica"
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Overlay Frosted Touch */}
        <div className="absolute inset-0 bg-[#FAFAF8]/70 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center animate-fade-in">
        <h1 className="font-display font-light text-5xl md:text-7xl text-[#1A1A18] leading-tight tracking-wide">
          Elegancia Clínica, <br />
          <span className="italic">Resultados Reales</span>
        </h1>
        <p className="font-body text-base md:text-lg mt-6 max-w-lg text-[#1A1A18]/70 tracking-wide">
          Combinamos el rigor de la medicina estética con una experiencia de lujo sensorial personalizada.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="/reserva"
            className="px-10 py-4 bg-[#C9CBA7] text-[#1A1A18] font-body text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-md hover:scale-[1.02] border border-[#1A1A18]/5"
          >
            Obtener Mi Consulta de Cortesía
          </a>
        </div>
      </div>
    </section>
  );
}
