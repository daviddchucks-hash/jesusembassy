/* ===========================================================
   GALLERY.JS — filtering + standard photo viewer for gallery.html
   =========================================================== */
(function () {
  "use strict";

  var grid = document.getElementById("gallery-grid");
  if (!grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxDialog = lightbox ? lightbox.querySelector(".lightbox-dialog") : null;
  var lightboxFigure = lightbox ? lightbox.querySelector(".lightbox-figure") : null;
  var lightboxImg = lightbox ? lightbox.querySelector("#lightbox-image") : null;
  var lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
  var lightboxCounter = lightbox ? lightbox.querySelector(".lightbox-counter") : null;
  var closeButton = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  var currentIndex = 0;
  var visibleItems = items;
  var lastTrigger = null;
  var touchStartX = 0;

  function getFocusableControls() {
    return [closeButton, lightbox ? lightbox.querySelector(".lightbox-prev") : null, lightbox ? lightbox.querySelector(".lightbox-next") : null].filter(Boolean);
  }

  function updateFilter(filter) {
    visibleItems = [];
    items.forEach(function (item) {
      var match = filter === "all" || item.getAttribute("data-category") === filter;
      item.style.display = match ? "" : "none";
      if (match) visibleItems.push(item);
    });
    if (lightbox && lightbox.classList.contains("open")) closeLightbox();
  }

  /* Category filtering */
  document.querySelectorAll(".gallery-filters .filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".gallery-filters .filter-btn").forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      updateFilter(btn.getAttribute("data-filter"));
    });
  });

  /* Lazy loading with a gentle fade-in once each photo is ready */
  items.forEach(function (item) {
    var img = item.querySelector("img");
    if (!img) return;
    img.loading = "lazy";
    img.decoding = "async";
    function markLoaded() { img.classList.add("is-loaded"); }
    img.addEventListener("load", markLoaded, { once: true });
    if (img.complete) markLoaded();
  });

  function updateLightbox() {
    var item = visibleItems[currentIndex];
    if (!item || !lightboxImg) return;
    var img = item.querySelector("img");
    lightboxFigure.classList.add("is-loading");
    lightboxImg.classList.remove("is-ready");
    lightboxImg.onload = function () {
      lightboxFigure.classList.remove("is-loading");
      lightboxImg.classList.add("is-ready");
    };
    lightboxImg.onerror = function () {
      lightboxFigure.classList.remove("is-loading");
    };
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.decoding = "async";
    if (lightboxCounter) lightboxCounter.textContent = "Photo " + (currentIndex + 1) + " of " + visibleItems.length;
    if (lightboxCaption) lightboxCaption.textContent = img.alt;
    if (lightboxImg.complete && lightboxImg.naturalWidth > 0) {
      lightboxFigure.classList.remove("is-loading");
      lightboxImg.classList.add("is-ready");
    }
  }

  function openLightbox(index, trigger) {
    if (!lightbox || !visibleItems.length) return;
    currentIndex = index;
    lastTrigger = trigger || null;
    updateLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeButton) closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lightboxImg) {
      lightboxImg.classList.remove("is-ready");
      lightboxImg.removeAttribute("src");
    }
    if (lightboxFigure) lightboxFigure.classList.remove("is-loading");
    if (lastTrigger && document.body.contains(lastTrigger)) lastTrigger.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  }

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      var idx = visibleItems.indexOf(item);
      openLightbox(idx === -1 ? 0 : idx, item);
    });
  });

  if (lightbox) {
    closeButton.addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-next").addEventListener("click", showNext);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", showPrev);
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    lightboxFigure.addEventListener("touchstart", function (event) {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    lightboxFigure.addEventListener("touchend", function (event) {
      var distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) < 45) return;
      distance < 0 ? showNext() : showPrev();
    }, { passive: true });
    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "Tab") {
        var controls = getFocusableControls();
        var first = controls[0];
        var last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }
})();
