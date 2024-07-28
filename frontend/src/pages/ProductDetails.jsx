import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import allDomainLink from '../../common/allDomain';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayINRCurrency';
import RecommendedProduct from '../components/RecommendedProduct';
import addToCard from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("")
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        price: "",
        sellingPrice: "",
        description :"",
  })
  //console.log(params.id)

  const fetchProductDetails = async() =>{
    setLoading(true);
    const response = await fetch(allDomainLink.productDetails.url,{
      method: allDomainLink.productDetails.method,
      credentials: 'include',
      headers :{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({productId: params?.id})
    });
    setLoading(false);
    const responseData = await response.json();
    setData(responseData.data);
    setActiveImage(responseData?.data.productImage[0]);
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleOnMouseEnter = (image) =>{
    setActiveImage(image);
  }

  const handleOnClick = (image) =>{
    setActiveImage(image);
  }

  const handleZoomImage = (e) =>{
    setZoomImage(true);
    const {left, top, width, height } = e.target.getBoundingClientRect()
    // console.log("coordinate", left, top, height, width)

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({x,y})
  }

  const handleMouseleave = () =>{
    setZoomImage(false);
  }

  const { fetchCountCartProduct} = useContext(Context);
  const navigate = useNavigate();

  const handleAddToCart = async(e, id) =>{
    await addToCard(e,id);
    fetchCountCartProduct()
  } 

  const handleBuyProduct = async(e, id) =>{
    await addToCard(e,id);
    fetchCountCartProduct()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

        {/* product image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} alt={data?.productName} className='h-full w-full 
            object-scale-down mix-blend-multiply' 
            onMouseMove={handleZoomImage}
            onMouseLeave={handleMouseleave}
            />

            {/* product zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute overflow-hidden min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div className='w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-125'
                  style={{
                    backgroundImage :`url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition:`${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                  >
                  </div>
                </div>
              )
            }
            
          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((_,index)=>{
                      return (
                        <div key={index} className='h-20 w-20 bg-slate-200 rounded animate-pulse'>
                        </div>
                      )
                    })
                  }
                </div>
                
              ):(
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage.map((image,index)=>{
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded' key={index}>
                          <img src={image} alt={data?.productImage} 
                          className='w-full h-full object-scale-down 
                            mix-blend-multiply cursor-pointer' 
                            onMouseEnter={()=>handleOnMouseEnter(image)}
                            onClick={()=>handleOnClick(image)}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* product details */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded-full inline-block '></p>
              <h2 className='text-2xl lg:text-3xl font-medium bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded'></h2>
              <p className='bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded'></p>
              <div className='flex gap-1 bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded'>
          
              </div>

              <div className='flex gap-3 bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded my-1'>
                <p className='bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded'></p>
                <p className='bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded'></p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='px-3 py-1 min-w-[120px] 
                bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded'
                >
                </button>
                <button className='px-3 py-1 min-w-[120px] bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded'
                ></button>
              </div>

              <div className='flex flex-col gap-3'>
                <p className='bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded '></p>
                <p className='bg-slate-200 h-6 lg:h-8 animate-pulse w-full rounded py-2'></p>
              </div>
            </div>
          ):(
            <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-3xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>
              <div className='text-red-600 flex gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>

              <div className='flex gap-3 text-2xl lg:text-3xl my-1'>
                <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 
                rounded px-3 py-1 min-w-[120px] 
                text-red-600 font-medium hover:bg-red-600 hover:text-white
                transition-all'
                onClick={(e)=>handleBuyProduct(e,data?._id)}
                >
                  Buy
                </button>
                <button className='border-2 border-red-600 
                rounded px-3 py-1 min-w-[120px] font-medium bg-red-600 text-white
                hover:bg-white hover:text-red-600 transition-all'
                onClick={(e)=>handleAddToCart(e,data?._id)}
                >Add to Cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Description: </p>
                <p>{data?.description}</p>
              </div>
            </div>
          )
        }
      </div>
      {
        data?.category && (
          <RecommendedProduct category = {data?.category} heading={"Recommended Product"}/>
        )
      }
    </div>
  )
}

export default ProductDetails