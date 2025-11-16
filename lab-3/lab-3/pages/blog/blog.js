import "./main.css";

import "../scripts/main.js";
import "../scripts/swiper.js";

const API_BASE = "https://ceramic-api.onrender.com";
const POSTS_URL = new URL("/api/posts", API_BASE).toString();

const wrap = document.querySelector(".blog__flex");

const card = (a) => {
    const imgSrc = a.image ? new URL(a.image, API_BASE).toString() : "";
    return `
    <div class="blog__element">
        <div class="blog__element__flex">
            <img src="${imgSrc}" class="blog__element_image" alt="${a.title}" loading="lazy">
            <div class="blog__element_name_btn">
                <h2 class="blog__name">${a.title}</h2>
                <input type="button" class="blog__button styled-button" value="read">
            </div>
        </div>
        <p class="blog__text">${a.excerpt ?? ""}</p>
    </div>
  `;
};

async function fetchArticles() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(POSTS_URL, {
            method: "GET",
            headers: {Accept: "application/json"},
            cache: "no-store",
            mode: "cors",
            credentials: "omit",
            signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) throw new Error("Bad content-type");

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Bad payload: expected an array");

        return data;
    } finally {
        clearTimeout(timer);
    }
}

async function initBlog() {
    if (!wrap) return;
    try {
        const items = await fetchArticles();
        wrap.innerHTML = items.map(card).join("");
    } catch (e) {
        console.error(e);
        wrap.innerHTML = `<div class="error">Failed to load (${e.message})</div>`;
    }
}

document.addEventListener("DOMContentLoaded", initBlog);