import { CategoryList } from "../components/CategoryList"
import { BannerProduct } from "../components/BannerProduct"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VerticalCardProduct from "../components/VerticalCardProduct"

const Home = () => {
    return (
        <>
            <CategoryList/>
            <BannerProduct/>
            <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
            <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
            <VerticalCardProduct category={"mobiles"} heading={"Popular's Mobiles"}/>
            <VerticalCardProduct category={"mouse"} heading={"Popular's Mouse"}/>
            <VerticalCardProduct category={"televisions"} heading={"Top's Telivisions"}/>
            <VerticalCardProduct category={"refrigerator"} heading={"Top's Refrigerator"}/>
            <VerticalCardProduct category={"camera"} heading={"Popular's Camera"}/>
            <VerticalCardProduct category={"trimmers"} heading={"Popular's Trimmers"}/>
            <HorizontalCardProduct category={"speakers"} heading={"Popular's Speakers"}/>
            <HorizontalCardProduct category={"earphones"} heading={"Earphones"}/>
        </>
    )
}
export default Home

