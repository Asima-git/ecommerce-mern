import React from 'react';
import { Card, CardFooter, CardHeader } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEdit,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-300 border-2 p-4 rounded-lg shadow-md hover:shadow-lg ${
        selectedId?._id === addressInfo?._id
          ? 'border-red-600 bg-red-50'
          : 'border-gray-300 bg-white'
      }`}
    >
      <CardHeader
        onClick={
          setCurrentSelectedAddress
            ? () => setCurrentSelectedAddress(addressInfo)
            : null
        }
        className="grid gap-4"
      >
        <Label className="text-sm text-gray-700">
          <span className="font-semibold">Address:</span> {addressInfo?.address}
        </Label>
        <Label className="text-sm text-gray-700">
          <span className="font-semibold">City:</span> {addressInfo?.city}
        </Label>
        <Label className="text-sm text-gray-700">
          <span className="font-semibold">Pincode:</span> {addressInfo?.pincode}
        </Label>
        <Label className="text-sm text-gray-700">
          <span className="font-semibold">Phone:</span> {addressInfo?.phone}
        </Label>
        <Label className="text-sm text-gray-700">
          <span className="font-semibold">Notes:</span> {addressInfo?.notes}
        </Label>
      </CardHeader>
      <CardFooter className="flex justify-between mt-4">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(addressInfo);
          }}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Edit
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;