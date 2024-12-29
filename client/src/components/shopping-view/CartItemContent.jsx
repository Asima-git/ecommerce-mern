import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart, updateCartQty } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast';

const CartItemContent = ({cartItem}) => {
    const {user} = useSelector(state=>state.auth)
    const { toast } = useToast();
    const dispatch = useDispatch();
    console.log(cartItem);
    const handleCartItemDelete = (cartItem)=>{
      
      dispatch(deleteCart({userId:user?.id,productId:cartItem.productId}))
    }
    const handleUpdateQty = (getCartItem,typeOfAction)=>{
      dispatch(
        updateCartQty({
          userId: user?.id,
          productId: getCartItem?.productId,
          qty:
            typeOfAction === "plus"
              ? getCartItem?.qty + 1
              : getCartItem?.qty - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item is updated successfully",
          });
        }
      });
    }
  return (
    <div className='flex items-center space-x-4'>
       <img src={cartItem?.image} alt={cartItem.title} className='w-20 h-20 rounded object-cover'></img>
       <div className='flex-1'>
         <h3 className='font-extrabold'>{cartItem.title}</h3>
         <div className='flex items-center mt-1 gap-2'>
             <Button onClick={()=>handleUpdateQty(cartItem,'minus')} variant='outline' size='icon' className='h-6 w-8 rounded-full'
              disable={cartItem.qty === 1 }>
                <Minus className='w-4 h-4' />
                <span className='sr-only'>Decrease</span>
             </Button>
             <span className='font-semibold'>{cartItem.qty}</span>
             <Button onClick={()=>handleUpdateQty(cartItem,'plus')} variant='outline' size='icon' className='h-6 w-8 rounded-full'>
                <Plus className='w-4 h-4'/>
                <span className='sr-only'>Increase</span>
             </Button>
         </div>
       </div>
       <div className='flex flex-col items-end'>
          <p className='font-semibold'>
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.qty
          ).toFixed(2)}
          </p>
          <Trash className='cursor-pointer text-red-500 mt-1' size={20} onClick={()=>handleCartItemDelete(cartItem)}/>
       </div>
    </div>
  
  )
}

export default CartItemContent
