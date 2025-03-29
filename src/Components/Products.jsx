import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { BiError } from "react-icons/bi";
import { useEffect } from "react";
import { fetchCategories, fetchProducts } from "../store/actions";
import Filter from "./Filter";
import useProductFilter from "./useProductFilter";
import Loader from "./Loader";

const Products = () => {
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { products, categories } = useSelector((state) => state.products);
    
    const dispatch = useDispatch();
    
    useProductFilter(); // Runs filtering logic on mount

    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories?.length]); // Dependency to avoid unnecessary re-fetching

    return (
        <div className="flex flex-wrap lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
            {/* 🔹 Filter Component */}
            <div className="w-full mb-6">
                <Filter categories={categories || []} />
            </div>

            {/* 🔹 Loading State */}
            {isLoading ? (
                <Loader text={"Products loading"} />
            ) : errorMessage ? (
                <div className="flex justify-center items-center h-[200px]">
                    <BiError className="text-slate-800 text-xl mr-2" />
                    <span className="text-slate-800 text-lg font-medium">
                        {errorMessage}
                    </span>
                </div>
            ) : (
                <div className="min-h-[700px] flex flex-wrap gap-6">
                    {products?.length > 0 ? (
                        products.map((item, i) => <ProductCard key={i} {...item} />)
                    ) : (
                        <p className="text-gray-600 text-lg">No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Products;
