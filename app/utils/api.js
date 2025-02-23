const API_BASE_URL = "http://localhost:5000";

export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
  const url = `${API_BASE_URL.replace(/\/$/, "")}${endpoint}`;
  const headers = {};

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
  };

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("Content-Type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: response.statusText };
    }

    if (!response.ok) {
      throw new Error(data.message || response.statusText || "Xatolik yuz berdi");
    }

    return data;
  } catch (error) {
    console.error("API xatosi:", error.message);
    throw new Error(error.message || "API bilan bog‘liq xatolik yuz berdi");
  }
};

// **Foydalanuvchilar API**
export const getUsers = async (token) => apiRequest("/user", "GET", null, token);
export const getUserById = async (id, token) => apiRequest(`/user/${id}`, "GET", null, token);
export const createUser = async (userData) => apiRequest("/user", "POST", userData);
export const updateUser = async (id, userData, token) => apiRequest(`/user/${id}`, "PUT", userData, token);
export const deleteUser = async (id, token) => apiRequest(`/user/${id}`, "DELETE", null, token);

// **Kategoriyalar API**
export const getCategories = async () => apiRequest("/category");
export const getCategoryById = async (id) => apiRequest(`/category/${id}`);
export const createCategory = async (categoryData, token) => apiRequest("/category", "POST", categoryData, token);
export const updateCategory = async (id, categoryData, token) => apiRequest(`/category/${id}`, "PUT", categoryData, token);
export const deleteCategory = async (id, token) => apiRequest(`/category/${id}`, "DELETE", null, token);

// **Mahsulotlar API**
export const getProducts = async () => apiRequest("/product");
export const getProductById = async (id) => apiRequest(`/product/${id}`);
export const getProductsByCategory = async (categoryId) => apiRequest(`/categories/${categoryId}/product`);
export const createProduct = async (productData, token) => apiRequest("/product", "POST", productData, token);
export const updateProduct = async (id, productData, token) => apiRequest(`/product/${id}`, "PUT", productData, token);
export const deleteProduct = async (id, token) => apiRequest(`/product/${id}`, "DELETE", null, token);
