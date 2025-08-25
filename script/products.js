let categoryContainer = document.getElementById("category-container");
const BASE_URL = "https://fakestoreapi.com/";

// Fetch products (all or by category)
const gotProduct = async (
  category = ["electronics", "jewelery", "men's clothing", "women's clothing"]
) => {
  let url =
    category === "all"
      ? `${BASE_URL}products`
      : `${BASE_URL}products/category/${encodeURIComponent(category)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
};

// Render products
const renderProducts = async (category = "all") => {
  const products = await gotProduct(category);
  let card = "";

  products.map((product) => {
    console.log("ID:", product.id, "Image:", product.image);

    card += `
      <div class="bg-[#e5e7e9] p-2.5 rounded-2xl border border-gray-300 max-w-xs mx-auto flex flex-col h-full relative">
  <a href="./card-detail.html?id=${product.id}" class="block">
    <img class="w-full h-60 object-contain rounded-lg" src="${
      product.image
    }" alt="${product.title}" />
  </a>

  <!-- Like Button -->
  <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
    </svg>
  </button>

  <!-- Product Info -->
  <h3 class="text-lg font-semibold mb-1 text-gray-800 line-clamp-1">${
    product.title
  }</h3>
  <small class="text-gray-600 mb-2 line-clamp-2">${product.description}</small>

  <!-- Rating -->
  <div class="flex items-center mb-2">
    ${[1, 2, 3, 4, 5]
      .map((i) => {
        if (i <= Math.floor(product.rating.rate)) {
          return `<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.443a1 1 0 00-1.175 0l-3.36 2.443c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.038 9.373c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z"/></svg>`;
        } else if (i - product.rating.rate <= 0.5) {
          // half star
          return `<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs><linearGradient id="halfGrad"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="gray"/></linearGradient></defs>
          <path fill="url(#halfGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.443a1 1 0 00-1.175 0l-3.36 2.443c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.038 9.373c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z"/>
        </svg>`;
        } else {
          return `<svg class="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.443a1 1 0 00-1.175 0l-3.36 2.443c-.784.57-1.838-.197-1.539-1.118l1.285-3.945a1 1 0 00-.364-1.118L2.038 9.373c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z"/></svg>`;
        }
      })
      .join("")}
    <span class="text-gray-600 text-sm ml-2">(${product.rating.count})</span>
  </div>

  <!-- Price -->
  <p class="text-lg font-bold text-red-500 mb-3">$${product.price}</p>

  <!-- Buy Button -->
  <button class="w-full bg-blue-500 text-white text-sm py-2 rounded-lg hover:bg-blue-600 transition mt-auto">
    Buy Now
  </button>
</div>

    `;
  });

  categoryContainer.innerHTML = card;
};

// Load all products first
renderProducts();

// Attach click events to category links
// Just attach category filter events
document.querySelectorAll(".category-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = link.getAttribute("data-category");
    renderProducts(category); // <-- call from product.js
  });
});

