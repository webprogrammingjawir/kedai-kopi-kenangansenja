document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 25000 },
            { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 30000 },
            { id: 3, name: 'Primo Passo', img: '3.jpg', price: 35000 },
            { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 28000 },
            { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 32000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,

        add(newItem) {
            // Cek apakah item sudah ada di keranjang
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // Jika belum ada
            if (!cartItem) {
                this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // Jika sudah ada, cek apakah itemnya berbeda
                this.items = this.items.map((item) => {
                    // Jika item yang sama
                    if (item.id === newItem.id) {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    } else {
                        return item;
                    }
                });
            }
        },

        remove(id) {
            // Ambil item yang mau dihapus berdasarkan ID
            const cartItem = this.items.find((item) => item.id === id);

            // Jika quantity > 1
            if (cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    // Jika item yang sama
                    if (item.id === id) {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    } else {
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                // Jika quantity-nya 1, hapus dari array
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

// Konversi ke format Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};


// Event listener untuk checkout
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutForm = document.getElementById('checkoutForm');

    if (checkoutButton && checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Mencegah form submit default

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            // Validasi sederhana
            if (!name || !email || !phone) {
                alert('Mohon lengkapi semua data pelanggan.');
                return;
            }

            // Dapatkan data keranjang dari Alpine.js store
            const cartItems = Alpine.store('cart').items;
            const totalAmount = Alpine.store('cart').total;

            if (cartItems.length === 0) {
                alert('Keranjang belanja kosong. Silakan tambahkan produk terlebih dahulu.');
                return;
            }

            // Buat teks untuk WhatsApp
            let whatsappMessage = `Halo, saya ingin memesan:\n\n`;
            cartItems.forEach((item, index) => {
                whatsappMessage += `${index + 1}. ${item.name} (${rupiah(item.price)}) x ${item.quantity} = ${rupiah(item.total)}\n`;
            });

            whatsappMessage += `\nTotal: ${rupiah(totalAmount)}`;
            whatsappMessage += `\n\nDetail Pelanggan:\n`;
            whatsappMessage += `Nama: ${name}\n`;
            whatsappMessage += `Email: ${email}\n`;
            whatsappMessage += `Telepon: ${phone}\n\n`;
            whatsappMessage += `Terima kasih!`;

            // Encode pesan untuk URL WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Ganti nomor telepon ini dengan nomor tujuan WhatsApp kamu
            const phoneNumber = '6281575906862'; // Contoh: Ganti dengan nomor WhatsApp kamu
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Arahkan ke WhatsApp
            window.location.href = whatsappUrl;

            // Opsional: Reset keranjang setelah checkout
            // Alpine.store('cart').items = [];
            // Alpine.store('cart').total = 0;
            // Alpine.store('cart').quantity = 0;
        });
    }
});

// Script untuk fitur lain seperti search, hamburger menu, dan modal box (dari script.js atau bisa digabung)
// Ini adalah contoh bagaimana Anda bisa mengintegrasikan kode script.js ke dalam app.js jika diinginkan
// Jika script.js sudah ada dan berfungsi, biarkan saja terpisah.

// Toggle class active untuk search form
const searchButton = document.querySelector('#search-button');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

searchButton.addEventListener('click', (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
});

// Toggle class active untuk shopping cart
const shoppingCartButton = document.querySelector('#shopping-cart-button');
const shoppingCart = document.querySelector('.shopping-cart');

shoppingCartButton.addEventListener('click', (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
});

// Toggle class active untuk hamburger menu
const hamburgerMenu = document.querySelector('#hamburger-menu');
const navbarNav = document.querySelector('.navbar-nav');

hamburgerMenu.addEventListener('click', (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
});

// Klik di luar elemen untuk menghilangkan nav, search, dan shopping cart
document.addEventListener('click', (e) => {
    if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!shoppingCartButton.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});


// Modal Box
const itemDetailButtons = document.querySelectorAll('.item-detail-button');
const modal = document.querySelector('#item-detail-modal');
const closeIcon = document.querySelector('.close-icon');

itemDetailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        modal.style.display = 'flex';
        e.preventDefault();
    });
});

closeIcon.addEventListener('click', (e) => {
    modal.style.display = 'none';
    e.preventDefault();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contoh: Menambahkan produk dari modal ke keranjang (sesuaikan dengan logika Alpine.js Anda)
// Anda perlu menambahkan logika ini jika tombol "add to cart" di modal ingin berfungsi.
// Saat ini modal hanya dummy, belum terintegrasi data produknya secara dinamis.
const addToCartModalButton = document.getElementById('add-to-cart-modal-button');
if (addToCartModalButton) {
    addToCartModalButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Fitur tambah ke keranjang dari modal belum diimplementasikan secara dinamis.');
        // Contoh sederhana jika modal menampilkan produk dengan ID 1
        // Anda perlu mengambil data produk yang sebenarnya dari modal
        // Alpine.store('cart').add(Alpine.data('products').items.find(item => item.id === 1));
        modal.style.display = 'none';
    });
}