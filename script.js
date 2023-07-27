// JavaScript code for shopping cart functionality

let cartCount = 0;
let cartItems = [];

function updateCartCount(count) {
    cartCount = count;
    document.getElementById('cart-count').textContent = cartCount;
}

function updateTotalAmount() {
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} 
            <button class="remove-btn">Remove</button>
            <button class="decrement-btn" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increment-btn" data-index="${index}">+</button>
        `;
        cartList.appendChild(cartItem);
    });

    updateCartCount(cartItems.length);
    updateTotalAmount();
}

// Add event listener to remove button in cart items
document.getElementById('cart-items').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-btn')) {
        const itemIndex = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        cartItems.splice(itemIndex, 1);
        updateCart();
    } else if (event.target.classList.contains('increment-btn')) {
        const itemIndex = parseInt(event.target.dataset.index);
        cartItems[itemIndex].quantity++;
        updateCart();
    } else if (event.target.classList.contains('decrement-btn')) {
        const itemIndex = parseInt(event.target.dataset.index);
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity--;
            updateCart();
        }
    }
});

// Add event listener to the "Add to Cart" buttons in product listings
document.getElementById('product-listing').addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart')) {
        const product = event.target.parentElement;
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('p:nth-of-type(2)').textContent.replace('Price: $', ''));
        addToCart(productName, productPrice);
    }
});

function addToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Function to clear the entire cart
function clearCart() {
    cartItems = [];
    updateCart();
}

// Function to search products by name
function searchProducts(keyword) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    // Update the product listing with filteredProducts
}

// Function to sort products by name, price, or category
function sortProducts(sortBy) {
    if (sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'category') {
        products.sort((a, b) => a.category.localeCompare(b.category));
    }
    // Update the product listing with sorted products
}

// Add more JavaScript code for other functionalities as needed
// Get a reference to the "Clear Cart" button and the cart items list
const clearCartButton = document.getElementById("clear-cart");
const cartItemsList = document.getElementById("cart-items");

// Add a click event listener to the "Clear Cart" button
clearCartButton.addEventListener("click", () => {
  // Remove all items from the cart
  while (cartItemsList.firstChild) {
    cartItemsList.removeChild(cartItemsList.firstChild);
  }
});

