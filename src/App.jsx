import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserDashboardPage from './pages/UserDashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ManageBooksPage from './pages/ManageBooksPage'
import ManageUsersPage from './pages/ManageUsersPage'
import BookForm from './components/BookForm'
import UserForm from './components/UserForm'
import BookTable from './components/BookTable'
import UserTable from './components/UserTable'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<UserDashboardPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/manage-books" element={<ManageBooksPage />} />
      <Route path="/admin/manage-users" element={<ManageUsersPage />} />
      <Route path="/admin/manage-books/form" element={<BookForm />} />
      <Route path="/admin/manage-users/form" element={<UserForm />} />
      <Route path="/admin/manage-books/table" element={<BookTable />} />
      <Route path="/admin/manage-users/table" element={<UserTable />} />
    </Routes>
  )
}

export default App
