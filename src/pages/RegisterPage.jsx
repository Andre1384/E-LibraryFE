// RegisterPage.js
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('') // Reset error state sebelum melakukan request

    // Validasi input
    if (password.length < 6) {
      setError('Password harus minimal 6 karakter.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Hanya kirim username dan password
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Register gagal')
      }

      alert('Register berhasil! Silakan login.')
      navigate('/login') // Redirect ke halaman login setelah berhasil register
    } catch (error) {
      console.error(error)
      setError(error.message || 'Register gagal! Username mungkin sudah dipakai.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded font-semibold"
            disabled={loading} // Disable tombol saat proses pendaftaran
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-green-500 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
