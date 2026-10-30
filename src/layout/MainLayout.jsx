import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#FAF5EC] text-[#241711] flex flex-col">
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 relative z-40">
        <Outlet />
      </main>
    </div>
  )
}
