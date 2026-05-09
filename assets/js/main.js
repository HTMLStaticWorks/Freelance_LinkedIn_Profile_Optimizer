/* 
 * Freelance LinkedIn Profile Optimizer 
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialization
    initDarkMode();
    initRTL();
    initHeaderScroll();
    initScrollTop();
    initLucide();
    initMobileMenu();
    initPasswordToggle();
});

// Mobile Menu Scroll Lock
function initMobileMenu() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (!navbarCollapse) return;

    navbarCollapse.addEventListener('show.bs.collapse', () => {
        document.body.classList.add('overflow-hidden');
    });

    navbarCollapse.addEventListener('hide.bs.collapse', () => {
        document.body.classList.remove('overflow-hidden');
    });

    // Handle case where window is resized while menu is open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && document.body.classList.contains('overflow-hidden')) {
            document.body.classList.remove('overflow-hidden');
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
}

// Password Visibility Toggle
function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.btn-link .fa-eye, .btn-link .fa-eye-slash');
    
    toggleButtons.forEach(button => {
        const btnContainer = button.closest('button');
        btnContainer.addEventListener('click', () => {
            const input = btnContainer.parentElement.querySelector('input');
            const icon = btnContainer.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or use system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// RTL Functionality
function initRTL() {
    const rtlToggle = document.getElementById('rtl-toggle');
    if (!rtlToggle) return;

    // Check for saved direction preference
    if (localStorage.getItem('direction') === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    rtlToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('dir') === 'rtl') {
            document.documentElement.setAttribute('dir', 'ltr');
            localStorage.setItem('direction', 'ltr');
        } else {
            document.documentElement.setAttribute('dir', 'rtl');
            localStorage.setItem('direction', 'rtl');
        }
        // Optional: reload or trigger re-layout if complex
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


// Scroll Top Functionality
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
function initLucide() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Form Validation Helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('border-danger');
            } else {
                input.classList.remove('border-danger');
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
}
