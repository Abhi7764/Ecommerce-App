import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import allDomainLink from '../../common/allDomain'
import VerticalCard from '../components/VerticalCard'


const SearchProduct = () => {
    const query = useLocation()
    // console.log(query.search)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProduct = async() =>{
        setLoading(true)
        const response = await fetch(allDomainLink.searchProduct.url+query.search,{
            method: allDomainLink.searchProduct.method,
            credentials: 'include',
        })
        setLoading(false)
        const responseData = await response.json();
        setData(responseData.data);
    }
    //console.log(data);

    useEffect(()=>{
        fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading.....</p>
        )
      }
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading &&(
          <p className='bg-white text-lg text-center p-4'>No Data Found.....</p>
        )
      }

      {
        data.length > 0 && !loading && (
          <VerticalCard loading={loading} data={data}/>
        )
      }
    </div>
  )
}

export default SearchProduct