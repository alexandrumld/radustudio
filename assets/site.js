(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  function closeMenu(returnFocus = false) {
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
    if (returnFocus) toggle?.focus();
  }
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  nav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("open")) closeMenu(true);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) closeMenu();
  });
  document.addEventListener("focusin", (e) => {
    if (!e.target.closest(".site-header")) closeMenu();
  });
  window.matchMedia("(min-width: 601px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });
  const composition = document.querySelector(".architecture");
  const compositions = ["Structure", "Expression", "Components"];
  const insights = [
    "Start with structure. Make the important things easy to find.",
    "Add expression. Give the business a character of its own.",
    "Build a system. Carry the same care into every component.",
  ];
  document.querySelector(".rearrange")?.addEventListener("click", () => {
    const next =
      (Number(composition.dataset.composition) + 1) % compositions.length;
    composition.dataset.composition = String(next);
    composition.querySelector(".composition-name").textContent =
      `— ${compositions[next]}`;
    composition.querySelector(".composition-insight").textContent =
      insights[next];
    document.getElementById("composition-status").textContent =
      `Composition ${next + 1} of 3: ${compositions[next]}`;
  });
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    document.documentElement.classList.add("js-motion");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".section-heading,.work-card,.services-intro,.service-list,.manifesto>h2,.studio-copy,.process-grid article,.faq-section>div,.contact-strip-content,.case-content>div",
      )
      .forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
      });
  }
  document.querySelectorAll(".demo-desk").forEach((desk) => {
    desk.addEventListener("toggle", () => {
      desk.querySelector(".desk-action").textContent =
        `${desk.open ? "Close" : "Open"} the interactive design desk`;
      const frame = desk.querySelector("iframe");
      if (desk.open && !frame.getAttribute("src"))
        frame.src = frame.dataset.src;
    });
    desk.querySelectorAll("[data-demo-size]").forEach((button) => {
      button.addEventListener("click", () => {
        desk.querySelector(".demo-stage").dataset.size =
          button.dataset.demoSize;
        desk.querySelectorAll("[data-demo-size]").forEach((control) => {
          control.setAttribute("aria-pressed", String(control === button));
        });
      });
    });
  });
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  const required = ["name", "email", "message"];
  const errorMessage = (id) =>
    id === "name"
      ? "Please enter your name."
      : id === "email"
        ? "Please enter a valid email address."
        : "Please tell us a little more (at least 15 characters).";
  function validate(id) {
    const field = form.elements[id];
    const valid =
      field.checkValidity() &&
      Boolean(field.value.trim()) &&
      (id !== "message" || field.value.trim().length >= 15);
    field.setAttribute("aria-invalid", String(!valid));
    field.setAttribute("aria-describedby", `${id}-error`);
    document.getElementById(`${id}-error`).textContent = valid
      ? ""
      : errorMessage(id);
    return valid;
  }
  required.forEach((id) =>
    form.elements[id].addEventListener("input", () => {
      if (form.elements[id].hasAttribute("aria-invalid")) validate(id);
    }),
  );
  let draft = "";
  const invalidateDraft = () => {
    document.getElementById("form-result").hidden = true;
    document.getElementById("email-draft").href = "mailto:team@radu.studio";
    document.getElementById("draft-text").value = "";
    document.getElementById("copy-status").textContent = "";
  };
  form.addEventListener("input", invalidateDraft);
  form.addEventListener("change", invalidateDraft);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.elements.website_url.value) return;
    const invalid = required.filter((id) => !validate(id));
    if (invalid.length) {
      form.elements[invalid[0]].focus();
      return;
    }
    const data = new FormData(form);
    const val = (key) => String(data.get(key) || "").trim();
    const subject = `Website enquiry — ${val("company") || val("name")}`;
    draft = `Hello Radu,\n\n${val("message")}\n\nName: ${val("name")}\nEmail: ${val("email")}\nBusiness / website: ${val("company") || "Not specified"}\nInterested in: ${val("service")}\nBudget: ${val("budget") || "Not specified"}\nIdeal launch: ${val("timeline") || "Flexible"}\n\nSent from the Radu Studio project enquiry.`;
    document.getElementById("email-draft").href =
      `mailto:team@radu.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`;
    document.getElementById("draft-text").value =
      `To: team@radu.studio\nSubject: ${subject}\n\n${draft}`;
    document.getElementById("copy-status").textContent = "";
    const result = document.getElementById("form-result");
    result.hidden = false;
    result.focus();
    result.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  });
  document.getElementById("download-enquiry").addEventListener("click", () => {
    const blob = new Blob([document.getElementById("draft-text").value], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "radu-project-enquiry.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  document
    .getElementById("copy-enquiry")
    .addEventListener("click", async () => {
      const text = document.getElementById("draft-text");
      try {
        await navigator.clipboard.writeText(text.value);
        document.getElementById("copy-status").textContent =
          "Copied. Paste it into your email and send to team@radu.studio.";
      } catch {
        text.closest("details").open = true;
        text.focus();
        text.select();
        document.getElementById("copy-status").textContent =
          "Select and copy the message below into your email app.";
      }
    });
})();
