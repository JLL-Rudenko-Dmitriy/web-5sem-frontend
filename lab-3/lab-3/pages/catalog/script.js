import "./main.css";

import "../scripts/main.js";
import "../scripts/swiper.js";

const first_element = document.getElementById("tea");
first_element.classList.add('active');

const menuItems = document.querySelectorAll(".our_pottery__subsection");

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        flush_child_elements(menuItems);
        this.classList.toggle('active');
    });
});

function flush_child_elements() {
    const childrens = menuItems;
    for(const child of childrens) {
        child.classList.remove('active');
    }
}