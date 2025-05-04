function UserTable({ users, onEdit, onDelete }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2 px-4 text-center">{user.id}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4 text-center capitalize">{user.role}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
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
  
  export default UserTable
  