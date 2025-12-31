/* main.js */
/* Master JS Controller – Advanced & Safe */

/**
 * Utility: Run function only if element exists
 */
function runIfExists(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    callback();
  }
}

/**
 * Page detection using body attribute
 */
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* ================= HOME PAGE ================= */
  if (body.classList.contains("page-home")) {
    import("./pages/home.js").then(module => {
      module.initHome();
    });
  }

  /* ================= FACULTY LIST PAGE ================= */
  if (body.classList.contains("page-faculty")) {
    import("./pages/faculty.js").then(module => {
      module.initFaculty();
    });
  }

  /* ================= FACULTY PROFILE PAGE ================= */
  if (body.classList.contains("page-profile")) {
    import("./pages/profile.js").then(module => {
      module.initProfile();
    });
  }

  /* ================= RESOURCES PAGE ================= */
  if (body.classList.contains("page-resources")) {
    import("./pages/resources.js").then(module => {
      module.initResources();
    });
  }

  /* ================= CONTACT PAGE ================= */
  if (body.classList.contains("page-contact")) {
    import("./pages/contact.js").then(module => {
      module.initContact();
    });
  }
  /* ================= GALLERY PAGE ================= */
if (body.classList.contains("page-gallery")) {
  import("./pages/gallery.js").then(module => {
    module.initGallery();
  });
}


  /* ================= GLOBAL COMPONENTS ================= */
  import("./components/navbar.js");
  import("./components/animations.js");
});
