import React from 'react';
import { Link } from 'react-router-dom';
import cancelImage from "../assest/cancel.webp"

const Cancel = () => {
  return (
    <div className='min-h-[calc(100vh-135px)]'>
      <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-3 rounded'>
        <img src={cancelImage} alt={cancelImage} 
        width={150} height={150} className='object-scale-down mix-blend-multiply'/>
        <p className='text-red-600 font-bold text-xl'>Payment Failed!</p>
        <Link to={"/cart"} className='p-2 px-3 mt-5 border-2 
          border-red-600 rounded font-semibold 
          text-red-600 hover:bg-red-600 hover:text-white transition-all'
        >Go to Cart</Link>
      </div>
    </div>
    
  )
}

export default Cancel