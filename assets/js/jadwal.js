let jadwalData = [];

const mingguSekarang = (() => {
  const startSemester = new Date("2025-09-22"); // LAB mulai
  const today = new Date();
  const diff = Math.floor((today - startSemester) / (1000 * 60 * 60 * 24));
  return diff > 0 ? Math.ceil(diff / 7) : null;
})();

fetch("assets/data/jadwal.json")
  .then((res) => res.json())
  .then((data) => {
    jadwalData = data;
    renderJadwal("all");
  });

document.getElementById("filterMinggu").addEventListener("change", (e) => {
  renderJadwal(e.target.value);
});

function renderJadwal(filter) {
  const table = document.getElementById("jadwalTable");
  table.innerHTML = "";

  jadwalData
    .filter((item) => {
      if (filter === "all") return true;
      return item.minggu === filter;
    })
    .forEach((item) => {
      const isLab = item.tipe === "lab";
      const isCurrentWeek = mingguSekarang && item.minggu == mingguSekarang;

      const row = document.createElement("tr");
      row.className = `
        transition
        ${isLab ? "bg-yellow-50 dark:bg-slate-800/60" : ""}
        ${isCurrentWeek ? "ring-2 ring-blue-500" : ""}
        hover:bg-blue-100 dark:hover:bg-slate-700
      `;

      row.innerHTML = `
  <td class="px-4 py-3 text-left font-medium">${item.hari}</td>
  <td class="px-4 py-3 text-left">${item.jam}</td>
  <td class="px-4 py-3 text-left font-semibold text-yellow-500">${item.ruang}</td>
  <td class="px-4 py-3 text-left">${item.sks}</td>
  <td class="px-4 py-3 text-left">${item.matkul}</td>
  <td class="px-4 py-3 text-left">${item.dosen}</td>
  <td class="px-4 py-3 text-left">${item.minggu ?? "-"}</td>
  <td class="px-4 py-3 text-left">
    <span class="px-2 py-1 text-xs rounded-full
      ${isLab ? "bg-yellow-400 text-black" : "bg-blue-600 text-white"}">
      ${isLab ? "LAB" : "TEORI"}
    </span>
  </td>
`;

      table.appendChild(row);
    });
}
