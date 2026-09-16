/* ================= NAVIGATION ================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/* Close mobile menu when clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


/* ================= DARK / LIGHT MODE ================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

});


/* ================= CART ================= */

let cart = [];


/* Add item */

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        openCart();

    });

});


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-info">

                <strong>${item.name}</strong>

                <span>
                    $${item.price.toFixed(2)}
                </span>

            </div>


            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <button
                class="remove-item"
                onclick="removeItem(${index})"
            >
                Remove
            </button>

        `;

        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        "$" + total.toFixed(2);

}


/* ================= QUANTITY ================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


/* ================= REMOVE ================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ================= CART MODAL ================= */

const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");


function openCart() {

    cartOverlay.classList.add("active");

}


function closeCartBox() {

    cartOverlay.classList.remove("active");

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartBox);


/* Click outside cart */

cartOverlay.addEventListener("click", (event) => {

    if (event.target === cartOverlay) {
        closeCartBox();
    }

});


/* ================= SEARCH ================= */

const searchInput =
    document.getElementById("searchInput");

const foodCards =
    document.querySelectorAll(".food-card");


searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase().trim();


    foodCards.forEach(card => {

        const foodName =
            card.dataset.name.toLowerCase();

        if (foodName.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


/* ================= CATEGORIES ================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category =
            button.dataset.category;


        foodCards.forEach(card => {

            const cardCategory =
                card.dataset.category;

            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    alert(
        "Thank you, " +
        name +
        "! Your message has been received."
    );

    contactForm.reset();

});


/* ================= CHECKOUT ================= */

const checkoutBtn =
    document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    let orderText = "Your Order:\n\n";

    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        orderText +=
            item.name +
            " x " +
            item.quantity +
            " = $" +
            itemTotal.toFixed(2) +
            "\n";

    });


    orderText +=
        "\nTotal: $" +
        total.toFixed(2);


    alert(orderText);


    /* Clear cart after checkout */

    cart = [];

    updateCart();

    closeCartBox();

});