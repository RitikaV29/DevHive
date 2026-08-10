
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'

const UserDashboard = () => {
  return (
       <div className="flex h-screen bg-base-100 overflow-hidden  ">
      
      {/* Sidebar */}
      <Sidebar  />
 
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        

        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
       <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default UserDashboard