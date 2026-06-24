// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeLoading()
  initializeNavigation()
  initializeScrollAnimations()
  initializePortfolioFilter()
  initializeContactForm()
  initializeSmoothScroll()
  initializeAccessibility()
})

// Loading Screen
function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen")
  if (!loadingScreen) return

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out")
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1000)
  })
}

// Navigation
function initializeNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section")

  if (!navbar || !hamburger || !navMenu) return

  // Combined Throttled Scroll Handler for Navbar and Active Links
  window.addEventListener("scroll", throttle(() => {
    // 1. Navbar scroll effect
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // 2. Active navigation link highlight
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      // Menggunakan window.scrollY secara eksplisit untuk menghindari bug
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }, 30))

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Keyboard navigation support (Escape to close mobile menu)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
}

// Scroll Animations (Intersection Observer)
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target) // Berhenti mengamati jika sudah terlihat agar performa lebih enteng
      }
    })
  }, observerOptions)

  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element) => observer.observe(element))
}

// Portfolio Filter
function initializePortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden")
          setTimeout(() => {
            item.style.display = "block"
          }, 10)
        } else {
          item.classList.add("hidden")
          setTimeout(() => {
            if (item.classList.contains("hidden")) {
              item.style.display = "none"
            }
          }, 300)
        }
      })
    })
  })
}

// Contact Form Submission & Validation
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form")
  if (!contactForm) return

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    const submitButton = this.querySelector(".submit-button")
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    // Simulasi pengiriman data
    setTimeout(() => {
      showNotification("Thank you! Your message has been sent successfully.", "success")
      contactForm.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  })
}

// Smooth Scroll
function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Mengurangi tinggi navbar tetap (fixed)

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Focus management for accessibility
function initializeAccessibility() {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
  )

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #007BFF"
      this.style.outlineOffset = "2px"
    })

    element.addEventListener("blur", function () {
      this.style.outline = ""
      this.style.outlineOffset = ""
    })
  })
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type) {
  const oldNotification = document.querySelector(".notification")
  if (oldNotification) oldNotification.remove() // Hapus notifikasi lama jika user klik berulang kali

  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === "success" ? "#28a745" : "#dc3545"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 5000)
}

// Performance Optimization: Throttle Function
function throttle(func, wait) {
  let time = Date.now()
  return function() {
    if ((time + wait - Date.now()) < 0) {
      func()
      time = Date.now()
    }
  }
}
