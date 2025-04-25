import api from "../../api/api";

export const fetchProducts = (queryString, categoryId ) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });

        let endpoint = categoryId
            ? `/public/categories/${categoryId}/products?${queryString}`
            : `/public/products?${queryString}`;

        const { data } = await api.get(endpoint);

        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });

        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {
        console.error("❌ Fetch Products Error:", error.response || error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
        });
    }
};


export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });

        const { data } = await api.get(`/public/categories`);

        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
        });

        // Optionally fetch products for the first category
        if (data.content.length > 0) {
            dispatch(fetchProducts("", data.content[0].categoryId));
        }

        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {
        console.error("❌ Fetch Categories Error:", error.response || error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
        });
    }
};
