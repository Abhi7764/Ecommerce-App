const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/users/signup");
const userLoginController = require("../controller/users/login");
const authToken = require("../middleware/authToken");
const adminAuth = require("../middleware/adminAuth");
const userLogout = require("../controller/users/userLogout");
const userDetailsController = require("../controller/users/userDetails");
const allUsers = require("../controller/users/allUsers");
const updateUser = require("../controller/users/updateUser");

const addProductController = require("../controller/products/addProduct");
const getProductsController = require("../controller/products/getProducts");
const updateProductController = require("../controller/products/updateProduct");
const singleProductCategory = require("../controller/products/getSingleProductCategory");
const categoryWiseProduct = require("../controller/products/getCategoryWiseProduct");
const getProductDetails = require("../controller/products/getProductDetails");
const addToCartController = require("../controller/users/addToCartController");
const countCartProduct = require("../controller/users/countCartProduct");
const addToCartViewProduct = require("../controller/users/addToCartViewProduct");
const updateCartProduct = require("../controller/users/updateCartProduct");
const deleteCartProduct = require("../controller/users/deleteCartProduct");
const searchProduct = require("../controller/products/searchProduct");
const filterProductController = require("../controller/products/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhook = require("../controller/order/webhook");
const getOrderDetalsController = require("../controller/order/getOrderDetals");
const allOrderController = require("../controller/order/allorders");


router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.get("/userLogout", userLogout);
router.get("/user-details", authToken, userDetailsController);

//admin Panel
router.get("/all-users", authToken, adminAuth, allUsers);
router.post("/update-user", authToken, adminAuth, updateUser);

//Add Product
router.post("/add-product", authToken, adminAuth, addProductController);
router.get("/get-products", authToken, adminAuth, getProductsController);
router.post("/update-product", authToken, adminAuth, updateProductController);
router.get("/get-productCategory", singleProductCategory);
router.post("/category-product", categoryWiseProduct)
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

// user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countCartProduct", authToken, countCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateCartProduct);
router.post("/delete-cart-product", authToken, deleteCartProduct);

// Payment ans orders
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhook) // /api/webhook
router.get("/orderDetails", authToken, getOrderDetalsController)
router.get("/allOrders", authToken, adminAuth, allOrderController);


module.exports = router;