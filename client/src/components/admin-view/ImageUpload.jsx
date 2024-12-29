import { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from "axios";


const ImageUpload = ({imageFile,setImageFile,uploadedImgUrl,setUploadedImgUrl,imageLoadingState,
  setImageLoadingState,isEditMode}) => {
    const inputRef = useRef(null);
    const handleImageFileChange = (e)=>{
     const selectFile = e.target.files?.[0];
     if (selectFile) setImageFile(selectFile);
    }

    const handleDragOver = (e)=>{
       e.preventDefault()
    }
   
   const handleDrop = (e)=>{
     e.preventDefault();
     const droppedFile = e.dataTransfer.files?.[0];
     if(droppedFile) setImageFile(droppedFile)
    }

    const handleRemoveImage = ()=>{
        setImageFile(null);
            if (inputRef.current) {
            inputRef.current.value = "";
            }
    }
   
   
    const uploadImageToCloudinary = async () => {
  try {
  setImageLoadingState(true);
    const data = new FormData();
    if (!imageFile) {
      console.error("No file selected.");
      return;
    }
    data.append('my_file', imageFile);

    // Debug FormData
    for (const pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axios.post(
      'http://localhost:5000/api/admin/products/upload-image',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response && response?.data) {
      setUploadedImgUrl(response?.data?.result?.url);
      setImageLoadingState(false);
    }
  } catch (error) {
    console.error("Error uploading image:", error.message);
  }
};

    useEffect(()=>{
     if(imageFile !== null) uploadImageToCloudinary()
    },[imageFile])
  return (
    <div className='w-full max-w-d mx-auto mt-4'>
       <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
       <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
         <Input id='image-upload' type='file' className='hidden' ref={inputRef}
         onChange={handleImageFileChange} name='my_file' disable={isEditMode}
         />
         {
            !imageFile ? 
            <Label htmlFor={'image-upload'} className={`${isEditMode ? 'cursor-not-allowed' : 'cursor-pointer'} flex flex-col items-center justify-center h-32 `}>
                <UploadCloudIcon className='w-10 h-10 text-muted-foreground'/>
                <span>Drag & Drop or click to upload Image</span>
            </Label> 
            : (
                <div className='flex items-center justify-between'>
                   <div className='flex items-center'>
                    <FileIcon className='w-7 h-8 text-primary'/>
                     <p className='text-sm font-medium'>{imageFile.name}</p>
                     <Button varient="ghost" size="icon" className='text-muted-foreground hover:text-foreground'
                      onClick={handleRemoveImage}
                     >
                         <XIcon className='w-4 h-4'/>
                         <span className='sr-only'>Remove File</span>
                     </Button>
                   </div>
               </div>
            )    
         }
    </div>
    </div>
  )
}

export default ImageUpload
