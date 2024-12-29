import Address from '@/components/shopping-view/Address';
import img from '../../assets/account.jpg';
import { useDispatch, useSelector } from 'react-redux';
import CartItemContent from '@/components/shopping-view/CartItemContent';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
import { useToast } from '@/hooks/use-toast';

const ShoppingCheckout = () => {
  const { cartItem } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const { toast } = useToast();

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItem?.data?.items && cartItem?.data?.items.length > 0
      ? cartItem.data.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.qty,
          0
        )
      : 0;

  const handleInitialPayment = () => {
    if (cartItem.length === 0) {
      toast({
        title: 'Your cart is empty. Please add items to proceed.',
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: 'Please select one address to proceed.',
      });
      return;
    }

    const orderData = {
      userId: user.id,
      cartId: cartItem?.data?._id,
      cartItems: cartItem.data.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        qty: singleCartItem?.qty,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    };
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data.payload.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      {/* Background Image */}
      <div className="relative h-[250px] sm:h-[300px] w-full overflow-hidden">
        <img
          src={img}
          className="h-full w-full object-cover object-center"
          alt="Background"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 p-4 sm:p-6 lg:p-8">
        {/* Address Section */}
        <div className="sm:col-span-1 lg:col-span-1">
          <Address
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            selectedId={currentSelectedAddress}
          />
        </div>

        {/* Cart Items and Total */}
        <div className="sm:col-span-1 lg:col-span-2 flex flex-col gap-6">
          {cartItem?.data?.items?.length > 0 ? (
            cartItem.data.items.map((item, index) => (
              <CartItemContent key={index} cartItem={item} />
            ))
          ) : (
            <p>No items in the cart.</p>
          )}

          {/* Total Amount */}
          <div className="mt-6 flex justify-between font-semibold text-lg sm:text-xl">
            <span>Total</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 w-full">
            <Button
              onClick={handleInitialPayment}
              className="w-full bg-black text-white hover:bg-slate-500"
            >
              {isPaymentStart
                ? 'Processing Paypal Payment...'
                : 'Checkout with Paypal'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
