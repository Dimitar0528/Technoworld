 import type Product from "db/models/Product";
 import { isMobileDevice } from "./isMobile";
 import { convertCurrencyValue } from "./convertCurrency";
      function scrollTrackerProgress(){
        const progressBar = document.querySelector(
        ".scroll-tracker"
      ) as HTMLDivElement;
      if(!progressBar) return;
      document.addEventListener("DOMContentLoaded", () => {
        const storedScrollPercentage = sessionStorage.getItem("scrollPercentage");
        if (storedScrollPercentage !== null) progressBar.style.width = storedScrollPercentage;
      }); 

      window.addEventListener("scroll", () => {
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let scrollPercentage =
          ((document.documentElement.scrollTop / totalHeight) * 100).toFixed(2);
        progressBar.style.width = scrollPercentage + "%";

        // Store the scroll percentage in local storage
        sessionStorage.setItem("scrollPercentage", scrollPercentage + "%");
      });
    }
    scrollTrackerProgress();
    document.addEventListener("astro:before-swap",scrollTrackerProgress);

    function updateHTMLCurrency(){
      
    }
export async function updateWishlistDropdown() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === 'false') return;

    const chatbox = document.querySelector(".chatbox") as HTMLInputElement; if(!chatbox) return;
    const userUUID = chatbox.getAttribute("data-user-uuid");
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const wishlistQuality = document.querySelector('.qty') as HTMLElement;
    wishlistQuality.textContent = `${wishlist.length}`;

    try {
        const response = await fetch(`/api/wishlist/loadUserWishlist/${userUUID}`, {
            method: 'GET',
        });

        const wishListProducts = await response.json();
        const wishlistDropdown = document.querySelector('.wishlist-dropdown');
        if (!wishlistDropdown) return;


        wishlistDropdown.innerHTML = "";
     const displayedWishlistProducts = wishListProducts.slice(0,4);

        displayedWishlistProducts.forEach(wishListProduct => {  
        const product :Product  = wishListProduct.Product
          const wishlistItem = document.createElement('div');
            wishlistItem.classList.add('item');
  const originalPrice = product.price;
  const adjustedPrice = convertCurrencyValue(originalPrice);
            wishlistItem.innerHTML = `
                <a href='/products/getProduct/${product.category}/${product.uuid}' class='item'>
                    <img src="${product.image_src}" alt="${product.name}" class="item-image">  
                    <div class="item-details">
                        <p class="product-name">${product.name}</p>
    <p class="item-price">${adjustedPrice}</p>
                    </div>
                </a>
                <button class='remove-btn' data-product-id='${product.uuid}' data-notification-btn>Remove</button>
            `;
           
            wishlistDropdown.appendChild(wishlistItem);

            const removeBtn = wishlistItem.querySelector(".remove-btn") as HTMLButtonElement;
            removeBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                const clickedProductUUID = removeBtn.getAttribute("data-product-id");
                 wishlist = wishlist.filter(product_uuid => product_uuid !== clickedProductUUID);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                   const correspondingHeartIcon = document.querySelector(`.heart[data-product-id="${clickedProductUUID}"]`);

                    if (correspondingHeartIcon) {
                      const correspondingIconPath = correspondingHeartIcon.querySelector("[astro-icon] > path") as HTMLElement;
                      correspondingHeartIcon.classList.remove("liked");
                      correspondingIconPath.style.fill = 'white';
                    }
                    
                    const notificationInfo = document.querySelector('.toast-notification-info') as HTMLElement;
                    notificationInfo.textContent = "Product removed from wishlist!";
                
                const productCard = (e.target as HTMLElement).closest('.wishlist-item');
                productCard && productCard.remove();
                await fetch(`/api/wishlist/deleteWishListProduct/${userUUID}/${clickedProductUUID}`,{
                  method: 'DELETE', 
                })
                updateWishlistDropdown();
            });
          });

        // If there are more than four items, add a "Show more" link
        if (wishListProducts.length > 4) {
            const showMoreLink = document.createElement('a');
            showMoreLink.classList.add("inverted");
            showMoreLink.href = "/products/wishlist";
            showMoreLink.textContent = "Show more";
            wishlistDropdown.appendChild(showMoreLink);
        }
        if (location.href ===   `${location.origin}/products/wishlist`) wishlistDropdown.innerHTML = "";
       if(isMobileDevice()) wishlistDropdown.innerHTML = "";
    } catch (error) {
        console.error('Error fetching wishlist:', error);
    }
}

