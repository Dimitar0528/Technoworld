import { updateWishlistDropdown,updateCartDropdown } from "src/scripts/dropdowns";
export function addProductToCart_Wishlist(product_wrapper_class: string = '.wishlist-item'){
document.addEventListener("astro:page-load", async () => {
    const notificationInfo = document.querySelector('.toast-notification-info') as HTMLElement;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === 'false') return;

    const chatbox = document.querySelector(".chatbox") as HTMLInputElement; if(!chatbox) return;
    const userUUID = chatbox.getAttribute("data-user-uuid")!;
    
    try {
          
      let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

        // Set up heart icons based on wishlist data
        const heartIcons = document.querySelectorAll(".heart");
         await Promise.all(Array.from(heartIcons).map(async (heartIcon) => {
            const productCard = heartIcon.closest(product_wrapper_class) as HTMLDivElement; if(!productCard) return;
            const productUUID = productCard.dataset.productId;
            const isProductInWishlist = wishlist.some(product_uuid => product_uuid === productUUID);
            // Set red class for heart button if product is in wishlist
            if (isProductInWishlist) {
                heartIcon.classList.add("liked");
                const iconPath = heartIcon.querySelector("[astro-icon] > path") as HTMLElement;
                if (iconPath) {
                    iconPath.style.fill = 'var(--clr-accent-400)';
                }
            }

            // Add click event listener for heart buttons
            heartIcon.addEventListener("click", async function () {
                const iconPath = heartIcon.querySelector("[astro-icon] > path") as HTMLElement;

                if (heartIcon.classList.contains("liked")) {
                  notificationInfo.textContent = "Product removed from wishlist!";
                  heartIcon.classList.remove("liked");
    
                  if (iconPath) {
                      iconPath.style.fill = 'white';
                  }
                    // Remove product from wishlist
                    wishlist = wishlist.filter(product_uuid => product_uuid !== productUUID);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
              await fetch(`/api/wishlist/deleteWishListProduct/${userUUID}/${productUUID}`,{
                method: 'DELETE', 
              })
                    
                } else {
                    // Add product to wishlist
                    const productInfo = {
                        user_uuid: userUUID,
                        product_uuid: productUUID,
                    };
                    notificationInfo.textContent = "Product added to wishlist!";

                    // Update heart button style
                    heartIcon.classList.add("liked");
                    if (iconPath) {
                        iconPath.style.fill = 'var(--clr-accent-400)';
                    }
                    const response = await fetch('/api/wishlist/createWishListItem', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json ' },
                        body: JSON.stringify(productInfo)
                    });
                    const data = await response.json();
                   const{product_uuid} = data;
                    wishlist.push(product_uuid)
                    localStorage.setItem('wishlist',JSON.stringify(wishlist));
                }

                // Update wishlist dropdown
                updateWishlistDropdown();
            });
        }));


        const addToCartButtons = document.querySelectorAll(".add-to-cart");
      let cart = JSON.parse(localStorage.getItem("shopping_cart") || "[]");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", async (e) => {
              notificationInfo.textContent = "Product added to cart!";

               const productUUID = ((e.target as HTMLElement).closest(product_wrapper_class) as HTMLDivElement)!.dataset.productId;
                 const productInfo = {
                        user_uuid: userUUID,
                        product_uuid: productUUID,
                    };
               const response =  await fetch('/api/shopping_cart/createCartItem',{
                method: "POST",
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify(productInfo)
               })
               const shoppingCartProducts = await response.json();
               const{newShoppingCartItem = null, existingCartItem = null} = shoppingCartProducts;
             if(newShoppingCartItem !== null){
                cart.push(newShoppingCartItem.product_uuid)
                localStorage.setItem("shopping_cart",JSON.stringify(cart))
             }
             if(existingCartItem !== null){
                cart.push(existingCartItem.product_uuid)
                localStorage.setItem("shopping_cart",JSON.stringify(cart))
             }
               

updateCartDropdown();
            });
        });
    } catch (error) { 
        console.error('Error fetching wishlist:', error);
    }
});
}