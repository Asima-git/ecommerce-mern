import { adminSideBarMenuItems } from '@/config';
import { ChartNoAxesCombined} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"

const MenuItems = ({setOpen})=>{
  const navigate = useNavigate();
   return <nav className='mt-8 flex-col flex gap-2'>
     {
      adminSideBarMenuItems.map(menuItem => 
        <div
        key={menuItem.id}
        onClick={() => {
          navigate(menuItem.path);
          setOpen ? setOpen(false) : null;
        }}
        className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
         {menuItem.icon} <span>{menuItem.label}</span>
      </div>)
     }
   </nav>
}
const AdminSideBar = ({open,setOpen}) => {
  const navigate = useNavigate();
  return (
    <>
    <Sheet open={open} onOpenChange={setOpen}>
       <SheetContent side="left" className='w-64 bg-white'>
           <div className='flex flex-col h-full'>
               <SheetHeader className='border-b'>
               <ChartNoAxesCombined size={30}/>
                 <SheetTitle>Admin panel</SheetTitle>
               </SheetHeader>
               <MenuItems setOpen={setOpen} />
           </div>
       </SheetContent>
    </Sheet>
      <aside className='bg-slate-400'>
         <div className="hidden w-64 flex-col border-r p-6 lg:flex">
           <div className="flex item-center gap-2 cursor-pointer" onClick={()=>navigate('/admin/dashboard')}>
             <ChartNoAxesCombined size={30}/>
             <h1 className='text-xl font-extrabold'>Admin Panel</h1>
           </div>
         </div>
         <MenuItems/>
        </aside>  
    </>
  )
}

export default AdminSideBar
