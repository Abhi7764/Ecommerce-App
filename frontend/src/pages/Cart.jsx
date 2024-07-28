import React, { useContext, useEffect, useState } from 'react'
import allDomainLink from '../../common/allDomain';
import Context from '../context';
import displayINRCurrrency from "../helpers/displayINRCurrency";
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';


const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {cartProductCount, fetchCountCartProduct} = useContext(Context)
    const loadingCart = new Array(cartProductCount).fill(null);
    
    
    const fetchData = async() =>{
        
        const response = await fetch(allDomainLink.addToCartProductView.url,{
            method: allDomainLink.addToCartProductView.method,
            credentials: 'include'
        })
        //setLoading(false);
        const responseData = await response.json();
        setData(responseData.data);
    }

    const handleLoading = async() =>{
        await fetchData();
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    const increaseQty = async(id, qty) =>{
        const response = await fetch(allDomainLink.updateCartProduct.url,{
            method: allDomainLink.updateCartProduct.method,
            credentials : 'include',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                quantity : qty + 1,
                _id: id
            })
        })
        const responseData = await response.json();

        if(responseData.success){
            await fetchData()
        }
    }

    
    const decreaseQty = async(id, qty) =>{
        if(qty > 1){
            const response = await fetch(allDomainLink.updateCartProduct.url,{
                method: allDomainLink.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    quantity : qty - 1,
                    _id: id
                })
            })
            const responseData = await response.json();

            if(responseData.success){
               await fetchData()
            }
        }
    }

    const deletCartProduct = async(id) =>{
        const response = await fetch(allDomainLink.deleteCartProduct.url, {
            method: allDomainLink.deleteCartProduct.method,
            credentials: 'include',
            headers :{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({_id: id}),
        })
        const responseData = await response.json();
        if(responseData.success){
            await fetchData()
            fetchCountCartProduct()
        }
    }

    const totalQty = data?.reduce((result, currValue) => result + currValue.quantity, 0);
    const totalPrice = data?.reduce((result, currValue) => result + (currValue.quantity * currValue?.productId?.sellingPrice), 0);

    const handlePayment = async() =>{
        const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        const response = await fetch(allDomainLink.payment.url,{
            method : allDomainLink.payment.method,
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cartItems : data})
        });

        const responseData = await response.json()
        if(responseData?.id){
            stripePromise.redirectToCheckout({sessionId: responseData.id})
        }
        //console.log("payment response", responseData)
    }

  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data?.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                ) 
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/* view ptoduct of cart */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map((_, index)=>{
                            return(
                                <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                </div>
                            )
                        })
                        
                    ):(
                        <div>
                            {
                                data?.map((product, index)=>{
                                    return(
                                        <div key={index} className='w-full bg-white h-32 
                                            my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                            <div className='w-32 h-32 bg-slate-200'>
                                                <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName}  className='w-full h-full object-scale-down mix-blend-multiply'/>
                                            </div>
                                            <div className='px-4 py-2 relative'>
                                                {/* delete product from the cart */}
                                                <div className='absolute right-0 text-red-600 cursor-pointer
                                                    rounded-full p-2 hover:bg-red-600 hover:text-white'
                                                    onClick={()=>deletCartProduct(product?._id)}
                                                    >
                                                    <MdDelete />
                                                </div>

                                                <h2 className='text-md lg:text-xl text-ellipsis line-clamp-1'>
                                                    {product?.productId?.productName}
                                                </h2>
                                                <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                                <div className='flex items-center justify-between'>
                                                    <p className='text-red-600 font-medium text-lg'>{displayINRCurrrency(product?.productId?.sellingPrice)}</p>
                                                    <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                                </div>
                                                <div className='flex items-center gap-3 mt-1'>
                                                    {/* decreament cart Quantity */}
                                                    <button className='border border-red-600 
                                                    text-red-600 w-6 h-6 items-center justify-center 
                                                    rounded hover:bg-red-600 hover:text-white text-center'
                                                    onClick={()=>decreaseQty(product?._id, product?.quantity)}
                                                    >-</button>
                                                    <span className='text-center font-medium'>{product?.quantity}</span>
                                                    {/* increament cart Quantity */}
                                                    <button className='border border-red-600 
                                                    text-red-600 w-6 h-6 items-center justify-center 
                                                    rounded hover:bg-red-600 hover:text-white'
                                                    onClick={()=>increaseQty(product?._id, product?.quantity)}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>

            {/* Total product Details */}
            {
               data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                                <div className='h-36 bg-slate-200 my-2 border border-slate-300 animate-pulse rounded'>
                                </div>
                            ):(
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summery</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity : </p>
                                        <p>{totalQty}</p>
                                    </div>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price : </p>
                                        <p>{displayINRCurrrency(totalPrice)}</p>
                                    </div>
                                    <button className='bg-blue-600 text-white mt-8 py-3 w-full' onClick={handlePayment}>Check Out</button>
                                </div>
                            )
                        }   
                    </div>
                )
            }
        </div>
        
    </div>
  )
}

export default Cart