import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('') // Reset error state sebelum login

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)

        // Decode JWT token
        const [, payload] = data.token.split('.')
        const decodedPayload = JSON.parse(atob(payload))

        console.log('Isi token:', decodedPayload)

        if (decodedPayload.role === 'admin') {
          navigate('/admin/dashboard') // Arahkan ke dashboard admin
        } else {
          navigate('/dashboard') // Arahkan ke dashboard user biasa
        }
      } else {
        setError(data.error || 'Login failed') // Menampilkan error dari response
      }
    } catch (err) {
      console.error(err)
      setError('Login error, please try again later.')
    } finally {
      setLoading(false) // Menghentikan loading setelah proses selesai
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Menampilkan error */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold"
            disabled={loading} // Disable button saat loading
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Tambahkan navigasi ke Register */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
