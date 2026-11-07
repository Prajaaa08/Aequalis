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

  /* ---------- Data lamaran (contoh + lamaran asli dari localStorage) ---------- */
  const STAGES = ["Terkirim", "Dilihat", "Wawancara", "Penawaran"];
  const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const pad = (n) => String(n).padStart(2, "0");
  const fDate = (d) =>
    `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
  const fTime = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const fShort = (d) =>
    `${d.getDate()} ${BULAN[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
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
  const DOCS0 = [
    ["CV_User_2026.pdf", "124 KB"],
    ["KTP.jpg", "86 KB"],
    ["Sertifikat_UIUX.pdf", "212 KB"],
  ];
  const SEED = [
    {
      id: "a1",
      job: "teknologi-wicara-4",
      sent: "2026-11-03T14:20",
      stage: 3,
      interview: "2026-11-10T10:00",
      no: "ACJ-2026-0842",
      acc: ["Interview via chat", "Waktu tambahan"],
      approved: true,
      iv: {
        platform: "Google Meet",
        link: "https://meet.google.com/abc-defg-hij",
        who: "Rina Kusuma",
        role: "HR Recruiter",
        dur: 45,
      },
    },
    {
      id: "a2",
      job: "pelita-kreatif-1",
      sent: "2026-11-04T10:05",
      stage: 2,
      no: "ACJ-2026-0851",
      acc: [],
      approved: false,
    },
    {
      id: "a3",
      job: "aksara-media-1",
      sent: "2026-11-05T09:12",
      stage: 2,
      no: "ACJ-2026-0866",
      acc: [],
      approved: false,
    },
    {
      id: "a4",
      job: "visiona-finansial-1",
      sent: "2026-11-06T16:40",
      stage: 1,
      no: "ACJ-2026-0879",
      acc: [],
      approved: false,
    },
    {
      id: "a5",
      job: "kelor-negeri-1",
      sent: "2026-11-06T18:02",
      stage: 1,
      no: "ACJ-2026-0884",
      acc: [],
      approved: false,
    },
  ].map((a) => ({ ...a, docs: DOCS0 }));
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem("aequalis_applications") || "[]");
  } catch {}
  const real = stored
    .map((a, i) => ({
      id: "r" + i,
      job: a.job,
      sent: a.date,
      stage: 1,
      no: "ACJ-2026-" + (1000 + i * 37),
      acc: a.akomodasi ? [a.akomodasi] : [],
      approved: false,
      docs: Object.values(a.dokumen || {}).map((n) => [n, ""]),
    }))
    .filter((a) => JOBS.some((j) => j.id === a.job));
  const APPS = [...SEED, ...real].sort(
    (a, b) => b.stage - a.stage || new Date(b.sent) - new Date(a.sent),
  );
  const jobOf = (a) => JOBS.find((j) => j.id === a.job);
  const coOf = (a) => COMPANIES.find((c) => c.id === jobOf(a).cid);
  const bar = (n) =>
    `<span class="seg">${[1, 2, 3, 4].map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>`;

  const a =
    APPS.find(
      (x) => x.id === new URLSearchParams(location.search).get("app"),
    ) || APPS[0];
  const j = jobOf(a),
    c = coOf(a),
    sent = new Date(a.sent);
  document.title = "Aequalis – Progres " + j.title;
  const iv = a.interview ? new Date(a.interview) : null;
  const seen = new Date(sent.getTime() + 19 * 3600 * 1000);

  /* Isi tiap tahap sesuai posisi lamaran saat ini */
  const STEPS = [
    {
      t: "Lamaran terkirim",
      when: `${fDate(sent)} · ${fTime(sent)}`,
      d: `CV, KTP, dan data diri berhasil dikirim ke ${c.short}.`,
      wait: "Menunggu dilihat rekruter",
    },
    {
      t: "Dilihat rekruter",
      when: `${fDate(seen)} · ${fTime(seen)}`,
      d: "Tim HR sudah membuka lamaranmu dan sedang menyiapkan tahap berikutnya.",
      wait: "Menunggu rekruter",
    },
    {
      t: "Wawancara",
      badge: "Terjadwal",
      when: iv ? `${fDate(iv)} · ${fTime(iv)} WIB` : "Jadwal menyusul",
      d: iv
        ? "Video call 45 menit dengan akomodasi sesuai permintaanmu."
        : "Jadwal wawancara akan diinformasikan oleh perusahaan.",
      wait: "Belum dijadwalkan",
    },
    {
      t: "Penawaran",
      when: "Menunggu hasil wawancara",
      d: "Kamu akan diberi tahu begitu keputusan tersedia.",
      wait: "Menunggu hasil wawancara",
    },
  ];
  const tl = STEPS.map((s, i) => {
    const n = i + 1,
      st = n < a.stage ? "done" : n === a.stage ? "now" : "pending";
    const when = st === "pending" ? s.wait : s.when;
    const desc =
      st === "pending" && n !== 4
        ? "Tahap ini akan terbuka setelah tahap sebelumnya selesai."
        : s.d;
    return `<li class="${st}">
      <span class="dot" aria-hidden="true">${st === "done" ? "✓" : st === "now" ? "●" : "○"}</span>
      <div class="body">
        <div class="row"><b>${s.t} ${st === "now" && s.badge && iv ? `<span class="pill green">${s.badge}</span>` : ""}</b><span class="time">${esc(when)}</span></div>
        <p>${esc(desc)}</p>
        ${n === 3 && iv && n <= a.stage ? `<a class="cta" href="detail-wawancara.html?app=${encodeURIComponent(a.id)}">Lihat detail wawancara</a>` : ""}
      </div></li>`;
  }).join("");

  $("view").innerHTML = `
    <section class="card hero">
      <div class="hrow">
        <span class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg></span>
        <div class="t"><h2>${esc(j.title)}</h2><p>${esc(c.name)} · Dikirim ${fShort(sent)} · No. ${esc(a.no)}</p></div>
        <span class="pill green">Tahap ${a.stage} dari 4</span>
      </div>
      <div class="steps">${bar(a.stage)}<div class="lb">${STAGES.map((s, i) => `<span class="${i < a.stage ? "on" : ""}">${s}</span>`).join("")}</div></div>
    </section>

    <div class="cols">
      <section class="card panel" aria-labelledby="h-r">
        <h2 id="h-r">Riwayat lamaran</h2><p class="sub">Seluruh aktivitas terkait lamaran dan perusahaan.</p>
        <ol class="tl">${tl}</ol>
      </section>
      <div class="stack">
        <section class="card panel" aria-labelledby="h-d">
          <h2 id="h-d">Dokumen terkirim</h2>
          <ul class="files">${a.docs.map((d) => `<li><span class="fi" aria-hidden="true">▤</span><div><b>${esc(d[0])}</b>${d[1] ? `<small>${esc(d[1])}</small>` : ""}</div></li>`).join("") || "<li><small>Tidak ada dokumen.</small></li>"}</ul>
        </section>
        <section class="card panel" aria-labelledby="h-a">
          <h2 id="h-a">Akomodasi yang kamu minta</h2>
          <div style="margin-top:8px">${a.acc.length ? a.acc.map((t) => `<span class="tagx">${esc(t)}</span>`).join("") : '<p class="wait">Kamu tidak meminta akomodasi khusus.</p>'}</div>
          ${a.acc.length ? (a.approved ? '<p class="ok">✓ Disetujui oleh perusahaan</p>' : '<p class="wait">Menunggu persetujuan perusahaan</p>') : ""}
        </section>
      </div>
    </div>`;
})();
