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

/* Data lowongan contoh per perusahaan, dibangun dari COMPANIES. Ganti dengan fetch ke API kamu. */
const TITLES = {
  "nusantara-digital": [
    "Customer Support Specialist",
    "Frontend Developer Junior",
    "QA Tester",
    "Content Moderator",
  ],
  "visiona-finansial": [
    "Junior Data Analyst",
    "Staf Keuangan",
    "Customer Success",
  ],
  "kelor-negeri": ["Customer Service Chat", "Staf Administrasi"],
  "pelita-kreatif": [
    "Desain Grafis Junior",
    "Ilustrator Digital",
    "Video Editor",
  ],
  "sentra-logistik": ["Administrasi Gudang", "Staf Data Entry"],
  "teknologi-wicara": [
    "QA Tester",
    "Technical Writer",
    "Support Engineer",
    "UI Designer",
    "Data Labeler",
  ],
  "aksara-media": ["Content Writer", "Editor Naskah"],
  "bumi-retail": ["Staf Administrasi"],
  "cakra-konsultan": [
    "Customer Service Chat",
    "Staf Operasional",
    "Analis Laporan",
  ],
};
const MODES = ["Hybrid", "Remote", "On-site"];
const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
window.JOBS = COMPANIES.flatMap((c) => {
  const list = TITLES[c.id] || [],
    span = c.salMax - c.salMin;
  return list.map((t, i) => {
    const min = Math.round((c.salMin + span * i * 0.12) * 2) / 2;
    const max = Math.max(
      min + 1,
      Math.round((c.salMax - span * (list.length - 1 - i) * 0.1) * 2) / 2,
    );
    const d = new Date(2026, 10, 30 - i * 4);
    return {
      id: c.id + "-" + (i + 1),
      cid: c.id,
      title: t,
      city: c.city,
      mode: i === 0 ? c.mode : MODES[(MODES.indexOf(c.mode) + i) % 3],
      type: i % 3 === 2 ? "Paruh waktu" : "Penuh waktu",
      min,
      max,
      days: i * 3 + 1,
      deadline: d.getDate() + " " + BULAN[d.getMonth()] + " " + d.getFullYear(),
      dis: c.dis.slice(0, Math.max(1, c.dis.length - (i % 2))),
      acc: c.acc.map((a) => a[0]),
    };
  });
});
const rp = (n) => String(n).replace(".", ",");

