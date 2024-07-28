import React, { useEffect, useState } from 'react'
import allDomainLink from '../../common/allDomain';
import moment from "moment";
import displayINRCurrency from "../helpers/displayINRCurrency"

const AllOrders = () => {
    const [data, setData] = useState([]);

  const fetchOrderDetails = async() =>{
    const response = await fetch(allDomainLink.allOrders.url,{
      method : allDomainLink.allOrders.method,
      credentials : 'include'
    })
    const reponseData = await response.json();
    setData(reponseData?.data)
  }
  console.log(data);

  useEffect(()=>{
    fetchOrderDetails();
  },[])
  return (
    <div className='h-[calc(100vh-136px)] overflow-y-scroll'>
      {
        !data[0] && (
          <p className='text-lg p-10 text-center font-semibold text-red-500 min-h-[calc(100vh-155px)]'>No orders available!! </p>
        )
      }

      <div className='p-4 w-full'>
        {
          data?.map((item, index)=>{
            return(
              <div key={index} className='mb-4'>
                <p className='font-medium text-lg mb-2'>{moment(item?.createdAt).format("LLL")}</p>

                <div className='border rounded'>

                  <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='grid gap-2'>
                    {
                    item?.productDetails.map((product,index)=>{
                      return(
                        <div key={index} className='flex gap-3 bg-slate-100 p-2'>

                            <img src={product.image[0]} alt={product.name} 
                            className='w-28 h-28 bg-slate-200 object-scale-down mix-blend-multiply p-2'
                            />
                  
                          <div className=''>
                              <p className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</p>
                              <div className='flex items-center gap-5 mt-1'>
                                <p className='text-lg text-red-600'>{displayINRCurrency(product.price)}</p>
                                <p>Quantity : {product.quantity}</p>
                              </div>
                          </div>
                          
                        </div>
                      )
                    })
                  }
                    </div>
                    <div className='flex flex-col gap-10 p-2 min-w-[300px]'>
                      <div>
                        <h2 className='text-lg font-medium'>Payment Details : </h2>
                        <p className='ml-1'>Payment Method : {item.paymentDetails.payment_method_type[0]}</p>
                        <p className='ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                      </div>
                      <div>
                        <h2 className='text-lg font-medium'>Shipping Details :</h2>
                        {
                          item.shipping_options.map((shipping, index)=>{
                            return(
                              <div key={index} className='ml-1'>
                                Shipping Amount : <span className='text-red-500 font-semibold'>{displayINRCurrency(shipping.shipping_amount)}</span>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                  <div className='md:text-lg p-2 font-bold ml-auto w-fit'>Total Amount :
                    <span className='text-red-500 font-semibold'> {displayINRCurrency(item.totalAmount)}</span>
                  </div>

                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllOrders