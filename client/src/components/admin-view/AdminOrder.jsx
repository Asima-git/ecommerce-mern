import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog } from '../ui/dialog'
import { useEffect, useState } from 'react'
import AdminOrderDetails from './OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder, getOrderDetails, resetOrderDetails } from '@/store/admin/order-slice'
import { Badge } from '../ui/badge'


const AdminOrder = () => {
    const [openDetails,setOpenDetails] = useState(false);
    const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const dispatch = useDispatch();
   

    function handleFetchOrderDetails(getId) {
      dispatch(getOrderDetails(getId));
    }
    useEffect(() => {
      dispatch(getAllOrder());
    }, [dispatch]);
  
    useEffect(() => {
      if (orderDetails !== null) setOpenDetails(true);
    }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
         <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead><span className='sr-only'>Details</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-yellow-400"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetails}
                        onOpenChange={() => {
                          setOpenDetails(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
      </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrder