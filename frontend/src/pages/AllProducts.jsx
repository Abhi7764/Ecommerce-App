import React, { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct'
import allDomainLink from '../../common/allDomain';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openAddProduct,setOpenAddProduct] = useState(false);
  const [allProduct, setAllProducts] = useState([])

  const fetchAllProduct = async() =>{
    const fetchData = await fetch(allDomainLink.allProduct.url,{
      method: allDomainLink.allProduct.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json();
    setAllProducts(dataResponse?.data || []);
  }

  useEffect(()=>{
    fetchAllProduct();
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-red-600 
        text-red-600 py-1 px-3 rounded-full 
        hover:bg-red-600 hover:text-white transition-all'
        onClick={()=>setOpenAddProduct(true)}
        > 
        Add Product
        </button>
      </div>

      {/* all Product Component */}
      <div className='flex items-center gap-7 p-5 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index)=>{
            return(
              <AdminProductCard data = {product} key={index+"allProduct"} callForAllProductData={fetchAllProduct}/>
            )
          })
        }
      </div>
      {
        openAddProduct && (
          <AddProduct onClose = {()=>setOpenAddProduct(false)} callForAllProductData={fetchAllProduct}/>
        )
      }
    </div>
  )
}

export default AllProducts
