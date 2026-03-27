document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar-eco");
    const toggle = document.getElementById("eco-toggle");
    const menu = document.getElementById("eco-menu");
    const links = document.querySelectorAll(".nav-link");
    const form = document.getElementById("eco-form");
    const success = document.getElementById("eco-success");
    const revealTargets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const closeMenu = () => {
        toggle?.classList.remove("active");
        menu?.classList.remove("active");
        document.body.classList.remove("menu-open");
        toggle?.setAttribute("aria-expanded", "false");
    };

    const handleScroll = () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("active");
            toggle.classList.toggle("active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        links.forEach((link) => link.addEventListener("click", closeMenu));

        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target) && !toggle.contains(event.target) && menu.classList.contains("active")) {
                closeMenu();
            }
        });
    }

    if (revealTargets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });

        revealTargets.forEach((element) => observer.observe(element));
    }

    if (form && success) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            success.hidden = false;
            form.reset();
        });
    }
});
