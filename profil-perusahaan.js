/* Perilaku header bersama: nama user, dropdown, Sign Out, pengaturan aksesibilitas */
(() => {
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  const store = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch {}
    },
    del(k) {
      try {
        localStorage.removeItem(k);
      } catch {}
    },
  };
  const name = store.get("aequalis_user") || "User";
  $("user-label").textContent = "Halo, " + name;
  $("who-name").textContent = name;
  $("avatar").textContent = name.charAt(0).toUpperCase();
  const btn = $("user-btn"),
    dd = $("dropdown");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.setAttribute("aria-expanded", dd.classList.toggle("open"));
  });
  document.addEventListener("click", () => {
    dd.classList.remove("open");
    btn.setAttribute("aria-expanded", false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dd.classList.remove("open");
  });
  $("logout").addEventListener("click", () => {
    store.del("aequalis_user");
    location.href = "aequalis-auth.html";
  });

  let size = parseInt(store.get("aequalis_size") || "0", 10);
  const applySize = () => {
    ["t--1", "t-1", "t-2", "t-3"].forEach((c) => root.classList.remove(c));
    if (size) root.classList.add("t-" + size);
    store.set("aequalis_size", size);
  };
  document.querySelectorAll("[data-size]").forEach((b) =>
    b.addEventListener("click", () => {
      size = Math.max(-1, Math.min(3, size + parseInt(b.dataset.size, 10)));
      applySize();
    }),
  );
  [
    ["contrast", "aequalis_contrast", "t-contrast"],
    ["dys", "aequalis_dys", "t-dys"],
  ].forEach(([cls, key, id]) => {
    const apply = (on) => {
      root.classList.toggle(cls, on);
      $(id).setAttribute("aria-pressed", on);
      store.set(key, on ? "1" : "0");
    };
    $(id).addEventListener("click", () => apply(!root.classList.contains(cls)));
    apply(store.get(key) === "1");
  });
  applySize();
})();
/* Data contoh perusahaan. Ganti dengan fetch ke API kamu. */
window.COMPANIES = [
  {
    id: "nusantara-digital",
    name: "PT Nusantara Digital",
    short: "Nusantara Digital",
    ini: "N",
    c: "#dbe6ff",
    industry: "Teknologi",
    city: "Jakarta Selatan",
    mode: "Hybrid",
    jobs: 4,
    level: "Unggul",
    salMin: 5,
    salMax: 14,
    desc: "Layanan perangkat lunak dan dukungan teknis untuk bisnis keuangan.",
    dis: ["Fisik", "Netra", "Tuli/Wicara", "Psikososial"],
    acc: [
      ["Akses kursi roda", "Lift dan jalur landai di kantor pusat."],
      ["Jam kerja fleksibel", "Atur jam kerja sesuai kebutuhan."],
      ["Pembaca layar", "Perangkat lunak pembaca layar disediakan."],
      ["Juru bahasa isyarat", "Tersedia saat wawancara dan rapat."],
      ["Kerja hybrid", "Kombinasi kantor dan rumah."],
      ["Ruang istirahat", "Ruang tenang untuk jeda sensorik."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Lift atau jalur landai di kantor pusat", 1],
      ["Perangkat bantu kerja disediakan", 1],
      ["Staf telah mengikuti pelatihan inklusi", 1],
    ],
  },
  {
    id: "visiona-finansial",
    name: "Visiona Finansial",
    short: "Visiona Finansial",
    ini: "V",
    c: "#f6d4f2",
    industry: "Keuangan",
    city: "Bandung",
    mode: "Remote",
    jobs: 3,
    level: "Unggul",
    salMin: 6,
    salMax: 10,
    desc: "Analitik data dan layanan keuangan digital untuk UMKM.",
    dis: ["Tuli/Wicara", "Fisik"],
    acc: [
      ["Kerja remote", "Bekerja penuh dari rumah."],
      ["Jam kerja fleksibel", "Jam kerja disesuaikan."],
      ["Juru bahasa isyarat", "Tersedia untuk rapat daring."],
      ["Akses kursi roda", "Kantor Bandung ramah kursi roda."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Akses fisik kantor sudah sesuai standar", 1],
      ["Perangkat bantu kerja disediakan", 1],
      ["Staf telah mengikuti pelatihan inklusi", 0],
    ],
  },
  {
    id: "kelor-negeri",
    name: "Kelor Negeri",
    short: "Kelor Negeri",
    ini: "K",
    c: "#fde7a8",
    industry: "Layanan Pelanggan",
    city: "Yogyakarta",
    mode: "On-site",
    jobs: 2,
    level: "Baik",
    salMin: 4,
    salMax: 6,
    desc: "Pusat layanan pelanggan untuk perusahaan e-commerce.",
    dis: ["Fisik"],
    acc: [
      ["Akses kursi roda", "Area kerja satu lantai."],
      ["Ramah disabilitas fisik", "Toilet dan meja kerja disesuaikan."],
      ["Kerja hybrid", "Dua hari per minggu dari rumah."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Akses fisik kantor sudah sesuai standar", 1],
      ["Perangkat bantu kerja disediakan", 0],
      ["Staf telah mengikuti pelatihan inklusi", 0],
    ],
  },
  {
    id: "pelita-kreatif",
    name: "Pelita Kreatif",
    short: "Pelita Kreatif",
    ini: "P",
    c: "#d5f3e4",
    industry: "Kreatif",
    city: "Surabaya",
    mode: "Remote",
    jobs: 3,
    level: "Baik",
    salMin: 4.5,
    salMax: 7,
    desc: "Studio desain dan produksi konten visual.",
    dis: ["Tuli/Wicara", "Intelektual"],
    acc: [
      ["Juru bahasa isyarat", "Tersedia untuk rapat tim."],
      ["Jam kerja fleksibel", "Tanpa jam kerja kaku."],
      ["Kerja remote", "Bekerja dari mana saja."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Instruksi kerja dalam bahasa sederhana", 1],
      ["Perangkat bantu kerja disediakan", 1],
      ["Staf telah mengikuti pelatihan inklusi", 0],
    ],
  },
  {
    id: "sentra-logistik",
    name: "Sentra Logistik",
    short: "Sentra Logistik",
    ini: "S",
    c: "#ffe0d6",
    industry: "Logistik",
    city: "Semarang",
    mode: "On-site",
    jobs: 2,
    level: "Berkembang",
    salMin: 4,
    salMax: 5.5,
    desc: "Pergudangan dan distribusi barang skala nasional.",
    dis: ["Fisik", "Psikososial"],
    acc: [
      ["Akses kursi roda", "Gudang utama ramah kursi roda."],
      ["Jam kerja fleksibel", "Shift dapat dipilih."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Akses fisik kantor sudah sesuai standar", 0],
      ["Perangkat bantu kerja disediakan", 0],
      ["Staf telah mengikuti pelatihan inklusi", 0],
    ],
  },
  {
    id: "teknologi-wicara",
    name: "Teknologi Wicara",
    short: "Teknologi Wicara",
    ini: "T",
    c: "#e3dcff",
    industry: "Teknologi",
    city: "Jakarta Barat",
    mode: "Hybrid",
    jobs: 5,
    level: "Unggul",
    salMin: 7,
    salMax: 12,
    desc: "Produk aksesibilitas berbasis suara dan teks.",
    dis: ["Netra", "Fisik"],
    acc: [
      ["Pembaca layar", "Semua alat kerja kompatibel."],
      ["Akses kursi roda", "Kantor bersertifikat aksesibel."],
      ["Kerja hybrid", "Tiga hari kantor, dua hari rumah."],
      ["Perangkat braille", "Papan ketik dan layar braille."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Akses fisik kantor sudah sesuai standar", 1],
      ["Perangkat bantu kerja disediakan", 1],
      ["Staf telah mengikuti pelatihan inklusi", 1],
    ],
  },
  {
    id: "aksara-media",
    name: "Aksara Media",
    short: "Aksara Media",
    ini: "A",
    c: "#dbe6ff",
    industry: "Kreatif",
    city: "Malang",
    mode: "Remote",
    jobs: 2,
    level: "Baik",
    salMin: 4,
    salMax: 7,
    desc: "Penerbit konten digital dan media edukasi.",
    dis: ["Tuli/Wicara", "Fisik", "Psikososial"],
    acc: [
      ["Jam kerja fleksibel", "Fokus pada hasil, bukan jam."],
      ["Kerja remote", "Tim tersebar di seluruh Indonesia."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Instruksi kerja dalam bahasa sederhana", 1],
      ["Perangkat bantu kerja disediakan", 0],
      ["Staf telah mengikuti pelatihan inklusi", 1],
    ],
  },
  {
    id: "bumi-retail",
    name: "Bumi Retail",
    short: "Bumi Retail",
    ini: "B",
    c: "#fde7a8",
    industry: "Retail",
    city: "Medan",
    mode: "On-site",
    jobs: 1,
    level: "Berkembang",
    salMin: 4,
    salMax: 5,
    desc: "Jaringan toko swalayan dan kebutuhan harian.",
    dis: ["Fisik", "Intelektual"],
    acc: [
      ["Akses kursi roda", "Pintu masuk dan jalur kasir lebar."],
      ["Ramah disabilitas fisik", "Meja kerja dapat diatur tinggi."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Akses fisik kantor sudah sesuai standar", 1],
      ["Perangkat bantu kerja disediakan", 0],
      ["Staf telah mengikuti pelatihan inklusi", 0],
    ],
  },
  {
    id: "cakra-konsultan",
    name: "Cakra Konsultan",
    short: "Cakra Konsultan",
    ini: "C",
    c: "#f6d4f2",
    industry: "Layanan Pelanggan",
    city: "Denpasar",
    mode: "Remote",
    jobs: 3,
    level: "Baik",
    salMin: 4.5,
    salMax: 6.5,
    desc: "Konsultan operasional dan layanan pelanggan berbasis chat.",
    dis: ["Fisik", "Netra", "Psikososial"],
    acc: [
      ["Pembaca layar", "Tersedia lisensi untuk karyawan."],
      ["Jam kerja fleksibel", "Jam kerja disesuaikan."],
      ["Kerja remote", "Penuh dari rumah."],
    ],
    checks: [
      ["Kebijakan rekrutmen inklusif tersedia", 1],
      ["Akses fisik kantor sudah sesuai standar", 0],
      ["Perangkat bantu kerja disediakan", 1],
      ["Staf telah mengikuti pelatihan inklusi", 1],
    ],
  },
];
(() => {
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const id = new URLSearchParams(location.search).get("id");
  const c = COMPANIES.find((x) => x.id === id) || COMPANIES[0];
  document.title = "Aequalis – " + c.name;
  const ok = c.checks.filter((x) => x[1]).length;

  document.getElementById("main").innerHTML = `
    <p class="crumb"><a href="perusahaan.html">Perusahaan</a> › ${esc(c.short)}</p>

    <section class="card hero">
      <div class="hrow">
        <div class="lg" style="background:${c.c}" aria-hidden="true">${esc(c.ini)}${esc(c.short.split(" ")[1]?.[0] || "")}</div>
        <div class="t">
          <span class="pill">✓ Terverifikasi ${esc(c.level)}</span>
          <h1>${esc(c.name)}</h1>
          <p class="meta">${esc(c.industry)} · ${esc(c.city)}</p>
        </div>
        <a class="cta" href="lowongan-perusahaan.html?id=${encodeURIComponent(c.id)}">Lihat semua lowongan</a>
      </div>
      <div class="stats">
        <div><b>${c.jobs}</b><span>Lowongan aktif</span></div>
        <div><b>${ok}/${c.checks.length}</b><span>Penilaian akomodasi terpenuhi</span></div>
        <div><b>${c.dis.length}</b><span>Ragam disabilitas didukung</span></div>
        <div><b>${esc(c.level)}</b><span>Level inklusivitas</span></div>
      </div>
    </section>

    <div class="two">
      <section class="card panel" aria-labelledby="h-nilai">
        <div class="top"><h2 id="h-nilai">Hasil penilaian aksesibilitas</h2></div>
        <div class="level"><b>${esc(c.level)}</b><span>${ok === c.checks.length ? "Semua penilaian terpenuhi." : ok + " dari " + c.checks.length + " penilaian terpenuhi."}</span></div>
        <ul class="checks">${c.checks.map((x) => `<li><span class="ck ${x[1] ? "y" : "n"}" aria-hidden="true">${x[1] ? "✓" : "–"}</span><span>${esc(x[0])}${x[1] ? "" : " <small>(belum terpenuhi)</small>"}</span></li>`).join("")}</ul>
      </section>

      <section class="card panel" aria-labelledby="h-acc">
        <div class="top"><h2 id="h-acc">Akomodasi yang tersedia</h2><span class="cnt">${c.acc.length} jenis</span></div>
        <ul class="acc">${c.acc.map((a) => `<li><span class="i" aria-hidden="true">✓</span><div><b>${esc(a[0])}</b><span>${esc(a[1])}</span></div></li>`).join("")}</ul>
      </section>
    </div>

    <a class="cta back" href="perusahaan.html">← Kembali</a>`;
})();
