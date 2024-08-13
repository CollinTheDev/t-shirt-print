// Firebase configuration and initialization is in firebase-config.js

// Display products on the page
function displayProducts() {
    const productList = document.getElementById('product-list');
    // Fetch products from Firestore
    firebase.firestore().collection('products').get().then(snapshot => {
        snapshot.forEach(doc => {
            const product = doc.data();
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `<h2>${product.name}</h2>
                                    <img src="${product.image}" alt="${product.name}">
                                    <p>${product.description}</p>
                                    <p>$${product.price}</p>
                                    <a href="product.html?id=${doc.id}">View</a>`;
            productList.appendChild(productDiv);
        });
    });
}

// Display a single product
function displayProduct(productId) {
    firebase.firestore().collection('products').doc(productId).get().then(doc => {
        const product = doc.data();
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `$${product.price}`;
    });
}

// Add to cart functionality
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart');
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(productId => {
        firebase.firestore().collection('products').doc(productId).get().then(doc => {
            const product = doc.data();
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<h2>${product.name}</h2>
                                 <p>$${product.price}</p>`;
            cartItems.appendChild(itemDiv);
        });
    });
}

// Admin login
function loginAdmin() {
    const code = document.getElementById('admin-code').value;
    if (code === 'your-admin-code') {  // Replace with a secure method
        document.getElementById('admin-content').style.display = 'block';
        displayOrders();
    } else {
        alert('Incorrect code');
    }
}

// Display orders in the admin area
function displayOrders() {
    const orderLogs = document.getElementById('order-logs');
    firebase.firestore().collection('orders').get().then(snapshot => {
        snapshot.forEach(doc => {
            const order = doc.data();
            const orderDiv = document.createElement('div');
            orderDiv.innerHTML = `<p>Order ID: ${doc.id}</p>
                                  <p>Product: ${order.productName}</p>
                                  <p>Quantity: ${order.quantity}</p>`;
            orderLogs.appendChild(orderDiv);
        });
    });
}

// Checkout functionality with CashApp
function checkout() {
    // Implement checkout process
    alert('Checkout functionality to be implemented.');
}
