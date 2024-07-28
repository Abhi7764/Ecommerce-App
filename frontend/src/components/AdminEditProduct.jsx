import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import FullDisplayImage from './FullDisplayImage';
import { MdDelete } from 'react-icons/md';
import allDomainLink from '../../common/allDomain';
import { toast } from "react-toastify";
    
export const AdminEditProduct = ({
    onClose,
    editData,
    callForAllProductData
}) => {
    const [data, setData] = useState({
        _id: editData._id,
        productName: editData?.productName,
        brandName: editData?.brandName,
        category: editData?.category,
        productImage: editData?.productImage,
        price: editData?.price,
        sellingPrice: editData?.sellingPrice,
        description: editData?.description,
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenUrl, setFullScreenUrl ] = useState("");

    const handleOnChage = (e) =>{
        const {name, value} = e.target;
        setData((prev)=>{
            return {
                ...prev, 
               [name]: value
            }
        })
    }

    const handleProductImage = async(e) =>{
        const file = e.target.files[0];
        // setUploadProductImageData(file.name);
        const uploadImageCloudinary = await uploadImage(file)
        
        console.log("upload Image", uploadImageCloudinary);
        setData((prev)=>{
            return {
                ...prev, 
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handleDeleteProductImage = (index) =>{
        console.log("index", index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1);

        setData((prev)=>{
            return {
                ...prev, 
                productImage: [...newProductImage]
            }
        })
    }

    // Edit Product

    const handleOnSubmit = async(e) =>{
        e.preventDefault();
        const fetchData = await fetch(allDomainLink.updateProduct.url,{
            method: allDomainLink.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await fetchData.json();

        if(responseData.success){
            toast.success(responseData.message);
            onClose();
            callForAllProductData();
        }else{
            toast.error(responseData.message);
        }
        // console.log("Product Data", data)
    }

  return (
    <div className='fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden '>
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Edit Product</h2>
                <button className='w-fit ml-auto hover:text-red-600 ' onClick={onClose}>
                    <IoMdClose className='text-2xl'/>
                </button>
            </div>

            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleOnSubmit}>
                <label htmlFor="productName">Product Name : </label>
                <input type="text" name="productName"  id ="productName" 
                    placeholder="enter product name" 
                    value={data.productName} onChange={handleOnChage}
                    className='p-1 bg-slate-100 border rounded' required
                />

                <label htmlFor="brandName" className='mt-2'>Brand Name : </label>
                <input type="text" name="brandName"  id ="brandName" 
                    placeholder="enter brand name" 
                    value={data.brandName} onChange={handleOnChage}
                    className='p-1 bg-slate-100 border rounded' required
                />

                <label htmlFor="category" className='mt-2'>Category : </label>
                <select name="category" id="category" required value={data.category} onChange={handleOnChage} className='p-1 bg-slate-100 border rounded cursor-pointer'>
                    <option value={""}>Select Category</option>
                    {
                        productCategory.map((item) =>{
                            return (
                                <option value={item.value} key={item.id} className='cursor-pointer'>{item.label}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor="productImage" className='mt-2'>Product Image : </label>
                <label htmlFor="uploadImageInput">
                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'> 
                            <span className='text-4xl'><FaCloudUploadAlt/></span>
                            <p className='text-sm'>Upload Product Image</p>
                            <input type="file" id='uploadImageInput' name='uploadImageInput' className='hidden' onChange = {handleProductImage} />
                        </div>
                    </div>
                </label>

                <div >
                    {
                        data?.productImage[0] ? (
                            <div className='flex items-center gap-3 '>
                                {
                                    data.productImage.map((item, index)=>{
                                        return(
                                            <div className='relative group'>
                                                <img src={item} alt={item}  
                                                    key={index} width={80} height={80} 
                                                    className='bg-slate-100 border cursor-pointer' 
                                                    onClick={()=>{
                                                    setOpenFullScreenImage(true)
                                                    setFullScreenUrl(item)
                                                }}/>

                                                <div className='absolute bottom-0 
                                                    right-0 p-1 text-white cursor-pointer
                                                    bg-red-600 rounded hidden group-hover:block'
                                                    onClick={()=>handleDeleteProductImage(index)}
                                                    >
                                                    <MdDelete/>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ):(
                            <p className='text-red-600 text-sm'>*Upload Product Image</p>
                        ) 
                    }
                </div>

                <label htmlFor="price" className='mt-2'>Price : </label>
                <input type="number" name="price"  id ="price" 
                    placeholder="enter price" 
                    value={data.price} onChange={handleOnChage}
                    className='p-1 bg-slate-100 border rounded' required
                />

                <label htmlFor="sellingPrice" className='mt-2'>Selling Price : </label>
                <input type="number" name="sellingPrice"  id ="sellingPrice" 
                    placeholder="enter selling price" 
                    value={data.sellingPrice} onChange={handleOnChage}
                    className='p-1 bg-slate-100 border rounded' required
                />

                <label htmlFor="description" className='mt-2'>Description : </label>
                <textarea name="description" id="description" 
                    className='h-28 bg-slate-200 border resize-none p-1 mb-5' 
                    placeholder='enter product description....' rows={3} 
                    onChange={handleOnChage}
                    value={data.description}
                >
                </textarea>

                <button className='border-2 border-red-600 
                    text-red-600 py-1 px-1  rounded-full 
                    hover:bg-red-600 hover:text-white transition-all mb-3'
                    >
                    Edit Product
                </button>
            </form>
        </div>
      {/* full image display */}

      {
        openFullScreenImage && (
            <FullDisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenUrl}/>
        )
      }
      
    </div>
  )
}
