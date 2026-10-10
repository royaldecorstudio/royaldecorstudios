/* ============================================================
   Royal Decor Studio — main.js
   Handles: sticky header, mobile nav, scroll reveal, gallery
   filter + lightbox, booking & availability enquiry forms
   (all enquiries are sent to WhatsApp: +91 9501354811)
   ============================================================ */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var WA_NUMBER = "919501354811";
  function waUrl(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  /* ----- Current year ----- */
  $$(".year").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ----- Sticky header ----- */
  var header = $("#siteHeader");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ----- Mobile navigation ----- */
  var nav = $("#mainNav");
  var navToggle = $("#navToggle");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$("#mainNav a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----- Reveal on scroll ----- */
  var revealEls = $$(".reveal");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ----- Gallery filter ----- */
  var filterBtns = $$(".filter-btn");
  var galleryItems = $$(".gallery-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      galleryItems.forEach(function (item) {
        var show = (f === "all") || (item.getAttribute("data-category") === f);
        item.classList.toggle("hide", !show);
      });
    });
  });

  /* ----- Lightbox ----- */
  var lb = $("#lightbox");
  var lbImg = $("#lbImg");
  var lbCap = $("#lbCap");
  var lbList = [];
  var lbIndex = 0;

  function renderLb() {
    var item = lbList[lbIndex];
    if (!item) return;
    var img = item.querySelector("img");
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "";
    lbCap.textContent = item.getAttribute("data-caption") || img.alt || "";
  }
  function openLb(item) {
    lbList = galleryItems.filter(function (i) { return !i.classList.contains("hide"); });
    lbIndex = Math.max(0, lbList.indexOf(item));
    renderLb();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lbClose").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
  }
  function stepLb(dir) {
    if (!lbList.length) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    renderLb();
  }

  if (lb) {
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () { openLb(item); });
    });
    $("#lbClose").addEventListener("click", closeLb);
    $("#lbPrev").addEventListener("click", function () { stepLb(-1); });
    $("#lbNext").addEventListener("click", function () { stepLb(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") stepLb(-1);
      if (e.key === "ArrowRight") stepLb(1);
    });
  }

  /* ----- Min date = today for all date inputs ----- */
  var today = new Date().toISOString().split("T")[0];
  $$('input[type="date"]').forEach(function (input) { input.min = today; });

  /* ----- Booking enquiry form → WhatsApp ----- */
  $$("form.booking-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var d = new FormData(form);
      var get = function (k) { return (d.get(k) || "").toString().trim(); };
      var name = get("name");
      var phone = get("phone");
      var type = get("eventType");
      var date = get("eventDate");
      var location = get("location");
      var budget = get("budget");
      var message = get("message");

      var msg = "Hello Royal Decor Studio, I am interested in your decoration services. " +
        "Please share your packages and quotation. " +
        "Event type: " + type + ". Event date: " + date + ". Location: " + location + ". " +
        "Name: " + name + ". Contact: +" + phone + ".";
      if (budget) msg += " Approximate budget: " + budget + ".";
      if (message) msg += " Message: " + message + ".";

      window.open(waUrl(msg), "_blank", "noopener");

      var conf = form.nextElementSibling;
      if (conf && conf.classList.contains("form-confirmation")) {
        var details = conf.querySelector(".conf-details");
        if (details) details.textContent = type + " · " + date + " · " + location;
        conf.hidden = false;
        conf.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
      }
      form.reset();
    });
  });

  /* ----- Availability checker → WhatsApp ----- */
  var availForm = $("#availabilityForm");
  if (availForm) {
    availForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!availForm.checkValidity()) { availForm.reportValidity(); return; }
      var d = new FormData(availForm);
      var msg = "Hello Royal Decor Studio, I would like to check availability for my event. " +
        "Preferred date: " + (d.get("avDate") || "").toString() + ". " +
        "Event type: " + (d.get("avType") || "").toString() + ". " +
        "Location: " + (d.get("avLocation") || "").toString().trim() + ".";
      window.open(waUrl(msg), "_blank", "noopener");
      var note = $("#availabilityNote");
      if (note) note.hidden = false;
      availForm.reset();
    });
  }

  /* -----------------------------------------------------------
     Optional: Google Reviews widget hook.
     To display genuine Google reviews, add your Google Place ID
     below and include a trusted reviews widget script, e.g.
       const GOOGLE_PLACE_ID = "YOUR_PLACE_ID";
     Never hard-code fake reviews — only real, verifiable ones.
     ----------------------------------------------------------- */
})();
