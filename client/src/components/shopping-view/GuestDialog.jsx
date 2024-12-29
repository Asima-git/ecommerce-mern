import React from 'react'
import { Dialog, DialogContent, DialogTrigger,DialogHeader,DialogTitle,DialogDescription} from '../ui/dialog'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const GuestDialog = ({openGuestDialog, setGuestDialog}) => {
    console.log(setGuestDialog);
  return (
    <>
     <Dialog open={openGuestDialog} onOpenChange={setGuestDialog}>
      <DialogContent className='bg-white text-center'>
        <DialogHeader>
          <DialogTitle>Hello User Please Login or Register For Add To Cart</DialogTitle>
          <DialogDescription className='flex items-center'>
             <Button><Link to='/auth/login'>Login</Link></Button>
             or 
             <Button><Link to='/auth/register'>Register</Link></Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default GuestDialog
