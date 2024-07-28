import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { AdminEditProduct } from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayINRCurrency';

const AdminProductCard = ({
    data,
    callForAllProductData
}) => {

    const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded'>
        <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data?.productImage[0]} width={120} height={120} alt={data?.productName} className='mx-auto object-fill h-full'/>
            </div>
            
            <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
            <div>
                <p className='font-semibold'>
                    {
                        displayINRCurrency(data?.sellingPrice)
                    } 
                </p>
                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 
                hover:text-white cursor-pointer rounded-full'
                onClick={()=>setEditProduct(true)}>
                <MdModeEditOutline/>
            </div>
            </div>
            
        </div>
        {
            editProduct && (
                <AdminEditProduct onClose={()=>setEditProduct(false)} editData={data} callForAllProductData={callForAllProductData}/>
            )
        }
        
    </div>
  )
}

export default AdminProductCard
