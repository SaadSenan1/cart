let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// إعادة حساب المجموع عند التحميل
cart.forEach(item => {
    total += item.price;
});

renderCart();

function addToCart(name, price){
    cart.push({name, price, quantity:1});
    total += price;
    renderCart();
    showToast(`${name} added to cart!`);

    // حفظ السلة
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

function removeItem(index){

    total -= cart[index].price;

    cart.splice(index,1);

    // تحديث التخزين
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}

function renderCart(){

    const list = document.getElementById("cart-items");

    if(!list) return;

    list.innerHTML = "";

    cart.forEach((item,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeItem(${index})">X</button>
        `;

        list.appendChild(li);
    });

    const totalBox = document.getElementById("total-price");
    if(totalBox){
        totalBox.innerText = total;
    }
}

/* ================= SEARCH SYSTEM ================= */

const products = [
    "Phone",
    "Laptop",
    "Headphones",
    "Watch",
    "Tablet",
    "Smart TV",
    "Camera",
    "Speaker",
    "Keyboard",
    "Mouse"
];

const searchInput = document.getElementById("search-input");
const suggestions = document.getElementById("suggestions");

function showSuggestions(inputValue) {

    if(!suggestions) return;

    suggestions.innerHTML = "";

    if (inputValue.length === 0) {
        suggestions.style.display = "none";
        return;
    }

    const filtered = products.filter(product => 
        product.toLowerCase().includes(inputValue.toLowerCase())
    );

    if(filtered.length === 0){
        suggestions.style.display = "none";
        return;
    }

    filtered.forEach(item => {

        const li = document.createElement("li");
        li.textContent = item;

        li.addEventListener("click", () => {
            searchInput.value = item;
            suggestions.innerHTML = "";
            suggestions.style.display = "none";
            performSearch(item);
        });

        suggestions.appendChild(li);
    });

    suggestions.style.display = "block";
}

function performSearch(query) {
    alert("Searching for: " + query);
}

if(searchInput){

    searchInput.addEventListener("input", () => {
        showSuggestions(searchInput.value);
    });

    searchInput.addEventListener("keydown", (e) => {

        if(e.key === "Enter") {

            e.preventDefault();

            const query = searchInput.value.trim();

            if(query) {
                suggestions.innerHTML = "";
                suggestions.style.display = "none";
                performSearch(query);
            }
        }
    });
}

document.addEventListener("click", function(e){

    if(searchInput && suggestions){

        if(!searchInput.contains(e.target) && !suggestions.contains(e.target)){
            suggestions.innerHTML = "";
            suggestions.style.display = "none";
        }
    }
});

/* ================= CHECKOUT ================= */

function goToCheckout(){
    window.location.href = "checkout.html";
}

window.addEventListener("DOMContentLoaded", () => {

    const checkoutList = document.getElementById("checkout-cart-items");
    const checkoutTotal = document.getElementById("checkout-total-price");

    if(!checkoutList) return;

    // اقرأ السلة مباشرة من التخزين
    const checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];

    checkoutList.innerHTML = "";

    let checkoutSum = 0;

    checkoutCart.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item.name + " - $" + item.price;

        checkoutList.appendChild(li);

        checkoutSum += item.price;
    });

    checkoutTotal.textContent = checkoutSum;
});
function confirmOrder(){

    const container = document.querySelector(".checkout-container");
    const successBox = document.getElementById("order-success");

    // إخفاء الفورم
    container.style.display = "none";

    // إظهار رسالة النجاح
    successBox.style.display = "block";

    // مسح السلة (اختياري واحترافي)
    localStorage.removeItem("cart");
}
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;  // نص الإشعار حسب المنتج
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); // مدة الظهور 3 ثواني
}