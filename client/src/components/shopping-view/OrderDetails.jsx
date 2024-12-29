import { useSelector } from 'react-redux';
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge';

const ShoppingOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <DialogContent className='sm:max-w-[600px] bg-white'>
    <div className='grid gap-6'>
      <div className='grid gap-2'>
         <div className='flex items-center justify-between'>
              <p className='font-medium'>Order Id</p>
              <Label>{orderDetails?._id}</Label>
         </div>
         <div className='flex items-center justify-between'>
              <p className='font-medium'>Order Date</p>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
         </div>
         <div className='flex items-center justify-between'>
              <p className='font-medium'>Order Price</p>
              <Label>${orderDetails?.totalAmount}</Label>
         </div>
         <div className='flex items-center justify-between'>
              <p className='font-medium'>Order Status</p>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-400"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
         </div>
      </div>
      <Separator/>
      <div className='grid gap-4'>
          <div className='grid gap-3'>
             <h4>Order Deatils</h4>
             <ul className='grid gap-3'>
             {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.qty}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
             </ul>
          </div>
      </div>
      <div className='grid gap-4'>
          <div className='grid gap-2'>
              <div className='font-medium'>
                 Shipping Info
              </div>
              <div className='grid gap-0.5 text-muted-foreground'>
                   <span>{user.name}</span>
                   <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
              </div>
          </div>
      </div>
    </div>
 </DialogContent>
  )
}

export default ShoppingOrderDetails
