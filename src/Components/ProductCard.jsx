import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";


 const ProductCard = ({
    image, productId, productName, description, 
    quantity, price ,discount, specialPrice,
 }) => {
    const [openProductViewModal, setOpenProductViewModal ] = useState (false);
    const buttonLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;

    const handleProductView = (product) => {
        setSelectedViewProduct(product) ;
        setOpenProductViewModal(true);
    }

    return(
        <div className="flex flex-wrap justify-center border rounded-lg w-80 h-100 shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {
                handleProductView( {id: productId, productName, description, image,
                    quantity, price ,discount, specialPrice,
                })
            }} 
                    className="w-sm overflow-hidden aspect-[9/4]">
             <img   className="w-full h-32 sm:h-40 md:h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    src={image} 
                    alt={productName} />
                
            </div>
            <div className="p-4">
                <h2 onClick={()  => {
                handleProductView( {id: productId, productName, description, image,
                    quantity, price ,discount, specialPrice, 
                })
            }}
                    className="text-lg font-semibold mb-2 cursor-pointer">
                    {productName}
                </h2>
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
                
                <div className="flex items-center justify-between"> 
                {specialPrice ? (

                
                <div className="flex flex-col">
                    <span className="text-gray-400 line-through"> 
                       ${Number(price).toFixed(2)}
                    </span>
                
                    <span className="text-gray-700 text-xl font-bold "> 
                       ${Number(specialPrice).toFixed(2)}
                    </span>
                </div> 
                ) : ( 
               
                    <span className="text-gray-700 font-bold line-through"> 
                        {"  "}
                       ${Number(price).toFixed(2)}
                    </span>
                )}

                <button 
                    disabled={!isAvailable || buttonLoader}
                    onClick={() => {}}
                    className={`bg-blue-500 ${isAvailable ? "opacity-500 hover:bg-blue-700" : "bg-red-500"}
                    text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 flex justify-center`}>
                    <FaShoppingCart className="mr-2"/>
                    {isAvailable ? "Add to Cart" : "Out of Stock"}
                </button>
                </div>
            </div>
            <ProductViewModal 
            open={openProductViewModal}
            setOpen={setOpenProductViewModal}
            product={selectedViewProduct}
            isAvailable={isAvailable}/>
        </div>
    )
}

export default ProductCard;