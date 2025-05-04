import { useEffect, useState } from 'react'

function UserDashboardPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Gagal mengambil data buku')
        }

        const result = await response.json()

        // Karena BE ngirim: { books: [...], currentPage, totalPages, totalBooks }
        const booksList = result.books

        // Cek stock, jika stock > 0 maka available, else borrowed
        const booksWithStatus = booksList.map(book => ({
          ...book,
          status: book.stock > 0 ? 'available' : 'borrowed',
        }))

        setBooks(booksWithStatus)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const handleBorrow = async (bookId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/borrows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Gagal meminjam buku')
      }

      alert('Berhasil meminjam buku!')
      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
      alert(error.message)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Daftar Buku</h1>
      {books.length === 0 ? (
        <p>Tidak ada buku tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border rounded p-4 shadow bg-white">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600 mb-2">Author: {book.author}</p>
              <p className="text-gray-800">{book.description}</p>

              <p className="mt-2 text-sm">
                Status:{' '}
                {book.status === 'available' ? (
                  <span className="text-green-600 font-semibold">Available</span>
                ) : (
                  <span className="text-red-600 font-semibold">Borrowed</span>
                )}
              </p>

              <button
                className={`mt-4 w-full ${
                  book.status === 'available'
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white px-4 py-2 rounded font-semibold`}
                onClick={() => handleBorrow(book.id)}
                disabled={book.status !== 'available'}
              >
                {book.status === 'available' ? 'Pinjam' : 'Tidak Tersedia'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDashboardPage
