import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/bookshelf.jpg')" }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black bg-opacity-50 -z-20" />

      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 relative z-10">
        <h1 className="text-2xl font-bold">e-Library</h1>
        <nav className="space-x-6 font-medium">
          <a href="#" className="hover:text-orange-300">Home</a>
          <a href="#" className="hover:text-orange-300">About</a>
          <a href="#" className="hover:text-orange-300">Books</a>
          <a href="#" className="hover:text-orange-300">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-8 py-32 space-y-8 relative z-10">
        <h2 className="text-5xl font-bold">Online Library</h2>
        <p className="text-lg max-w-xl">
          Platform perpustakaan digital dengan koleksi lengkap. Akses buku favoritmu kapan saja, di mana saja.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold shadow"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  )
}

export default HomePage
