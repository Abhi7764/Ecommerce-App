import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import allDomainLink from '../../common/allDomain'

const CategoryProduct = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(ele =>{
      urlCategoryListObject[ele] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategory, setFilterCategory] = useState([]);
    const [sortBy, setSortBy] = useState("")

    // {params?.categoryName}
    const handleSelectCategory = (e) => {
      const { value, checked} = e.target;
      setSelectCategory((prev)=>{
        return {
          ...prev,
          [value]: checked
        }
      })
    }

    const fetchData = async() =>{
      setLoading(true)
      const response = await fetch(allDomainLink.filterProduct.url,{
        method: allDomainLink.filterProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({category : filterCategory})
      })
      setLoading(false)
      const responseData = await response.json();
      setData(responseData?.data  || [] );
    }

    useEffect(()=>{
      fetchData()
    },[filterCategory])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map((categoryKeyName)=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName;
        }
        return null;
      }).filter(el => el);
      //console.log("Select category", arrayOfCategory);
      setFilterCategory(arrayOfCategory)

      //Format for url change when change the checkbox
      const urlFormat = arrayOfCategory.map((ele, index) => {
        if((arrayOfCategory.length - 1 ) === index){
          return `category=${ele}`
        }
        return `category=${ele}&&`
      })
      // console.log(urlFormat.join(""))
      navigate("/category-product?" + urlFormat.join(""))
      // category-product?category=camera&&category=mobiles
    },[selectCategory])

    const handleSortBy = (e) =>{
      const {value} = e.target;
      setSortBy(value);
      if(value === 'asc'){
        setData(prev => prev.sort((a,b) => a.sellingPrice - b.sellingPrice));
      }else{
        setData(prev => prev.sort((a,b) => b.sellingPrice - a.sellingPrice));
      }
    }

  return (
    <div className='container max-auto p-4'>
      {/* desktop version  */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none'>
          {/* Sort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Sort by</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" id="lowToHigh" checked={sortBy === 'asc'} value={"asc"} onChange={handleSortBy}/>
                <label htmlFor="lowToHigh">Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" id="highToLow" value={"dsc"} checked={sortBy === 'dsc'} onChange={handleSortBy}/>
                <label htmlFor="highToLow">Price - High to Low</label>
              </div>

            </form>
          </div>

          {/* Filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Category</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
             {
              productCategory.map((categoryName, index)=>{
                return(
                  <div key={index} className='flex items-center gap-3'>
                    <input type="checkbox"  name={'category'}  checked = {selectCategory[categoryName?.value]} 
                    value={categoryName.value} id={categoryName.value} 
                    onChange={handleSelectCategory}/>
                    <label htmlFor={categoryName.value}>{categoryName.label}</label>
                  </div>
                )
              })
             }
            </form>
          </div>
        </div>

        {/* right side (product)*/}
        <div className='px-4'>
          <p className='text-lg font-medium py-2'>Search Results : {!loading && data.length}</p>
          <div className='min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll'>
          {
            data.length !== 0 && (
              <VerticalCard loading={loading} data={data}/>
            )
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct