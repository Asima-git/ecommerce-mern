import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommonForm from '../common/Form';
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, getAllAddress, updateAddress } from '@/store/shop/address-slice';
import AddressCard from './AddressCard';
import { useToast } from '@/hooks/use-toast';

const initialAddressFormData = {
  address: "",
  pincode: "",
  city: "",
  phone: "",
  notes: ""
};

const Address = ({ setCurrentSelectedAddress, selectedId }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { addressList } = useSelector(state => state.shopAddress);

  const handleManageAddress = (e) => {
    e.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add a maximum of 3 addresses",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(updateAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData
        })).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: 'Address Updated Successfully'
            });
          }
        })
      : dispatch(addNewAddress({
          ...formData,
          userId: user?.id
        })).then(data => {
          if (data?.payload?.success) {
            dispatch(getAllAddress(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: 'Address Added Successfully'
            });
          }
        });
  };

  const isFormValid = () => {
    return Object.keys(formData).map(key => formData[key] !== '').every(item => item);
  };

  useEffect(() => {
    dispatch(getAllAddress(user?.id));
  }, [dispatch]);

  const handleDeleteAddress = (getAddress) => {
    dispatch(deleteAddress({ userId: user?.id, addressId: getAddress._id }))
      .then((data) => {
        if (data.payload.success) {
          dispatch(getAllAddress(user?.id));
          toast({
            title: 'Address Deleted Successfully'
          });
        }
      });
  };

  const handleEdit = (getAddress) => {
    setCurrentEditedId(getAddress?._id);
    setFormData({
      address: getAddress?.address,
      pincode: getAddress?.pincode,
      city: getAddress?.city,
      phone: getAddress?.phone,
      notes: getAddress?.notes
    });
  };

  return (
    <Card className="p-4">
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          addressList && addressList.length > 0 ?
            addressList.map(singleItemAddress => (
              <AddressCard
                key={singleItemAddress._id}
                selectedId={selectedId}
                addressInfo={singleItemAddress}
                handleDeleteAddress={handleDeleteAddress}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
                handleEdit={handleEdit}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            )) : <p className="col-span-full text-center text-gray-500">No addresses found.</p>
        }
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{currentEditedId !== null ? 'Edit Address' : 'Add New Address'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
          onSubmit={handleManageAddress}
          isBtnDisable={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;