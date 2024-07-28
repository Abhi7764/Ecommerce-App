import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import allDomainLink from "../../common/allDomain";
import { toast } from "react-toastify"
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import Role from "../../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  //console.log("user header", user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useLocation()
  const URlSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URlSearch.getAll('q')
  const [search, setSearch] = useState(searchQuery)

  //console.log("searchInput", searchInput?.search.split("=")[1])

  const handleLogout = async() =>{
    const fetchData = await fetch(allDomainLink.logOut.url,{
      method : allDomainLink.logOut.method,
      credentials : 'include'
    })

    const data = await fetchData.json();

    if(data.success){
      toast.success(data.message);
      dispatch(setUserDetails(null))
      navigate("/");
    }else{
      toast.error(data.message);
    }
  }
  
  const  handleSearch = (e) =>{
    const { value } = e.target 
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  const handleOnCart = () =>{
    if(user?._id){
      navigate("/cart");
    }else{
      toast.error("First Login Please!");
    }
  }

  return (
    <div>
      <header className="h-16 shadow-md bg-white fixed w-full z-40">
        <div className="container mx-auto h-full flex items-center px-4 justify-between">
          <div className="text-xl font-semibold px-4">
            <Link to={"/"}><b>Home</b></Link>
          </div>

          <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
            <input type="text" placeholder="search product here..."  className="w-full outline-none " onChange={handleSearch} value={search}/>
            <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
              <GrSearch/>
            </div>
          </div>

          <div className="flex items-center gap-7 ">
            <div className="relative flex justify-center">
              {
                
                user && (
                    user?.role === Role.Admin ? (
                      <div className="text-2xl cursor-pointer relative flex justify-center" onClick={()=>setMenuDisplay(prev => !prev)}>
                        <img src={user?.profilePic} className="w-9 h-9 rounded-full" alt={user?.name}/>
                      </div>
                    ):(
                      <div className="relative flex justify-center cursor-pointer">
                        {
                          user?.profilePic ?(
                            <div className="flex items-center justify-center text-2xl w-9 h-9 
                              bg-slate-400 text-white font-semibold rounded-full"
                              onClick={()=>setMenuDisplay(prev => !prev)}
                            >
                              <img src={user?.profilePic} className="w-9 h-9 rounded-full" alt={user?.name}/>
                            </div>
                            
                          ):(
                            <div className="flex items-center justify-center text-2xl  
                              w-9 h-9 bg-slate-400 text-white font-semibold rounded-full"
                              onClick={()=>setMenuDisplay(prev => !prev)}
                            >
                              {user?.name.charAt(0).toUpperCase()}
                            </div>
                          )
                        }
                        
                      </div>
                    )
                  )
                
                }

              {
                menuDisplay && (
                  <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                    <nav >
                      {/* After complete project write the "hidden md:block" in the Link */}
                      {
                        user?.role === Role.Admin ? (
                          <div className="flex flex-col">
                            <Link to={"admin-panel/all-products"} 
                            className="whitespace-nowrap hover:bg-slate-100 p-1"
                            onClick={()=>setMenuDisplay(prev => !prev)}
                            >Admin Panel</Link>
                            <Link to={"/order"}
                            className="whitespace-nowrap hover:bg-slate-100 p-1"
                            onClick={()=>setMenuDisplay(prev => !prev)}
                            >Orders</Link>
                          </div>
                        ):(
                          <Link to={"/order"}
                            className="whitespace-nowrap hover:bg-slate-100 p-1"
                            onClick={()=>setMenuDisplay(prev => !prev)}
                          >Orders</Link>
                        )
                      }
                      
                    </nav>
                  </div>
                )
              }
            </div>

            <div className="text-2xl cursor-pointer relative" onClick={handleOnCart}>
              <span><FaShoppingCart /></span>
              {
                user?._id ? (
                  <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    <p className="text-sm">{context?.cartProductCount}</p>
                  </div>
                ):(
                  <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    <p className="text-sm">{0}</p>
                  </div>
                )
              }
              
            </div>

            <div className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 cursor-pointer">
              {
                user?._id ? (
                  <button onClick={handleLogout}>Logout</button>
                ):(
                  <Link to={"/login"} >
                    Login
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
