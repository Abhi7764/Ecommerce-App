import React, { useState } from 'react'
import Role from '../../common/role'
import { IoMdClose } from "react-icons/io";
import allDomainLink from '../../common/allDomain';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
    
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)
    }

    const updateUserRole = async() =>{
        const fetchResponse = await fetch(allDomainLink.updateUser.url,{
            method: allDomainLink.updateUser.method,
            credentials : 'include',
            headers :{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const dataResponse = await fetchResponse.json();
        //console.log(dataResponse);

        if(dataResponse.success){
            toast.success(dataResponse.message);
            onClose()
            callFunc()
        }else{
            toast.error(dataResponse.message);
        }
    }

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto text-xl' onClick={onClose}>
                <IoMdClose/>
            </button>

           <h1 className='pb-4 text-lg font-medium'>Change User Role</h1> 
           <p>Name : {name}</p>
           <p>Email : {email}</p>
           <div className='flex items-center justify-between my-4 '>
                <p className=''>Role : </p>
                <select name="" className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(Role).map(ele => {
                            return(
                                <option value={ele} key={ele}>{ele}</option>
                            )
                        })
                    }
                </select>
           </div>

           <button className='w-fit mx-auto block py-1 
                px-3 rounded-full bg-red-600 text-white 
                hover:bg-red-700' 
                onClick={updateUserRole}>
            Change Role</button>
        </div>
    </div>
    
  )
}

export default ChangeUserRole
