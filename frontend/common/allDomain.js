const backendDomain = "http://localhost:8080"

const allDomainLink = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    login: {
        url: `${backendDomain}/api/login`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logOut: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUsers: {
        url: `${backendDomain}/api/all-users`,
        method: "get",
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post",
    },
    addProduct: {
        url: `${backendDomain}/api/add-product`,
        method: "post",
    },

    allProduct: {
        url: `${backendDomain}/api/get-products`,
        method: "get",
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post",
    },
    productCategory: {
        url: `${backendDomain}/api/get-productCategory`,
        method: "get",
    },

    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post",
    },

    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post",
    },

    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post",
    },
    countCartProduct: {
        url: `${backendDomain}/api/countCartProduct`,
        method: "get",
    },

    addToCartProductView: {
        url: `${backendDomain}/api/view-cart-product`,
        method: "get",
    },

    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post",
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post",
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get",
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post",
    },

    payment: {
        url: `${backendDomain}/api/checkout`,
        method: "post",
    },
    orderDetails: {
        url: `${backendDomain}/api/orderDetails`,
        method: "get",
    },
    allOrders: {
        url: `${backendDomain}/api/allOrders`,
        method: "get",
    },
}

export default allDomainLink;