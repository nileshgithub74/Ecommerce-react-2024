import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../BreadCrum/Breadcrum";
import ProductDisplay from "./ProductDisplay";
import DescriptionBox from "../Component/DescriptionBox/DescriptionBox";
import RelatedProduct from "../Component/RelatedProduct/RelatedProduct";

const Product = () => {
  const { all_product, loading } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="animate-pulse flex flex-col lg:flex-row gap-10">
          <div className="flex-1 bg-gray-200 rounded-2xl h-96" />
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-gray-200 rounded h-8 w-3/4" />
            <div className="bg-gray-200 rounded h-6 w-1/2" />
            <div className="bg-gray-200 rounded h-10 w-1/3" />
            <div className="bg-gray-200 rounded h-12 w-48 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProduct category={product.category} />
    </>
  );
};

export default Product;


