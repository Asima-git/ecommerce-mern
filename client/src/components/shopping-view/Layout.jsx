import { Outlet } from 'react-router-dom'
import ShoppingHeader from './Header'
import { Toaster } from "@/components/ui/toaster"
import Footer from './Footer'


const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <ShoppingHeader/>
      <main className='flex flex-col w-full'>
         <Outlet/>
         <Toaster />
      </main>
      <Footer></Footer>
    </div>
  )
}

export default ShoppingLayout
