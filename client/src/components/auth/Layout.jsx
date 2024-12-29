import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
  {/* Left section: Visible only on large screens */}
  <div className="hidden lg:flex items-center justify-center bg-black lg:w-1/2">
    <div className="max-w-md space-y-6 text-center text-primary-foreground px-4 lg:px-0">
      <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-white">
        Welcome to ecommerce shopping
      </h1>
    </div>
  </div>
  
  {/* Right section: Visible on all devices */}
  <div className="flex flex-1 items-center justify-center bg-background px-4 sm:px-8 lg:w-1/2">
    <Outlet />
    <Toaster />
  </div>
</div>

  )
}

export default AuthLayout
