import "./main.css";

//import "../scripts/main.js";
import "../scripts/swiper.js";

const first_element = document.getElementById("tea");
first_element.classList.add('active');

const menuItems = document.querySelectorAll(".our_pottery__subsection");

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        flush_child_elements(menuItems);
        this.classList.toggle('active-l');
        renderPage(this.id);
    });
});

function flush_child_elements() {
    const childrens = menuItems;
    for(const child of childrens) {
        child.classList.remove('active-l');
    }
}

function select_active_id() {
    const childrens = menuItems;
    for(const child of childrens) {
        child.classList.contains('active-l');
        return child.id;
    }
}

const BASE_URL = "https://ceramic-api.onrender.com";
const sym = (c) => (c === "EUR" ? "€" : c || "");

function toHTML(product) {
    const src = new URL(product.image, BASE_URL).toString();
    return `
    <div class="catalog__card" data-id="${product.id}" data-category="${product.category}">
        <img class="our_pottery__element_image" src="${src}" alt="${product.title}" loading="lazy">
        <h3 class="our_pottery__element_name element_text">${product.title}</h3>
        <h3 class="our_pottery__element_price element_text">${product.price.toFixed(2)} ${sym(product.currency)}</h3>
    </div>`;
}

async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/api/products`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
}

async function renderPage(category='tea') {

    console.log(select_active_id());
    const products = await fetchProducts();
    const filtered = category ? products.filter(p => p.category == category) : products;

    const containerClassName = "our_pottery__gallery__flex";
    const container = document.querySelector(`.${containerClassName}`);

    container.innerHTML = filtered.map(toHTML).join("");
    console.log(container.innerHTML);
}

document.addEventListener("DOMContentLoaded", () => {
    renderPage("tea");
});