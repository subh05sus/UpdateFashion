/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ------------------------------------user

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

// --------------------------------------upload picture

// Function to upload an image
export const uploadPicture = async (picture: any) => {
  const formData = new FormData();
  formData.append("image", picture);
  const imageResponse = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });
  if (!imageResponse.ok) {
    throw new Error("Failed to upload image");
  }
  const data = await imageResponse.json();
  return data.imageUrl;
};

// Function to upload multiple pictures and return a comma-separated string of URLs
export const uploadPictures = async (pictures: any[]) => {
  try {
    const uploadedImageUrls = await Promise.all(
      pictures.map((picture) => uploadPicture(picture))
    );
    return uploadedImageUrls.join(",");
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

// ---------------------------------products

export const addProduct = async (productData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/products/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const editProduct = async (productId: string, productData: any) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products/edit/${productId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const deleteProduct = async (productId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products/delete/${productId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message);
  }
};

export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products/all`, {
    credentials: "include",
  });

  const products = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return products;
};

export const getProductById = async (productId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
    credentials: "include",
  });

  const product = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return product;
};

export const getProductsByCategory = async (category: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products/category/${category}`,
    {
      credentials: "include",
    }
  );

  const products = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }
  return products;
};

export const getProductsBySubCategory = async (subcategory: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products/subcategory/${subcategory}`,
    {
      credentials: "include",
    }
  );

  const products = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch products by subcategory");
  }
  return products;
}; 

// --------------------------------------------------------- reviews

export const addReview = async (reviewData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/reviews/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const editReview = async (reviewId: string, reviewData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/reviews/edit/${reviewId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const deleteReview = async (reviewId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/reviews/delete/${reviewId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const responseBody = await response.json();
    throw new Error(responseBody.message);
  }
};

export const getReviewsByProductId = async (productId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/reviews/product/${productId}`,
    {
      credentials: "include",
    }
  );

  const reviews = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return reviews;
};

export const getReviewById = async (reviewId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
    credentials: "include",
  });

  const review = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch review");
  }
  return review;
};

// --------------------------------banners

// Add a new banner
export const addBanner = async (imageUrl: string, link: string) => {
  const response = await fetch(`${API_BASE_URL}/api/banners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({ imageUrl, link }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

// Get all banners
export const getBanners = async () => {
  const response = await fetch(`${API_BASE_URL}/api/banners`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch banners");
  }

  return response.json();
};

// Delete a banner by ID
export const deleteBanner = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/banners/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

// -------------------------------homepage

// Function to get featured products
export const getFeaturedProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products/featured`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }
  return response.json();
};

// Function to get 5 footwear products
export const getFootwearProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products/sneakers-home`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch footwear products");
  }
  return response.json();
};

// Function to get 5 jerseys
export const getJerseys = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products/jerseys-home`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch jerseys");
  }
  return response.json();
};

export const getMenProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/men`);
    if (!response.ok) {
      throw new Error("Failed to fetch jerseys");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching men clothing products:", error);
    throw error;
  }
};

export const getWomenProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/women`);
    if (!response.ok) {
      throw new Error("Failed to fetch jerseys");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching women clothing products:", error);
    throw error;
  }
};

export const getCasualFootwearProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/casual`);
    if (!response.ok) {
      throw new Error("Failed to fetch jerseys");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching casual footwear products:", error);
    throw error;
  }
};

export const getFormalClothingProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/formal`);
    if (!response.ok) {
      throw new Error("Failed to fetch jerseys");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching formal clothing products:", error);
    throw error;
  }
};

export const getRandomProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/random`);
    if (!response.ok) {
      throw new Error("Failed to fetch jerseys");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching random products:", error);
    throw error;
  }
};



// -------------------------------------- orders
export const createOrder = async (orderData:any) => {
  const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',  // if you need to send cookies with the request
    body: JSON.stringify(orderData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message || 'Failed to create order');
  }

  return responseBody;
};



export const updateOrderStatus = async (orderId:any, orderStatus:any) => {
  const response = await fetch(`${API_BASE_URL}/api/orders/update-status/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',  // if you need to send cookies with the request
    body: JSON.stringify({ orderStatus }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message || 'Failed to update order status');
  }

  return responseBody;
};



export const getAllOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/api/orders/all`, {
    credentials: 'include',  // if you need to send cookies with the request
  });

  const orders = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  return orders;
};



export const getMyOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/api/orders/get-my-orders`, {
    credentials: 'include',  // if you need to send cookies with the request
  });

  const orders = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  return orders;
};




export const getOrderById = async (orderId:string) => {
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
    credentials: 'include',  // if you need to send cookies with the request
  });

  const order = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  return order;
};
