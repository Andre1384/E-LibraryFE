function BookTable({ books, onEdit, onDelete }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Judul</th>
              <th className="py-2 px-4">Penulis</th>
              <th className="py-2 px-4">Deskripsi</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="py-2 px-4 text-center">{book.id}</td>
                <td className="py-2 px-4">{book.title}</td>
                <td className="py-2 px-4">{book.author}</td>
                <td className="py-2 px-4">{book.description}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default BookTable
  