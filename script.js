const loginDialog = document.getElementById("loginDialog");
const openLogin = document.getElementById("openLogin");
const visitorForm = document.getElementById("visitorForm");
const toast = document.getElementById("toast");
const searchInput = document.getElementById("searchInput");
const bookCards = [...document.querySelectorAll(".book-card")];
const emptyState = document.getElementById("emptyState");
let activeCategory = "Semua";

document.getElementById("year").textContent = new Date().getFullYear();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

openLogin.addEventListener("click", () => loginDialog.showModal());

visitorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Demo UI only: data is not sent or stored until the backend is connected.
  const formData = new FormData(visitorForm);
  const name = String(formData.get("visitorName") || "").trim();
  if (!name) return;
  loginDialog.close();
  visitorForm.reset();
  showToast(`Terima kasih, ${name}. Form ini masih berupa simulasi; pencatatan aktif setelah database terhubung.`);
});

function filterBooks() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  bookCards.forEach(card => {
    const matchesCategory = activeCategory === "Semua" || card.dataset.category === activeCategory;
    const matchesSearch = !term || (card.dataset.search + " " + card.textContent).toLowerCase().includes(term);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}

document.querySelectorAll(".filter-chip").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.filter;
    filterBooks();
  });
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll(".filter-chip").forEach(item => {
      item.classList.toggle("active", item.dataset.filter === activeCategory);
    });
    document.getElementById("koleksi").scrollIntoView({ behavior: "smooth" });
    filterBooks();
  });
});

document.getElementById("searchButton").addEventListener("click", filterBooks);
searchInput.addEventListener("input", filterBooks);
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") filterBooks();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => mainNav.classList.remove("open")));