document.addEventListener("astro:page-load", updateWishlistDropdown);
export async function updateCartDropdown() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === 'false') return;

  const chatbox = document.querySelector(".chatbox") as HTMLInputElement;
  if (!chatbox) return;
  const userUUID = chatbox.getAttribute("data-user-uuid");

        let cart = JSON.parse(localStorage.getItem("shopping_cart") || "[]");

            const cartQuality = document.querySelector('.cart-qty') as HTMLElement;
 cartQuality.textContent = `${cart.length}`;
  try {
    const response = await fetch(`/api/shopping_cart/loadUserCart/${userUUID}`, {
      method: 'GET',
    });

    const cartProducts = await response.json();
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (!cartDropdown) return;

    cartDropdown.innerHTML = "";
    let totalCartQuantity = 0; // Initialize total quantity

    cartProducts.forEach(cartProduct => {
      const product: Product = cartProduct.Product;
      totalCartQuantity += cartProduct.product_quantity; // Add product quantity to total

      if (totalCartQuantity <= 4) {
        if(product.quantity === 0) return;
        for (let i = 0; i < cartProduct.product_quantity; i++) {
          const cartItem = document.createElement('div');
          cartItem.classList.add('item');
            const originalPrice = product.price;
  const adjustedPrice = convertCurrencyValue(originalPrice);
          cartItem.innerHTML = `
            <a href='/products/getProduct/${product.category}/${product.uuid}' class='item'>
              <img src="${product.image_src}" alt="${product.name}" class="item-image">  
              <div class="item-details">
                <p class="product-name">${product.name}</p>
    <p class="item-price">${adjustedPrice}</p>
              </div> 
            </a>
            <button class='remove-btn' data-product-id='${product.uuid}' data-notification-btn>Remove</button>
          `;
          cartDropdown.appendChild(cartItem);

          const removeBtn = cartItem.querySelector(".remove-btn") as HTMLButtonElement;
          removeBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const productUUID = removeBtn.getAttribute("data-product-id");
      cart = cart.filter((uuid:string) => uuid !== productUUID);
                    localStorage.setItem("shopping_cart", JSON.stringify(cart));

                 const notificationInfo = document.querySelector('.toast-notification-info') as HTMLElement;
                 notificationInfo.textContent = "Product removed from cart!";
                 
                 const productCard = (e.target as HTMLElement).closest('.wishlist-item');
                 productCard && productCard.remove();
                 await fetch(`/api/shopping_cart/deleteCartItem/${userUUID}/${productUUID}`,{
                   method: 'DELETE', 
                 });
            updateCartDropdown();
          });
        }
      }
    });

    if (totalCartQuantity > 4) {
      const showMoreLink = document.createElement('a');
      showMoreLink.classList.add("inverted");
      showMoreLink.href = "/products/cart";
      showMoreLink.textContent = "Show more";
      cartDropdown.appendChild(showMoreLink);
    }
    if (location.href === `${location.origin}/products/cart` || location.href === `${location.origin}/checkout/checkout` || 
    location.href === `${location.origin}/products/wishlist` ) 
    cartDropdown.innerHTML = "";
       if(isMobileDevice()) cartDropdown.innerHTML = ""; 

  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
}


document.addEventListener("astro:page-load", updateCartDropdown);

 
