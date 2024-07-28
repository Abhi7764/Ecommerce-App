import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrrency from "../helpers/displayINRCurrency";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCard from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({
    category,
    heading
}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(30).fill(null);
    const scrollElement = useRef()

    const { fetchCountCartProduct} = useContext(Context);

    const handleAddToCart = async(e, id) =>{
        await addToCard(e,id);
        fetchCountCartProduct()
    } 

    const fetchData = async() =>{
        setLoading(true);
        const product = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(product?.data);
    }

    useEffect(()=>{
        fetchData();
    },[])

    const scrollRight = () => {
        scrollElement.current.scrollBy({ left: 300, behavior: 'smooth' });
    }

    const scrollLeft = () => {
        scrollElement.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  return (
    <div className='container mx-auto px-4 my-4 relative'>
        <h2 className='text-3xl font-semibold py-4'>{heading}</h2>

       <div className='flex items-center gap-4 md:gap-6 
        overflow-x-auto scrollbar-none transition-all' 
        ref={scrollElement}
       >
        
        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block z-10 hover:scale-110' onClick={scrollLeft}>
            <FaAngleLeft />
        </button>

        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block hover:scale-110' onClick={scrollRight}>
            <FaAngleRight />
        </button>
        {
            loading ? (
                loadingList.map((_, index) => {
                    return(
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>

                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                
                            </div>

                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'>
                                    
                                </h2>
                                <p className='text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    )
                })
            ):(
                data?.map((product, index)=>{
                    return(
                        <Link to={`product/${product?._id}`} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>

                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                <img src={product?.productImage[0]} alt={product?.productName}
                                className='object-scale-down h-full hover:scale-125 transition-all'
                                />
                            </div>

                            <div className='p-3 grid'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                    {product?.productName}
                                </h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-2'>
                                    <p className='text-red-600 font-medium w-full'>{ displayINRCurrrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through w-full'>{displayINRCurrrency(product?.price)}</p>
                                </div>
                                <button className='text-sm bg-red-500 
                                hover:bg-red-700 px-3 py-0.5 
                                rounded-full w-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
                    )
                })
            )
        }
       </div>
    </div>
  )
}

export default HorizontalCardProduct