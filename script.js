const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".nav-list ul");
const menuItem = document.querySelectorAll(".nav-list ul li a");
const header = document.querySelector(".header.container");

// 1. Fungsi Klik Hamburger Menu (Buka / Tutup)
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// 2. Fungsi Menutup Menu Otomatis ketika Link Navigasi Diklik
menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// 3. Efek Scroll Navbar (Mengubah warna dari semi-transparan ke abu-abu gelap solid)
document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 150) {
    header.style.backgroundColor = "#29323c"; // Warna saat di-scroll ke bawah
  } else {
    header.style.backgroundColor = "rgba(31, 30, 30, 0.24)"; // Warna transparan awal
  }
});
