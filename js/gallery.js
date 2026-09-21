/* ===========================================================
   GALLERY.JS — filtering + lightbox for gallery.html
   =========================================================== */
(function () {
  "use strict";

  var grid = document.getElementById("gallery-grid");
  if (!grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
  var currentIndex = 0;
  var visibleItems = items;

  /* Category filtering */
  var filterButtons = document.querySelectorAll(".gallery-filters .filter-btn");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      var filter = btn.getAttribute("data-filter");
      visibleItems = [];
      items.forEach(function (item) {
        var match = filter === "all" || item.getAttribute("data-category") === filter;
        item.style.display = match ? "" : "none";
        if (match) visibleItems.push(item);
      });
    });
  });

  /* Lazy loading (native, plus fade-in once loaded) */
  items.forEach(function (item) {
    var img = item.querySelector("img");
    if (img) {
      img.loading = "lazy";
    }
  });

  /* Lightbox */
  function openLightbox(index) {
    if (!lightbox || !visibleItems.length) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function updateLightbox() {
    var item = visibleItems[currentIndex];
    if (!item) return;
    var img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCaption) lightboxCaption.textContent = img.alt;
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () {
      var idx = visibleItems.indexOf(item);
      openLightbox(idx === -1 ? 0 : idx);
    });
  });

  if (lightbox) {
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-next").addEventListener("click", showNext);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", showPrev);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    });
  }
})();
