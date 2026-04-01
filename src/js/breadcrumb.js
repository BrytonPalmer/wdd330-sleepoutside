export function setBreadcrumb(text) {
  const crumb = document.getElementById("breadcrumb");
  if (!crumb) return;

  if (!text) {
    crumb.textContent = "";
    crumb.style.display = "none";
  } else {
    crumb.textContent = text;
    crumb.style.display = "block";
  }
}