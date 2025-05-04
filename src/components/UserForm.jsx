import { useState, useEffect } from 'react'

function UserForm({ onSubmit, initialData, onCancel }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username)
      setRole(initialData.role)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ username, password, role })
    setUsername('')
    setPassword('')
    setRole('user')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
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
      {!initialData && (
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
      )}
      <div>
        <label className="block mb-1 font-medium">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
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

export default UserForm
