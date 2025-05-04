import { useEffect, useState } from 'react'
import UserTable from '../components/UserTable'
import UserForm from '../components/UserForm'

function ManageUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState(null)

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Gagal mengambil user:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAddOrUpdate = async (userData) => {
    try {
      const token = localStorage.getItem('token')
      const url = editingUser
        ? `http://localhost:3000/api/users/${editingUser.id}`
        : 'http://localhost:3000/api/users'
      const method = editingUser ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) throw new Error('Gagal menyimpan user')

      fetchUsers()
      setEditingUser(null)
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin mau menghapus user ini?')) return
    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchUsers()
    } catch (error) {
      console.error(error)
      alert('Gagal menghapus user')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manajemen Users</h1>
      <UserForm
        onSubmit={handleAddOrUpdate}
        initialData={editingUser}
        onCancel={() => setEditingUser(null)}
      />
      <div className="mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <UserTable
            users={users}
            onEdit={(user) => setEditingUser(user)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default ManageUsersPage