(() => {
  const $ = (id) => document.getElementById(id);
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
  const job =
    JOBS.find(
      (j) => j.id === new URLSearchParams(location.search).get("job"),
    ) || JOBS[0];
  const c = COMPANIES.find((x) => x.id === job.cid);
  const ok = c.checks.filter((x) => x[1]).length;
  document.title = "Aequalis – " + job.title + " di " + c.short;

  /* Isi deskripsi contoh (ganti dengan data dari API) */
  const isCS = /customer (support|service)/i.test(job.title);
  const about = isCS
    ? "Kamu akan membantu nasabah dan klien menyelesaikan kendala layanan lewat chat, email, dan telepon. Tim kami bekerja hybrid: tiga hari di kantor, dua hari dari rumah."
    : `${c.name} membuka posisi ${job.title} untuk bergabung di tim yang terbiasa menyesuaikan alur kerja dan perangkat dengan kebutuhan setiap anggota.`;
  const tasks = isCS
    ? [
        "Menjawab dan menyelesaikan pertanyaan nasabah sesuai panduan layanan.",
        "Mencatat setiap kasus di sistem tiket dan meneruskan kasus rumit ke tim terkait.",
        "Memberi masukan untuk memperbaiki panduan dan proses layanan.",
      ]
    : [
        `Menjalankan tugas harian ${job.title} sesuai target tim.`,
        "Berkoordinasi dengan rekan kerja dan melaporkan perkembangan secara berkala.",
        "Menyampaikan masukan untuk memperbaiki proses kerja.",
      ];
  const needs = isCS
    ? [
        "Komunikasi tertulis yang jelas dan sabar menghadapi nasabah.",
        "Terbiasa memakai komputer dan aplikasi chat.",
        "Pengalaman layanan pelanggan menjadi nilai tambah, bukan syarat. Ijazah tidak dibatasi jurusan.",
      ]
    : [
        "Komunikasi yang baik dan mau belajar.",
        "Terbiasa memakai komputer dan aplikasi perkantoran.",
        "Pengalaman terkait menjadi nilai tambah, bukan syarat.",
      ];

  const applied = () => {
    try {
      return JSON.parse(localStorage.getItem("aequalis_applications") || "[]");
    } catch {
      return [];
    }
  };
  const isApplied = () => applied().some((a) => a.job === job.id);

  $("main").innerHTML = `
    <p class="crumb"><a href="perusahaan.html">Perusahaan</a> › <a href="profil-perusahaan.html?id=${encodeURIComponent(c.id)}">${esc(c.short)}</a></p>
    <section class="card hero">
      <div class="hrow">
        <div class="lg" style="background:${c.c}" aria-hidden="true">${esc(c.ini)}${esc(c.short.split(" ")[1]?.[0] || "")}</div>
        <div class="t">
          <h1>${esc(job.title)}</h1>
          <p class="meta"><a href="profil-perusahaan.html?id=${encodeURIComponent(c.id)}">${esc(c.short)}</a> · ${esc(c.name)} · ${esc(job.city)} · ${esc(c.industry)}</p>
        </div>
        <button class="cta" type="button" id="apply-btn"></button>
      </div>
      <div class="info4">
        <div><small>Gaji</small><b>Rp${rp(job.min)}–${rp(job.max)} Juta/bulan</b></div>
        <div><small>Jenis kerja</small><b>${esc(job.type)}</b></div>
        <div><small>Lokasi kerja</small><b>${esc(job.mode)}</b></div>
        <div><small>Batas lamaran</small><b>${esc(job.deadline)}</b></div>
      </div>
      <div class="boxes">
        <div><b>${ok} dari ${c.checks.length}</b><span>Standar aksesibilitas terpenuhi</span></div>
        <div><b>${c.acc.length} jenis</b><span>Akomodasi disediakan</span></div>
        <div><b>Agustus 2026</b><span>Terakhir diverifikasi oleh Aequalis</span></div>
      </div>
    </section>

    <div class="cols">
      <section class="card panel" aria-labelledby="h-about">
        <h2 id="h-about">Tentang pekerjaan</h2>
        <p>${esc(about)}</p>
        <h3>Tanggung jawab</h3>
        <ul class="b">${tasks.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <h3>Yang kami cari</h3>
        <ul class="b">${needs.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </section>
      <div class="stack">
        <section class="card panel" aria-labelledby="h-nilai">
          <h2 id="h-nilai">Hasil penilaian aksesibilitas</h2>
          <div class="level"><b>${esc(c.level)}</b><span>${ok === c.checks.length ? "Semua poin penilaian terpenuhi." : ok + " dari " + c.checks.length + " poin terpenuhi."}</span></div>
          <ul class="checks">${c.checks.map((x) => `<li><span class="ck ${x[1] ? "y" : "n"}" aria-hidden="true">${x[1] ? "✓" : "–"}</span><span>${esc(x[0])}</span></li>`).join("")}</ul>
        </section>
        <section class="card panel" aria-labelledby="h-acc">
          <div class="top"><h2 id="h-acc">Akomodasi yang disediakan</h2><span class="cnt">${c.acc.length} jenis</span></div>
          <ul class="acc">${c.acc.map((a) => `<li><span class="i" aria-hidden="true">✓</span><div><b>${esc(a[0])}</b><span>${esc(a[1])}</span></div></li>`).join("")}</ul>
        </section>
      </div>
    </div>
    <a class="cta back" href="lowongan-perusahaan.html?id=${encodeURIComponent(c.id)}">← Kembali</a>`;

  /* ---------- Ajukan lamaran ---------- */
  const btn = $("apply-btn"),
    dlg = $("dlg");
  function syncBtn() {
    const done = isApplied();
    btn.disabled = done;
    btn.textContent = done ? "✓ Sudah dilamar" : "Ajukan Lamaran";
  }
  syncBtn();
  function toast(m) {
    const t = $("toast");
    t.textContent = m;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3000);
  }

  btn.addEventListener("click", () => {
    $("dlg-sub").textContent = job.title + " · " + c.short;
    $("a-nama").value = localStorage.getItem("aequalis_user") || "";
    $("e-nama").textContent = $("e-email").textContent = "";
    dlg.showModal();
    $("a-nama").focus();
  });
  $("a-cancel").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close();
  });

  $("apply-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = $("a-nama").value.trim(),
      email = $("a-email").value.trim();
    const okN = !!nama,
      okE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    $("e-nama").textContent = okN ? "" : "Nama lengkap wajib diisi.";
    $("e-email").textContent = okE ? "" : "Format email belum benar.";
    if (!okN || !okE) return;
    const payload = {
      job: job.id,
      nama,
      email,
      cv: $("a-cv").files[0]?.name || null,
      akomodasi: $("a-akom").value.trim(),
      date: new Date().toISOString(),
    };
    // TODO: kirim ke backend, mis. fetch('/api/lamaran', { method:'POST', body: JSON.stringify(payload) })
    try {
      const list = applied();
      list.push(payload);
      localStorage.setItem("aequalis_applications", JSON.stringify(list));
    } catch {}
    dlg.close();
    syncBtn();
    toast("Lamaran terkirim. Semoga berhasil!");
  });
})();
