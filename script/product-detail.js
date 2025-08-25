// Get ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const detailContainer = document.getElementById("card-detail");

const BASE_URL = "https://fakestoreapi.com/products/";

const getProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const renderProductDetail = async () => {
  const product = await getProductById(productId);
  if (!product) {
    detailContainer.innerHTML = `<p class="text-red-500">❌ Product not found</p>`;
    return;
  }

  // Render stars dynamically
  const stars = [1, 2, 3, 4, 5]
    .map((i) => {
      if (i <= Math.floor(product.rating.rate)) {
        return `<svg class="h-5 w-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.443a1 1 0 00-1.175 0l-3.36 2.443c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.038 9.373c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z"/>
      </svg>`;
      } else if (i - product.rating.rate <= 0.5) {
        return `<svg class="h-5 w-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20">
        <defs><linearGradient id="halfGrad"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="gray"/></linearGradient></defs>
        <path fill="url(#halfGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.443a1 1 0 00-1.175 0l-3.36 2.443c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.038 9.373c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z"/>
      </svg>`;
      } else {
        return `<svg class="h-5 w-5 text-gray-300 inline" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.443a1 1 0 00-1.175 0l-3.36 2.443c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.038 9.373c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z"/>
      </svg>`;
      }
    })
    .join("");

  detailContainer.innerHTML = `
    <div class="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src="${product.image}" alt="${product.title}" class="w-full md:w-80 h-80 object-contain bg-gray-50 p-4 rounded-lg mx-auto" />
      <div class="flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2 text-gray-800">${product.title}</h1>
          <p class="text-gray-600 mb-4">${product.description}</p>
          <p class="text-gray-500 mb-2">Category: <span class="font-semibold">${product.category}</span></p>
          <div class="flex items-center mb-4">
            ${stars} 
            <span class="text-gray-600 text-sm ml-2">(${product.rating.count} reviews)</span>
          </div>
          <p class="text-3xl font-bold text-red-500 mb-4">$${product.price}</p>
        </div>
        <button onclick="history.back()" class="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition w-32 mt-4">
          ⬅ Back
        </button>
      </div>
    </div>
  `;
};

renderProductDetail();
