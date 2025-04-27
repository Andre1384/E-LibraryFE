import { useEffect, useState } from 'react'
import BookTable from '../components/BookTable'
import BookForm from '../components/BookForm'

function ManageBooksPage() {
  const [books, setBooks] = useState([])
  const [editingBook, setEditingBook] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/books')
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const handleAddClick = () => {
    setEditingBook(null)
    setShowForm(true)
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Apakah yakin ingin menghapus buku ini?')) {
      try {
        await fetch(`http://localhost:3000/books/${id}`, {
          method: 'DELETE',
        })
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    }
  }

  const handleSubmit = async (book) => {
    try {
      if (editingBook) {
        // update
        await fetch(`http://localhost:3000/books/${editingBook.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book),
        })
      } else {
        // tambah baru
        await fetch('http://localhost:3000/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book),
        })
      }
      fetchBooks()
      setShowForm(false)
    } catch (error) {
      console.error('Error saving book:', error)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Kelola Buku</h1>

      {!showForm && (
        <div className="mb-4">
          <button
            onClick={handleAddClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          >
            Tambah Buku
          </button>
        </div>
      )}

      {showForm ? (
        <BookForm
          onSubmit={handleSubmit}
          initialData={editingBook}
          onCancel={handleCancel}
        />
      ) : (
        <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  )
}

export default ManageBooksPage
