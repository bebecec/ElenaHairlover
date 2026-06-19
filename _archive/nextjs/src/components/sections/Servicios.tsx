export default function Servicios() {
  const servicios = [
    {
      title: "Medicina Estética",
      description: "Tratamientos personalizados orientados a rejuvenecer y armonizar el rostro de forma natural, incluyendo neuromoduladores y bioestimuladores.",
      link: "/servicios/medicina-estetica"
    },
    {
      title: "Rellenos Labiales",
      description: "Armonización y volumen labial respetando la anatomía individual con ácido hialurónico de la más alta calidad clínica.",
      link: "/servicios/rellenos-labiales"
    },
    {
      title: "Tratamientos Faciales",
      description: "Protocolos avanzados de regeneración, hidratación profunda y luminosidad adaptados a las necesidades específicas de tu piel.",
      link: "/servicios/tratamientos-faciales"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-body text-xs uppercase tracking-widest text-[#B8A89A]">Nuestros Tratamientos</span>
          <h2 className="font-display font-light text-4xl md:text-5xl text-[#1A1A18] mt-2">Servicios Exclusivos</h2>
          <div className="h-[1px] w-20 bg-[#C9CBA7] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((srv, index) => (
            <div
              key={index}
              className="bg-[#FAFAF8] p-10 border border-[#1A1A18]/5 shadow-[0_4px_24px_rgba(26,26,24,0.04)] hover:shadow-[0_4px_24px_rgba(26,26,24,0.08)] hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-2xl text-[#1A1A18] mb-4">{srv.title}</h3>
                <p className="font-body text-sm text-[#1A1A18]/70 leading-relaxed mb-8">{srv.description}</p>
              </div>
              <a
                href={srv.link}
                className="font-body text-xs uppercase tracking-widest text-[#B8A89A] hover:text-[#1A1A18] transition-colors inline-flex items-center group"
              >
                Saber Más
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
