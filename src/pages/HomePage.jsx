import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to e-Library</h1>
        <p className="text-gray-600 mb-8">
          Platform perpustakaan online untuk mengakses buku favoritmu kapan saja, di mana saja.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
