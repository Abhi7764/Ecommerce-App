import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import allDomainLink from '../../common/allDomain';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    let [formData , setFormData] = useState({
        email : "",
        password: "",
    })

    const navigate = useNavigate()
    const {fetchUserDetails, fetchCountCartProduct} = useContext(Context);

    const handleOnChange = (e)=>{
        const {name, value} = e.target
        setFormData((prev)=>{
            return{
                ...prev,
                [name]: value,
            }
        });
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const dataResponse = await fetch(allDomainLink.login.url,{
            method : allDomainLink.login.method,
            credentials: "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(formData)
        });
        
        const data = await dataResponse.json();
        if(data.success){
            toast.success(data.message);
            fetchUserDetails();
            fetchCountCartProduct();
            navigate("/");
            
        }else{
            toast.error(data.message);
        }
    }

    // console.log("login data", formData)
  return (
    <section id='login'>
        <div className='mx-auto container p-7'>

           <div className='bg-white p-5 w-full max-w-sm mx-auto'>

            <div className='w-20 h-20 mx-auto mt-3'>
                <img src={loginIcons} alt="login icons" />
            </div>

            <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor="email">Email : </label>
                    <div className='bg-slate-100 p-2'>
                        <input type='email' id='email' 
                        placeholder='enter email' 
                        name='email'
                        value={formData.email}
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent'
                        required
                        />
                        
                    </div>
                </div>

                <div className='grid'>
                    <label htmlFor="password">Password : </label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input type={showPassword ? "text" : "password"} id='password'
                        placeholder='enter password' 
                        name='password'
                        value = {formData.password}
                        onChange={handleOnChange}
                        className='w-full h-full outline-none bg-transparent'
                        required
                        />
                        <div className='cursor-pointer text-xl ' onClick={()=>setShowPassword((prev)=>!prev)}>
                            <span >
                               { showPassword ? <FaEye /> :<FaEyeSlash/>} 
                            </span>
                        </div>
                    </div>
                    <Link to={"/forget-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                        Forget password?
                    </Link>
                </div>

                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] 
                    rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'
                >Login</button>
            </form>
            <p className='my-5'> Don&apos;t have account ? <Link to={"/signup"} className='text-red-700 hover:underline'> Sign Up</Link></p>
           </div>

        </div>
    </section>
  )
}

export default Login
