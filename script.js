// 1. Footer year updates itself
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Light / dark theme button (remembers the choice)
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");

try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) { /* storage not available, ignore */ }

toggle.addEventListener("click", () => {
  const isDark =
    root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const next = isDark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
});

// 3. Project filter buttons
const buttons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
const emptyNote = document.getElementById("empty-note");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const choice = button.dataset.filter;
    let visible = 0;

    buttons.forEach((b) => b.classList.toggle("active", b === button));

    projects.forEach((project) => {
      const tags = project.dataset.tag.split(" ");
      const show = choice === "all" || tags.includes(choice);
      project.hidden = !show;
      if (show) visible++;
    });

    emptyNote.hidden = visible > 0;
  });
});
