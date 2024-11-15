import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../BreadCrum/Breadcrum";
import ProductDisplay from "./ProductDisplay";
import DescriptionBox from "../Component/DescriptionBox/DescriptionBox";

const Product = () => {
  const { all_product } = useContext(ShopContext);

  const { productId } = useParams();

  const product = all_product.find((e) => e.id=== Number(productId));

  return (
    <>
      <Breadcrum  product={product} />
      <ProductDisplay product={product}/>
      <DescriptionBox/>
    </>
  );
};

export default Product;


