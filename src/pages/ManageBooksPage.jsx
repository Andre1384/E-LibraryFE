import { useEffect, useState } from 'react'
import BookTable from '../components/BookTable'
import BookForm from '../components/BookForm'

function ManageBooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingBook, setEditingBook] = useState(null)

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/books', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error('Gagal mengambil buku:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleAddOrUpdate = async (bookData) => {
    try {
      const token = localStorage.getItem('token')
      const url = editingBook
        ? `http://localhost:3000/books/${editingBook.id}`
        : 'http://localhost:3000/books'
      const method = editingBook ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      })

      if (!response.ok) throw new Error('Gagal menyimpan buku')

      fetchBooks()
      setEditingBook(null)
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin mau menghapus buku ini?')) return
    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchBooks()
    } catch (error) {
      console.error(error)
      alert('Gagal menghapus buku')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manajemen Buku</h1>
      <BookForm
        onSubmit={handleAddOrUpdate}
        initialData={editingBook}
        onCancel={() => setEditingBook(null)}
      />
      <div className="mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BookTable
            books={books}
            onEdit={(book) => setEditingBook(book)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default ManageBooksPage
