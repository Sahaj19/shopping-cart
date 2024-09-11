## Flow for the index.html Page

1. **Product Quantity Management:**
   - When the `+/-` button is clicked, the product count increases or decreases accordingly.
   - This change triggers the `update(id)` function, which updates the individual product quantity in the UI.

2. **Cart Management:**
   - The `totalCartItemsCalculator()` function continuously updates the total count of items in the cart.

3. **State Maintenance:**
   - The `productsBasket` array is updated with every interaction (adding, updating, or removing items).
   - If an item's quantity becomes zero, it is automatically removed from the `productsBasket` array.
   - The updated `productsBasket` is saved to `localStorage` after every change to ensure data persistence even after a page refresh.

4. **Initialization:**
   - On first load, `productsBasket` is initialized as empty but gets updated as the user interacts with the cart.

## Flow for the cart.html Page

1. **Product Rendering:**
   - If the basket is maintained in `localStorage`, products are rendered for checkout; otherwise, a "Back to Home" button is displayed.

2. **Product Details Retrieval:**
   - Based on the `productsBasket` stored in `localStorage`, additional product details like `productImg`, `productPrice`, and `productCount` are retrieved from `data.js` and rendered.

3. **Item Removal:**
   - The remove button (cross icon) removes the respective product from the cart based on its `id`.

4. **Dynamic UI Updates:**
   - The UI updates dynamically with every increment or decrement in product quantity, including the recalculated total amounts.

5. **Clear Cart:**
   - Clicking the "Clear Cart" button removes all data from the cart and updates the UI accordingly, clearing the persisted data from `localStorage`.


Deployed Here : https://cartalike.netlify.app