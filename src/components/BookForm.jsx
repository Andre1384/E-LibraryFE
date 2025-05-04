import { useState, useEffect } from 'react'

function BookForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setAuthor(initialData.author)
      setDescription(initialData.description)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, author, description })
    setTitle('')
    setAuthor('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <div>
        <label className="block mb-1 font-medium">Judul</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Penulis</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
          {initialData ? 'Update' : 'Tambah'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-semibold"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

export default BookForm
