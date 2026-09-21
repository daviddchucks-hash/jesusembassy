/* ===========================================================
   EVENTS.JS — upcoming/past tab toggle (events.html) and
   sermon search/filter (media.html)
   =========================================================== */
(function () {
  "use strict";

  /* ---- Events: Upcoming / Past tabs ---- */
  var tabButtons = document.querySelectorAll(".events-tabs [data-tab]");
  if (tabButtons.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");

        tabButtons.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        document.querySelectorAll("[data-tab-panel]").forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-tab-panel") !== target;
        });
      });
    });
  }

  /* ---- Sermon archive: search + filter ---- */
  var sermonSearch = document.getElementById("sermon-search");
  var sermonFilter = document.getElementById("sermon-speaker-filter");
  var sermonRows = document.querySelectorAll(".sermon-row");
  var noResults = document.getElementById("sermon-no-results");

  function filterSermons() {
    if (!sermonRows.length) return;
    var query = sermonSearch ? sermonSearch.value.trim().toLowerCase() : "";
    var speaker = sermonFilter ? sermonFilter.value : "all";
    var visibleCount = 0;

    sermonRows.forEach(function (row) {
      var title = (row.getAttribute("data-title") || "").toLowerCase();
      var rowSpeaker = row.getAttribute("data-speaker") || "";
      var matchesQuery = !query || title.indexOf(query) !== -1 || rowSpeaker.toLowerCase().indexOf(query) !== -1;
      var matchesSpeaker = speaker === "all" || rowSpeaker === speaker;
      var show = matchesQuery && matchesSpeaker;
      row.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (noResults) noResults.classList.toggle("show", visibleCount === 0);
  }

  if (sermonSearch) sermonSearch.addEventListener("input", filterSermons);
  if (sermonFilter) sermonFilter.addEventListener("change", filterSermons);

  /* ---- House fellowship finder (connect.html) ---- */
  var fellowshipSearch = document.getElementById("fellowship-search");
  var fellowshipArea = document.getElementById("fellowship-area");
  var fellowshipCards = document.querySelectorAll(".fellowship-card");
  var fellowshipNoResults = document.getElementById("fellowship-no-results");

  function filterFellowships() {
    if (!fellowshipCards.length) return;
    var query = fellowshipSearch ? fellowshipSearch.value.trim().toLowerCase() : "";
    var area = fellowshipArea ? fellowshipArea.value : "all";
    var visibleCount = 0;

    fellowshipCards.forEach(function (card) {
      var name = (card.getAttribute("data-name") || "").toLowerCase();
      var cardArea = card.getAttribute("data-area") || "";
      var matchesQuery = !query || name.indexOf(query) !== -1 || cardArea.toLowerCase().indexOf(query) !== -1;
      var matchesArea = area === "all" || cardArea === area;
      var show = matchesQuery && matchesArea;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (fellowshipNoResults) fellowshipNoResults.classList.toggle("show", visibleCount === 0);
  }

  if (fellowshipSearch) fellowshipSearch.addEventListener("input", filterFellowships);
  if (fellowshipArea) fellowshipArea.addEventListener("change", filterFellowships);

  /* ---- News search + category filter (news.html) ---- */
  var newsSearch = document.getElementById("news-search");
  var newsCategory = document.getElementById("news-category");
  var newsCards = document.querySelectorAll(".news-card");
  var newsNoResults = document.getElementById("news-no-results");

  function filterNews() {
    if (!newsCards.length) return;
    var query = newsSearch ? newsSearch.value.trim().toLowerCase() : "";
    var category = newsCategory ? newsCategory.value : "all";
    var visibleCount = 0;

    newsCards.forEach(function (card) {
      var title = (card.getAttribute("data-title") || "").toLowerCase();
      var cardCategory = card.getAttribute("data-category") || "";
      var matchesQuery = !query || title.indexOf(query) !== -1;
      var matchesCategory = category === "all" || cardCategory === category;
      var show = matchesQuery && matchesCategory;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (newsNoResults) newsNoResults.classList.toggle("show", visibleCount === 0);
  }

  if (newsSearch) newsSearch.addEventListener("input", filterNews);
  if (newsCategory) newsCategory.addEventListener("change", filterNews);
})();
