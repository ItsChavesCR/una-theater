export default function ShowsSection() {
  const currentShows = [
    {
      id: 1,
      title: "Hamlet",
      author: "William Shakespeare",
      dates: "15-30 de Abril, 2025",
      description: "La clásica tragedia del Príncipe de Dinamarca, atrapado entre la venganza y la indecisión.",
      image: "https://www.aboutespanol.com/thmb/9WfNbe9KEQzeFO9WnYjO5UFDr6w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-575395737-56a5a5b63df78cf772894060.jpg",
      price: "₡15,000 - ₡25,000",
    },
    {
      id: 2,
      title: "El Zoológico de Cristal",
      author: "Tennessee Williams",
      dates: "5-20 de Abril, 2025",
      description:
        "Una conmovedora obra de memoria que profundiza en las complejas relaciones de la familia Wingfield.",
      image: "https://www.elaquelarre.com.mx/wp-content/uploads/2018/05/El_zoologico_de_cristal_1.jpg",
      price: "₡12,000 - ₡22,000",
    },
    {
      id: 3,
      title: "Sueño de una Noche de Verano",
      author: "William Shakespeare",
      dates: "1-15 de Mayo, 2025",
      description: "Una comedia mágica de amor, travesuras y transformación ambientada en un bosque encantado.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Study_for_The_Quarrel_of_Oberon_and_Titania.jpg/330px-Study_for_The_Quarrel_of_Oberon_and_Titania.jpg",
      price: "₡10,000 - ₡20,000",
    },
  ]

  return (
    <section id="shows" className="py-16 bg-gray-850">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-400">Espectáculos Actuales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentShows.map((show) => (
            <div
              key={show.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-transform hover:scale-105"
            >
              <img src={show.image || "/placeholder.svg"} alt={show.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-red-300">{show.title}</h3>
                <p className="text-gray-400 mb-2">por {show.author}</p>
                <p className="text-gray-300 mb-4">{show.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{show.dates}</span>
                  <span className="text-emerald-400 text-sm">{show.price}</span>
                </div>
                <div className="mt-4 text-right">
                  <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded text-sm transition-colors">
                    Reservar Entradas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Ver Todos los Espectáculos
          </button>
        </div>
      </div>
    </section>
  )
}
