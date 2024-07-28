import React, { useEffect, useState } from 'react'
import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp"
import image3 from "../assest/banner/img3.jpg"

import image1Mobile from "../assest/banner/img1_mobile.png"
import image2Mobile from "../assest/banner/img2_mobile.jpg"
import image3Mobile from "../assest/banner/img3_mobile.jpg"

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

export const BannerProduct = () => {
    const desktopImages = [image1, image2, image3];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile];

    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () =>{
        if(desktopImages.length -1 > currentImage){
            setCurrentImage(prev => prev + 1);
        }
    }

    const prevImage = () =>{
        if(0 < currentImage){
            setCurrentImage(prev => prev - 1);
        }
    }
    useEffect(()=>{
        const interval = setInterval(() => {
            if(desktopImages.length -1 > currentImage){
                nextImage();
            }else{
                setCurrentImage(0)
            }
        }, 10000)

        return () => clearInterval(interval);
    })
  return (
    <div className='container mx-auto px-4 rounded'>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl' >
                    <button className='bg-white shadow-md rounded-full p-1' onClick={prevImage}>
                        <FaAngleLeft />
                    </button>
                    <button className='bg-white shadow-md rounded-full p-1' onClick={nextImage}>
                        <FaAngleRight />
                    </button>
                </div> 
            </div>

            {/* Desktop and Tablet version */}
            <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopImages.map((image, index)=>{
                        return(
                            <div className='w-full h-full min-w-full 
                            min-h-full transition-all' key={index}
                            style={{transform:`translateX(-${currentImage * 100}%)`}}
                            >
                                <img src={image}  className='w-full h-full'/>
                            </div>
                        )
                    })
                }
            </div>

            {/* Mobile version */}
            <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImages.map((image, index)=>{
                        return(
                            <div className='w-full h-full min-w-full 
                            min-h-full transition-all' key={index}
                            style={{transform:`translateX(-${currentImage * 100}%)`}}
                            >
                                <img src={image}  className='w-full h-full object-cover'/>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    </div>
  )
}
