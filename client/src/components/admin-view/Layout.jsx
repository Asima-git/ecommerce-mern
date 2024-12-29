import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './SideBar'
import AdminHeader from './Header'
import { Toaster } from "@/components/ui/toaster"
const AdminLayout = () => {
  const [openSideBar,setOpenSideBar] = useState(false)
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin side bar */}
        <AdminSideBar open={openSideBar} setOpen={setOpenSideBar}/>
       <div className='flex flex-1 flex-col'>
             {/* admin header */}
             <AdminHeader setOpen={setOpenSideBar}/>
             <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet/>
                <Toaster />
             </main>
       </div>
    </div>
  )
}

export default AdminLayout
