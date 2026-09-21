/* ===========================================================
   MAIN.JS — Jesus Embassy Kaduna (RCCG)
   Shared site behaviour: navigation, footer year, forms
   =========================================================== */
(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Generic "demo" form handling — replace with a real form
     service (Formspree, Netlify Forms, Google Forms, custom
     backend, etc.) before launch. See README.md. */
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var successEl = form.parentElement.querySelector(".form-success");
      if (successEl) {
        successEl.classList.add("show");
        successEl.setAttribute("tabindex", "-1");
        successEl.focus();
      }
      form.reset();
    });
  });

  /* Ministry / directory filter buttons (used on ministries.html) */
  var filterButtons = document.querySelectorAll("[data-filter-target] .filter-btn");
  if (filterButtons.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var group = btn.closest("[data-filter-target]");
        var targetSelector = group.getAttribute("data-filter-target");
        var items = document.querySelectorAll(targetSelector);
        var filter = btn.getAttribute("data-filter");

        group.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");

        items.forEach(function (item) {
          var cat = item.getAttribute("data-category");
          item.style.display = filter === "all" || cat === filter ? "" : "none";
        });
      });
    });
  }
})();
