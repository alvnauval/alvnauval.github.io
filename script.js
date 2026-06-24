const hamburger = document.querySelector("#hamburger");
const mobileMenu = document.querySelector("#nav-menu");
const menuItem = document.querySelectorAll(".nav-link");
const navbar = document.querySelector("#navbar");
const loadingScreen = document.querySelector("#loading-screen");

// 1. Loading Screen Timeout
window.addEventListener("load", () => {
  if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
});

// 2. Toggle Hamburger Menu (Buka/Tutup)
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// 3. Menutup Menu otomatis saat salah satu link diklik
menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    
    // Mengatur kelas active pada menu yang sedang diklik
    menuItem.forEach(link => link.classList.remove("active"));
    item.classList.add("active");
  });
});

// 4. Mengubah background navbar saat scroll melewati Hero Section
document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 150) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
