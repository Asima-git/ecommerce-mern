import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemContent from './CartItemContent';
import {useNavigate} from "react-router-dom"

const CartWrapper = ({cartItem,setopenCart}) => {
  const navigate = useNavigate();
  const totalCartAmount = cartItem && cartItem.length > 0 ? 
  cartItem.reduce((sum,currentItem)=> sum +
  (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.qty,0)
  : 0
  return (
    <SheetContent className='sm:max-w-md bg-white'>2
       <SheetHeader>
         <SheetTitle>Your Cart</SheetTitle>
       </SheetHeader>
       <div className='mt-8 space-y-4'>
         {
          cartItem && cartItem.length > 0 ? 
          cartItem.map((item,index)=> <CartItemContent cartItem={item} key={index}/>) : null
         }
       </div>
       <div className='mt-8 space-y-4'>
         <div className='flex justify-between'>
             <span className='font-bold'>Total</span>
             <span className='font-bold'>${totalCartAmount}</span>
         </div>
       </div>
       <Button onClick={() => {
          navigate("/shop/checkout");
          setopenCart(false);
        }} className='w-full mt-6 bg-black text-white hover:bg-slate-400' >Checkout</Button>
    </SheetContent>
  )
}

export default CartWrapper
