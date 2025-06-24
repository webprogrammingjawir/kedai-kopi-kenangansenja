//Toggle class active for humberger menu


const navbarNav = document.querySelector
('.navbar-nav');

document.querySelector('#hamburger-menu').
onclick = ()=> {
    navbarNav.classList.toggle('active');
};


// //Toggle class active for Search form

const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = () => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

//Toggle classs for shoppping cart
const shopppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = () => {
    shopppingCart.classList.toggle('active');
    e.preventDefault();
};



// Klik diluar elemen

const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function(e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!sc.contains(e.target) && !shopppingCart.contains(e.target)) {
        shopppingCart.classList.remove('active');
    }

});


// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');

const itemDetailButtons = document.querySelectorAll('.item-detail-button');


itemDetailButtons.forEach((btn) => {

    btn.onclick = (e) => {
      itemDetailModal.style.display = 'flex';
      e.preventDefault();
    }; 
})



// klik tombol close model

document.querySelector('.modal .close-icon').onclick = (e) =>{
    itemDetailModal.style.display ='none';
    e.preventDefault();
}

// klik luar modal

window.onclick = (e) => {
    if (e.target === itemDetailModal){
        itemDetailModal.style.display = 'none';
    }
};
