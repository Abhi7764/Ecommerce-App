import React from 'react'
import { Link } from 'react-router-dom';
import successImage from "../assest/success.gif"
const Success = () => {
  return (
    <div className='min-h-[calc(100vh-135px)]'>
      <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col py-6 mt-3 rounded'>
        <img src={successImage} alt={successImage} 
        width={150} height={150} className='mix-blend-multiply'/>
        <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
        <Link to={"/order"} className='p-2 px-3 mt-5 border-2 
          border-green-600 rounded font-semibold 
          text-green-600 hover:bg-green-600 hover:text-white transition-all'
        >See Order</Link>
      </div>
    </div>
  )
}

export default Success
