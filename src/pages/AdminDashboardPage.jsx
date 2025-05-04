import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboardPage() {
  const navigate = useNavigate()
  const [totalBooks, setTotalBooks] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const booksResponse = await fetch('http://localhost:3000/api/books')
      const booksData = await booksResponse.json()

      const usersResponse = await fetch('http://localhost:3000/api/users')
      const usersData = await usersResponse.json()

      setTotalBooks(booksData.length)
      setTotalUsers(usersData.length)
    } catch (error) {
      console.error('Gagal memuat data dashboard:', error)
    }
  }

  const handleManageBooks = () => {
    navigate('/admin/manage-books')
  }

  const handleManageUsers = () => {
    navigate('/admin/manage-users')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Manajemen Buku */}
        <div className="bg-white rounded shadow p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">Manajemen Buku</h2>
          <p className="text-gray-600 mb-2">Total Buku: {totalBooks}</p>
          <p className="text-gray-600 mb-4">
            Tambahkan, edit, atau hapus data buku di sistem.
          </p>
          <button
            onClick={handleManageBooks}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Kelola Buku
          </button>
        </div>

        {/* Card 2: Manajemen User */}
        <div className="bg-white rounded shadow p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4">Manajemen User</h2>
          <p className="text-gray-600 mb-2">Total User: {totalUsers}</p>
          <p className="text-gray-600 mb-4">
            Lihat daftar user, kelola hak akses, dan lainnya.
          </p>
          <button
            onClick={handleManageUsers}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Kelola User
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
