import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState(searchParams.get("category") || "all");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortby") || "asc");
    const [searchTerm, setSearchTerm] = useState(searchParams.get("keyword") || "");

    // 🔹 Sync State with URL Params
    useEffect(() => {
        setCategory(searchParams.get("category") || "all");
        setSortOrder(searchParams.get("sortby") || "asc");
        setSearchTerm(searchParams.get("keyword") || "");
    }, [searchParams]);

    // 🔹 Update Search Term with Delay (Debounce)
    useEffect(() => {
        const handler = setTimeout(() => {
            const newParams = new URLSearchParams(searchParams);
            if (searchTerm) {
                newParams.set("keyword", searchTerm);
            } else {
                newParams.delete("keyword");
            }
            setSearchParams(newParams);
        }, 700);

        return () => clearTimeout(handler);
    }, [searchTerm, setSearchParams]);

    // 🔹 Handle Category Change
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (selectedCategory === "all") {
            newParams.delete("category");
        } else {
            newParams.set("category", selectedCategory);
        }
        setSearchParams(newParams);
    };

    // 🔹 Toggle Sort Order
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = prevOrder === "asc" ? "desc" : "asc";
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sortby", newOrder);
            setSearchParams(newParams);
            return newOrder;
        });
    };

    // 🔹 Clear Filters
    const handleClearFilters = () => {
        setSearchParams(new URLSearchParams());
    };

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Products"
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                />
            </div>

            {/* Category Selection */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <select value={category} onChange={handleCategoryChange} className="min-w-[120px]">
                    <option value="all">All</option>
                    {categories.map((item) => (
                        <option key={item.categoryId} value={item.categoryName}>
                            {item.categoryName}
                        </option>
                    ))}
                </select>

                {/* Sort Button */}
                <button onClick={toggleSortOrder} className="bg-blue-500 hover:bg-blue-700 rounded-md px-3 py-2">
                    Sort By {sortOrder === "asc" ? "🔼" : "🔽"}
                </button>

                {/* Clear Filters */}
                <button onClick={handleClearFilters} className="bg-rose-700 hover:bg-red-900 text-white px-3 py-2 rounded-md">
                    Clear Filter
                </button>
            </div>
        </div>
    );
};

export default Filter;
