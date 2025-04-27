import { useEffect, useState } from 'react'
import UserTable from '../components/UserTable'
import UserForm from '../components/UserForm'

function ManageUsersPage() {
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleAddClick = () => {
    setEditingUser(null)
    setShowForm(true)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Apakah yakin ingin menghapus user ini?')) {
      try {
        await fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE',
        })
        fetchUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  const handleSubmit = async (user) => {
    try {
      if (editingUser) {
        // update
        await fetch(`http://localhost:3000/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user.username, role: user.role }),
        })
      } else {
        // tambah baru
        await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
      }
      fetchUsers()
      setShowForm(false)
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Kelola User</h1>

      {!showForm && (
        <div className="mb-4">
          <button
            onClick={handleAddClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          >
            Tambah User
          </button>
        </div>
      )}

      {showForm ? (
        <UserForm
          onSubmit={handleSubmit}
          initialData={editingUser}
          onCancel={handleCancel}
        />
      ) : (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  )
}

export default ManageUsersPage
