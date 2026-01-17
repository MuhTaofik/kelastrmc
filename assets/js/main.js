const root = document.documentElement;
if (localStorage.theme === "dark") {
  root.classList.add("dark");
}

document.getElementById("darkToggle")?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.theme = root.classList.contains("dark") ? "dark" : "light";
});

document.getElementById("menuBtn")?.addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("hidden");
});

fetch("assets/data/mahasiswa.json")
  .then((r) => r.json())
  .then((d) => {
    const el = document.getElementById("mahasiswaList");
    if (!el) return;
    d.forEach((m) => {
      el.innerHTML += `
  <div class="glass rounded-xl p-4 shadow text-center hover:-translate-y-1 transition">
   <img src="${m.foto}" class="w-24 h-24 mx-auto rounded-full mb-3">
   <h4 class="font-semibold">${m.nama}</h4>
   <p class="text-sm text-slate-500">${m.nim}</p>
  </div>`;
    });
  });
fetch("assets/data/mahasiswa.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("mahasiswaList");
    if (!container) return;

    container.innerHTML = "";

    data.forEach((mhs) => {
      container.innerHTML += `
        <div class="card-mahasiswa">
          <img src="${mhs.foto}" class="foto-mahasiswa" loading="lazy" />
          <div class="nama-mahasiswa">${mhs.nama}</div>
          <div class="nim-mahasiswa">${mhs.nim}</div>
        </div>
      `;
    });
  });

// Footer: Auto Year
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Back To Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 300) {
    backToTop.classList.remove("hidden");
  } else {
    backToTop.classList.add("hidden");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
fetch("assets/data/pengumuman.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("pengumumanList");
    if (!container) return;

    // terbaru di atas
    data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    const today = new Date();

    data.forEach((item) => {
      const tgl = new Date(item.tanggal);
      const diffHari = (today - tgl) / (1000 * 60 * 60 * 24);
      const isBaru = diffHari <= 7;

      const card = document.createElement("div");
      card.className =
        "p-4 rounded-xl shadow bg-white dark:bg-slate-800 hover:shadow-lg transition";

      card.innerHTML = `
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-lg">${item.judul}</h3>
          ${isBaru ? `<span class="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">BARU</span>` : ""}
        </div>
        <p class="text-sm text-slate-500">${item.tanggal}</p>
        <p class="mt-2">${item.isi}</p>
      `;

      container.appendChild(card);
    });

    if (data.length === 0) {
      container.innerHTML = `<p class="text-center text-slate-400">Belum ada pengumuman 📭</p>`;
    }
  });
