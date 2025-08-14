import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [showSidebar, setShowSidebar] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-[1000] lg:hidden ${showSidebar ? "block" : "hidden"}`}>
        <div 
          className="absolute inset-0 bg-richblack-900 opacity-50"
          onClick={() => setShowSidebar(false)}
        ></div>
        <div className="absolute left-0 top-0 h-screen w-[220px] bg-richblack-800">
          <Sidebar closeSidebar={() => setShowSidebar(false)} />
        </div>
      </div>
      
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] p-4 md:px-6 lg:py-10 lg:px-8">
          {/* Mobile menu button */}
          <button 
            className="mb-4 rounded-full p-2 bg-richblack-800 lg:hidden"
            onClick={() => setShowSidebar(true)}
          >
            <AiOutlineMenu className="text-2xl text-richblack-100" />
          </button>

          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard