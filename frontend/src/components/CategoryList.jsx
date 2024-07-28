import React, { useEffect, useState } from 'react'
import allDomainLink from '../../common/allDomain';
import {Link} from 'react-router-dom'

export const CategoryList = () => {
    
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null);

    const fetchProductCategoryData = async() =>{
        setLoading(true);
        const fetchData = await fetch(allDomainLink.productCategory.url,{
            method: allDomainLink.productCategory.method,
            credentials: 'include',
        })

        const responseData = await fetchData.json();
        setLoading(false);
        setCategoryProduct(responseData.data);
    }

    useEffect(()=>{
        fetchProductCategoryData();
    },[])

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            {
                loading ? (
                    
                    categoryLoading?.map((item, index)=>{
                        return (
                            <div className='w-16 h-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200  animate-pulse' key={index}>
                                {/* <p className='text-center'>loading....</p> */}
                            </div>
                        )
                    })
                ):(
                    categoryProduct.map((product,index)=>{
                        return(
                            <Link to={"/category-product?category="+product?.category} key={index} className='cursor-pointer'>
                                <div className='w-16 h-16 md:w-20 md:h-20 flex rounded-full overflow-hidden p-4 bg-slate-200 items-center justify-center '>
                                    <img src={product?.productImage[0]} alt={product?.productName}  className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                    
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                )
            }
        </div>
    </div>
  )
}
