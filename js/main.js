/* ===========================================================
   MAIN.JS — Jesus Embassy Kaduna (RCCG)
   Shared site behaviour: navigation, footer year, forms
   =========================================================== */
(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  function closeNav() {
    if (!toggle || !nav) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  }

  function openNav() {
    if (!toggle || !nav) return;
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      nav.classList.contains("open") ? closeNav() : openNav();
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (event) {
      if (nav.classList.contains("open") && !nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Generic demo form handling */
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

  /* Ministry / directory filter buttons */
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
