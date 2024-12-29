import ImageUpload from '@/components/admin-view/ImageUpload';
import CommonForm from '@/components/common/Form';
import { Button } from '@/components/ui/button'
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger} from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addNewProduct, deleteProduct, fetchProduct } from '@/store/admin/product-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminProductTile from '../../components/admin-view/ProductTile';
import { editProduct } from '@/store/admin/product-slice';
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};
const AdminProducts = () => {
  const [openCreateProducts,setOpenCreateProducts] = useState(false);
  const [formData,setFormData] = useState(initialFormData);
  const [imageFile,setImageFile] = useState(null);
  const [uploadedImgUrl,setUploadedImgUrl]  = useState('');
  const [imageLoadingState,setImageLoadingState] = useState(false);
  const [currentEditId,setCurrentEditId] = useState(null);
  const {productList} = useSelector(state=>state.adminProducts)
  const {toast} = useToast();
  const dispatch = useDispatch();
  const onSubmit = (e)=>{
     e.preventDefault();
     currentEditId !== null
     ? dispatch(
      editProduct({
           id: currentEditId,
           formData,
         })
       ).then((data) => {


         if (data?.payload?.success=== true) {
           dispatch(fetchProduct());
           setFormData(initialFormData);
           setOpenCreateProducts(false);
           setCurrentEditId(null);
         }
       })
     :
     dispatch(addNewProduct({...formData,
      image:uploadedImgUrl
     })).then((data)=>{
       if(data?.payload?.success == true){
        dispatch(fetchProduct())
        setImageFile(null);
        setFormData(initialFormData);
        setOpenCreateProducts(false);
       toast({
          title:data?.payload?.message
       })
       }
     })
  }
  useEffect(()=>{
    dispatch(fetchProduct());
  },[dispatch]);
 
  const isFormVaild = ()=>{
    return Object.keys(formData)
     .map((key)=>formData[key] !== '')
     .every((item)=>item)
  }
  const handleDelete = (getCurrentProductId)=>{
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data.payload.success == true) {
        dispatch(fetchProduct())
        toast({
          title:data?.payload?.message
       })
      }
    })
  }
  return (
    <>
      <div className='mb-5 w-full flex justify-end'>
         <Button onClick={()=>setOpenCreateProducts(true)} className='bg-black text-white hover:bg-slate-400'>
           Add Product
         </Button>
         <div className='grid gap-4 md:grid-cols-3 lg:grid-col-4'>
          {
            productList && productList.length > 0 ?
            productList.map((productItem)=><AdminProductTile setFormData={setFormData} 
            setOpenCreateProducts={setOpenCreateProducts} 
            setCurrentEditId={setCurrentEditId} 
            product={productItem} handleDelete={handleDelete}/>) : null
          }
           <Sheet open={openCreateProducts} onOpenChange={()=>{setOpenCreateProducts(false)
            setFormData(initialFormData)
           }}
            >
              <SheetContent side="right" className="overflow-auto bg-white">
                 <SheetHeader>
                   <SheetTitle>{
                   currentEditId !== null ? `Edit Product` : 'Add New Product'
           }
           </SheetTitle>
                 </SheetHeader>
                 <ImageUpload imageFile={imageFile}  setImageFile={setImageFile} uploadedImgUrl={uploadedImgUrl} setUploadedImgUrl={setUploadedImgUrl}
                  setImageLoadingState={setImageLoadingState}
                  imageLoadingState={imageLoadingState}
                  isEditMode={currentEditId !== null}
                 />
                 <div className='py-6'>
                    <CommonForm onSubmit={onSubmit} formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText={"Add Product"}
                     isBtnDisable={!isFormVaild()}
                    />
                    
                    </div>
              </SheetContent>
           </Sheet>
         </div>
      </div>
    </>
  )
}

export default AdminProducts