import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import allDomainLink from '../common/allDomain';
import Context from './context/index';
import {useDispatch} from 'react-redux'
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [ cartProductCount, setCartProductCount] = useState(0)

  /** user details */
  const fetchUserDetails = useCallback(async() =>{
    const dataResponse = await fetch(allDomainLink.current_user.url,{
      method: allDomainLink.current_user.method,
      credentials :'include',
    })

    const data = await dataResponse.json();
    if(data.success){
      dispatch(setUserDetails(data.data))
    }
  },[dispatch])

  const fetchCountCartProduct = useCallback(async() =>{
     const dataResponse = await fetch(allDomainLink.countCartProduct.url,{
      method: allDomainLink.countCartProduct.method,
      credentials :'include',
    })
    const data = await dataResponse.json();
    setCartProductCount(data?.data?.count);
  },[])
  //console.log(cartProductCount)

  useEffect(()=>{
    // current user Details
    fetchUserDetails();
    // current user count cart product
    fetchCountCartProduct();
  },[])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails ,// user fetch detail
        cartProductCount , // current user add to cart product count
        fetchCountCartProduct
      }}>
        <ToastContainer position='top-center'/>
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>

      </Context.Provider>
    </>
  )
}

export default App
