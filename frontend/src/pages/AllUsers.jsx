import React, { useEffect, useState } from 'react'
import allDomainLink from '../../common/allDomain';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FaUserEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpadteRole, setOpenUpadteRole] = useState(false);

  const [updateUserDetails, setUpdateUserDetails ] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  })

  const fetAllUsers = async() => {
    const fetchData = await fetch(allDomainLink.allUsers.url,{
      method : allDomainLink.allUsers.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json();
    if(dataResponse.success){
      setAllUser(dataResponse.data);
    }else{
      toast.error(dataResponse.message)
    }
  }
  
  useEffect(()=>{
    fetAllUsers();
  },[]);

  return (
    <div className='bg-white'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((ele, index)=>{
              return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td className='capitalize'>{ele?.name}</td>
                  <td>{ele?.email}</td>
                  <td>{ele?.role}</td>
                  <td>{moment(ele?.createdAt).format("ll")}</td>
                  <td>
                    <button className='bg-green-100 p-2 
                    rounded-full hover:bg-green-300' 
                    onClick={()=>{
                        setUpdateUserDetails(ele)
                        setOpenUpadteRole(true)
                    }}
                    >
                      <FaUserEdit className='text-md text-center'/>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpadteRole && (
          <ChangeUserRole 
            onClose={()=>setOpenUpadteRole(false)}
            name = {updateUserDetails.name}
            email = {updateUserDetails.email}
            role ={updateUserDetails.role}
            userId = {updateUserDetails._id}
            callFunc = {fetAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers
