export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 text-white py-6 border-t border-red-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2 text-red-500">TEATRO UNA</h2>
            <p className="text-gray-400">El mejor teatro para disfrutar de actuaciones inolvidables</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-red-400">Contacto</h3>
            <address className="not-italic text-gray-400">
              <p>UNA Sede Reginal Chorotega</p>
              <p>Teléfono: (506) 2154-6598</p>
              <p>Correo: info@teatro-una.com</p>
            </address>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} TEATRO UNA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
