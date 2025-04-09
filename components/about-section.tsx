export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-400">Acerca de TEATRO UNA</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-300">Nuestra Historia</h3>
            <p className="text-gray-300 mb-4">
              Fundado en 1985, TEATRO UNA ha sido un referente cultural en nuestra ciudad durante más de tres décadas.
              Lo que comenzó como un pequeño teatro comunitario ha crecido hasta convertirse en uno de los recintos más
              prestigiosos de la región.
            </p>
            <p className="text-gray-300">
              Nuestro teatro ha albergado miles de representaciones, desde obras clásicas hasta producciones modernas,
              manteniendo siempre nuestro compromiso con la excelencia artística y el enriquecimiento cultural.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-300">Nuestro Recinto</h3>
            <p className="text-gray-300 mb-4">
              Nuestras instalaciones de última generación cuentan con una acústica excelente, asientos cómodos y vistas
              sin obstrucciones desde cada asiento. El auditorio principal puede acomodar hasta 500 invitados.
            </p>
            <p className="text-gray-300">
              Además de nuestro escenario principal, contamos con un teatro experimental más pequeño para producciones
              alternativas y un amplio vestíbulo con un bar que sirve refrigerios antes de los espectáculos y durante
              los intermedios.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-center text-red-300">Nuestra Misión</h3>
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            En TEATRO UNA, creemos en el poder transformador de las actuaciones en vivo. Nuestra misión es inspirar,
            entretener y desafiar a nuestro público a través de experiencias teatrales diversas que reflejen nuestra
            comunidad y nuestro mundo.
          </p>
        </div>
      </div>
    </section>
  )
}
