import allDomainLink from "../../common/allDomain";
import { toast } from 'react-toastify'

const addToCard = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    //console.log(id)
    const fetchData = await fetch(allDomainLink.addToCartProduct.url, {
        method: allDomainLink.addToCartProduct.method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: id
        })
    });
    const responseData = await fetchData.json()
    if (responseData.success) {
        toast.success(responseData.message);
    }
    if (responseData.error) {
        toast.error(responseData.message);
    }
    return responseData;
}

export default addToCard;