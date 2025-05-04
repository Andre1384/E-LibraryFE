import { useEffect, useState } from 'react'
import { BookOpen, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboardPage() {
  const [totalBooks, setTotalBooks] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.warn('Token tidak ditemukan. Arahkan ke halaman login.')
        navigate('/login')
        return
      }

      try {
        // Fetch total books
        const booksResponse = await fetch('http://localhost:3000/books', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const booksData = await booksResponse.json()

        if (!booksResponse.ok) {
          throw new Error(booksData.error || 'Gagal mengambil data buku')
        }

        // Fetch users
        const usersResponse = await fetch('http://localhost:3000/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const usersData = await usersResponse.json()

        if (!usersResponse.ok) {
          throw new Error(usersData.error || 'Gagal mengambil data pengguna')
        }

        setTotalBooks(booksData.totalBooks ?? booksData.books?.length ?? 0)
        setTotalUsers(usersData.length)
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error.message)
      }
    }

    fetchData()
  }, [navigate])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <BookOpen className="text-blue-600 w-8 h-8" />
            <div>
              <p className="text-gray-500 text-sm">Total Buku</p>
              <p className="text-xl font-semibold">{totalBooks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <Users className="text-green-600 w-8 h-8" />
            <div>
              <p className="text-gray-500 text-sm">Total Pengguna</p>
              <p className="text-xl font-semibold">{totalUsers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
