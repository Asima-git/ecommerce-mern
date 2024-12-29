const Address = require('../../models/Address')

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body
        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            })
        }

        const newCreatedAddress = new Address({
            userId, address, city, pincode, phone, notes
        })
        await newCreatedAddress.save()
        return res.status(200).json({
            success: true,
            data: newCreatedAddress
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
        });
    }
}


const getAddress = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required"
            })
        }
        const addressList = await Address.find({ userId });
        return res.status(200).json({
            success: true,
            data: addressList
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
        });
    }
}


const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params
        const formData = req.body
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "Invaild data provided"
            })
        }
        const address = await Address.findOneAndUpdate({
            _id: addressId, userId
        }, formData, { new: true })
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address Not Found!!"
            })
        }
        return res.status(200).json({
            success: true,
            data: address,
          });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
        });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "Invaild data provided"
            })
        }
        const address = await Address.findOneAndDelete({ _id: addressId, userId })
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address Not Found!!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Address Deleted successfully !!"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
        });
    }
}


module.exports = { addAddress, getAddress, updateAddress, deleteAddress }