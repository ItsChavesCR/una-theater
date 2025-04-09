"use client"

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="bg-gray-950 text-white p-4 border-b border-red-900 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-red-500">UNA THEATER</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("home")
                }}
                className="hover:text-red-400 transition-colors"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#shows"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("shows")
                }}
                className="hover:text-red-400 transition-colors"
              >
                Espectáculos
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("about")
                }}
                className="hover:text-red-400 transition-colors"
              >
                Acerca de
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("contact")
                }}
                className="hover:text-red-400 transition-colors"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
