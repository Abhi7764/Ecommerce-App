import React, { useContext} from 'react'
import displayINRCurrrency from "../helpers/displayINRCurrency";
import { Link } from 'react-router-dom';
import scrollTop from '../helpers/scrollTop';
import addToCard from '../helpers/addToCart';
import Context from '../context';


const VerticalCard = ({loading, data = [] }) => {
    const loadingList = new Array(30).fill(null);
    const {fetchCountCartProduct} = useContext(Context);

    const handleAddToCart = async(e, id) =>{
        await addToCard(e,id);
        fetchCountCartProduct()
    } 

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] 
       justify-center md:justify-between md:gap-4 overflow-x-auto scrollbar-none transition-all'>
        {
            loading ? (
                loadingList.map((_, index) => {
                    return(
                       <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>

                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                
                            </div>

                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black animate-pulse p-1 rounded-full bg-slate-200 py-2'></h2>
                                <p className='text-slate-500 animate-pulse p-1 rounded-full bg-slate-200 py-2'></p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium animate-pulse p-1 rounded-full bg-slate-200 w-full py-2'></p>
                                    <p className='text-slate-500 line-through animate-pulse p-1 rounded-full bg-slate-200 w-full py-2'></p>
                                </div>
                                <button className='text-sm px-3 rounded-full animate-pulse p-1 bg-slate-200 py-2'></button>
                            </div>
                        </div>
                    )  
                })
            ):(
                data?.map((product, index)=>{
                    return(
                        <Link to={`/product/${product?._id}`} key={index} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow' onClick={scrollTop}>

                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img src={product?.productImage[0]} alt={product?.productName}
                                className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                                />
                            </div>

                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                    {product?.productName}
                                </h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{ displayINRCurrrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayINRCurrrency(product?.price)}</p>
                                </div>
                                <button className='text-sm bg-red-500 
                                hover:bg-red-700 px-3 py-0.5 
                                rounded-full' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
                    )
                })
            ) 
        }
    </div>
  )
}

export default VerticalCard