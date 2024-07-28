import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrders from "../pages/AllOrders";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "home",
                element: <Home/>
            },
            {
                path: "forget-password",
                element: <ForgotPassword/>
            },
            {
                path: "signup",
                element: <SignUp/>
            },

            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children : [
                    {
                        path: "all-users",
                        element: <AllUsers/>,
                    },
                    {
                        path: "all-products",
                        element: <AllProducts/>,
                    },
                    {
                        path: "AllOrders",
                        element: <AllOrders/>,
                    },
                ]
            },
            {
                path: "category-product",
                element: <CategoryProduct/>
            },

            {
                path: "product/:id",
                element: <ProductDetails/>
            },

            {
                path: "search",
                element: <SearchProduct/>
            },
            {
                path: "success",
                element: <Success/>
            },
            {
                path: "cancel",
                element: <Cancel/>
            },
            {
                path: "order",
                element: <OrderPage/>
            },
        ]
    }
])

export default router;