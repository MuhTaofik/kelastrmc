console.log("pengumuman.js jalan");
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("pengumumanList");

  // AMAN: reset dulu
  list.innerHTML = "";

  fetch("assets/data/pengumuman.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement("article");

        card.className =
          "p-6 rounded-xl shadow bg-white text-slate-800 " +
          "dark:bg-slate-800 dark:text-slate-100 transition";

        card.innerHTML = `
          <h3 class="text-lg font-semibold mb-1">${item.judul}</h3>
          <p class="text-sm opacity-70 mb-3">
            ${item.tanggal} • ${item.kategori}
          </p>
          <p>${item.isi}</p>
        `;

        list.appendChild(card);
      });
    })
    .catch((err) => {
      list.innerHTML =
        "<p class='text-center text-red-500'>Gagal memuat pengumuman</p>";
      console.error(err);
    });
});
