import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';


const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch();
  const handleLogout = ()=>{
      dispatch(logoutUser())
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b-2">
        <Button onClick={()=>setOpen(true)} className='sm-block lg:hidden'>
            <AlignJustify />
            <span className='sr-only'>Toggle Menu</span>
        </Button>
        <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogout} className='inline-flex gap-2 items-center rounded-md px-4 py-2 bg-black text-white hover:bg-slate-400'>
           Logout <LogOut />
           </Button>
        </div>
    </header>
  )
}

export default AdminHeader
