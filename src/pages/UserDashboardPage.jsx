import { useEffect, useState } from 'react'

function UserDashboardPage() {
  const [books, setBooks] = useState([])
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')

        const response = await fetch(`http://localhost:3000/books?page=${currentPage}&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Gagal mengambil data buku')
        }

        const result = await response.json()
        const booksList = result.books || []

        const booksWithStatus = booksList.map(book => ({
          ...book,
          status: book.stock > 0 ? 'available' : 'borrowed',
        }))

        setBooks(booksWithStatus)
        setTotalPages(result.totalPages || 1)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await fetch('http://localhost:3000/borrows/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Gagal mengambil data buku yang dipinjam')
        }

        const result = await response.json()
        setBorrowedBooks(result || [])
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchBooks()
    fetchBorrowedBooks()
  }, [currentPage])

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

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mb-10">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Buku yang sedang dipinjam */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Buku yang Sedang Dipinjam</h2>
        {borrowedBooks.length === 0 ? (
          <p>Belum ada buku yang sedang dipinjam.</p>
        ) : (
          <ul className="space-y-2">
            {borrowedBooks.map((borrow) => (
              <li key={borrow.id} className="border p-4 rounded shadow bg-white">
                <h3 className="text-lg font-semibold">{borrow.book.title}</h3>
                <p className="text-gray-600">Author: {borrow.book.author}</p>
                <p className="text-gray-800">Tanggal Pinjam: {new Date(borrow.borrowDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserDashboardPage
