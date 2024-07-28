import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import allDomainLink from '../../common/allDomain';
import { toast } from 'react-toastify';


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    let [formData , setFormData] = useState({
        name : "",
        email : "",
        password: "",
        confirmPassword: "",
        profilePic : ""
    })

    const navigate = useNavigate()
    const handleOnChange = (e)=>{
        const {name, value} = e.target
        setFormData((prev)=>{
            return{
                ...prev,
                [name]: value,
            }
        });
    }

    const handleUploadPic = async(e) => {
      const file = e.target.files[0];
      const imagePic = await imageTobase64(file)
      // console.log("file", imagePic);
      setFormData((prev)=>{
        return{
          ...prev,
          profilePic : imagePic
        }
      });
    }

    const handleSubmit = async(e) =>{
      e.preventDefault();
      if(formData.password === formData.confirmPassword){
        const dataResponse = await fetch(allDomainLink.signUp.url, {
          method: allDomainLink.signUp.method,
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(formData)
        });

        const data = await dataResponse.json();
        //console.log(data);
        if(data.success){
          toast.success(data.message);
          navigate("/login");
        }
        if(data.error){
          toast.error(data.message);
        }

      }else{
        toast.error("check your password and confirm password");
      }
      //setFormData({name: "", email: "", password: "", confirmPassword:""});
    }

  return (
    <section id='signup'>
        <div className='mx-auto container p-7'>

           <div className='bg-white p-5 w-full max-w-sm mx-auto'>

            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
              <div>
                <img src={formData.profilePic || loginIcons} alt="login icons" />
              </div>
              <form action="">
                <label htmlFor="file">
                  <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                    Upload photo
                  </div>
                </label>
                <input type="file" name="file" id="file" className='hidden'  onChange={handleUploadPic}/>
              </form>

            
            </div>

            <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                  <label htmlFor="name">Name : </label>
                  <div className='bg-slate-100 p-2'>
                      <input type='text' id='name' 
                      placeholder='enter name' 
                      name='name'
                      value={formData.name}
                      onChange={handleOnChange}
                      required
                      className='w-full h-full outline-none bg-transparent'/>
                  </div>
                </div>
                
                <div className='grid'>
                  <label htmlFor="email">Email : </label>
                  <div className='bg-slate-100 p-2'>
                      <input type='email' id='email' 
                      placeholder='enter email' 
                      name='email'
                      value={formData.email}
                      onChange={handleOnChange}
                      required
                      className='w-full h-full outline-none bg-transparent'/>
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
                      required
                      className='w-full h-full outline-none bg-transparent'
                      />
                      <div className='cursor-pointer text-xl ' onClick={()=>setShowPassword((prev)=>!prev)}>
                        <span >
                            { showPassword ? <FaEye /> :<FaEyeSlash/>} 
                        </span>
                      </div>
                    </div>
                </div>

                <div className='grid'>
                    <label htmlFor="confirmPassword">Confirm Password : </label>
                    <div className='bg-slate-100 p-2 flex'>
                      <input type={showConfirmPassword ? "text" : "password"} id='confirmPassword'
                      placeholder='enter confirm password' 
                      name='confirmPassword'
                      value = {formData.confirmPassword}
                      onChange={handleOnChange}
                      required
                      className='w-full h-full outline-none bg-transparent'
                      />
                      <div className='cursor-pointer text-xl ' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                        <span >
                            { showConfirmPassword ? <FaEye /> :<FaEyeSlash/>} 
                        </span>
                      </div>
                    </div>
                </div>

                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] 
                    rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'
                >Sign Up</button>
            </form>
            <p className='my-5'> Already have account ? <Link to={"/login"} className='text-red-700 hover:underline'> Login</Link></p>
           </div>

        </div>
    </section>
  )
}

export default SignUp
