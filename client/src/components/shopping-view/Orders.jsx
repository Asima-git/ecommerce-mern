import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog } from '../ui/dialog';
import ShoppingOrderDetails from './OrderDetails';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderByUser, getOrderDetails, resetOrderDetails } from '@/store/shop/order-slice';
import { Badge } from '../ui/badge';

const Orders = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.shopOrder);
  const { orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrderByUser(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetails(true);
    }
  }, [orderDetails]);

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

  return (
    <Card className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left px-4 py-2">Order Id</TableHead>
                <TableHead className="text-left px-4 py-2">Order Date</TableHead>
                <TableHead className="text-left px-4 py-2">Order Status</TableHead>
                <TableHead className="text-left px-4 py-2">Order Price</TableHead>
                <TableHead className="text-left px-4 py-2"><span className="sr-only">Details</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id} className="hover:bg-gray-50">
                    <TableCell className="px-4 py-2 text-sm sm:text-base">{orderItem?._id}</TableCell>
                    <TableCell className="px-4 py-2 text-sm sm:text-base">{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell className="px-4 py-2 text-sm sm:text-base">
                      <Badge
                        className={`py-1 px-3 text-xs sm:text-sm font-semibold rounded-full ${{
                          confirmed: 'bg-green-500 text-white',
                          rejected: 'bg-red-600 text-white',
                        }[orderItem?.orderStatus] || 'bg-yellow-400 text-black'}`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-2 text-sm sm:text-base">${orderItem?.totalAmount}</TableCell>
                    <TableCell className="px-4 py-2">
                      <Dialog
                        open={openDetails}
                        onOpenChange={() => {
                          setOpenDetails(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 text-sm sm:text-base" onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                          View Details
                        </Button>
                        <ShoppingOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center py-4 text-gray-500">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Orders;