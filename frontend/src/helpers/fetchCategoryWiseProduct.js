import allDomainLink from "../../common/allDomain";

const fetchCategoryWiseProduct = async (category) => {
    const fetchData = await fetch(allDomainLink.categoryWiseProduct.url, {
        method: allDomainLink.categoryWiseProduct.method,
        credentials: 'include',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ category })
    })
    const dataResponse = await fetchData.json();
    return dataResponse;
}

export default fetchCategoryWiseProduct;