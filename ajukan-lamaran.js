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
  const co = COMPANIES.find((x) => x.id === job.cid);
  const MAX = 2 * 1024 * 1024;
  document.title = "Aequalis – Ajukan Lamaran " + job.title;

  /* Ringkasan */
  $("back").href = "detail-lamaran.html?job=" + encodeURIComponent(job.id);
  $("s-title").textContent = job.title;
  $("s-co").textContent = co.name;
  $("s-city").textContent = job.city + ", Indonesia";
  $("s-type").textContent =
    job.type === "Penuh waktu" ? "Full Time" : "Part Time";
  $("s-days").textContent = "Dipasang " + job.days + " hari yang lalu";
  $("p-send").textContent =
    `Lamaran untuk ${job.title} di ${co.short} akan dikirim. Data diri dan dokumen tidak dapat diubah setelah dikirim.`;

  const apps = () => {
    try {
      return JSON.parse(localStorage.getItem("aequalis_applications") || "[]");
    } catch {
      return [];
    }
  };
  if (apps().some((a) => a.job === job.id)) {
    $("done").hidden = false;
    $("btn-send").disabled = true;
    $("btn-send").textContent = "✓ Sudah dilamar";
  }
  $("nama").value = localStorage.getItem("aequalis_user") || "";

  /* Dokumen */
  const DOCS = [
    {
      key: "cv",
      label: "CV / Resume",
      hint: "PDF/DOC, maks. 2MB",
      ext: ["pdf", "doc", "docx"],
      req: true,
      svg: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5"/>',
    },
    {
      key: "ktp",
      label: "KTP",
      hint: "JPG/PNG/PDF, maks. 2MB",
      ext: ["jpg", "jpeg", "png", "pdf"],
      req: true,
      svg: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M14 10h4M14 14h4M6 16c.5-1.500 2-2 3-2s2.500.5 3 2"/>',
    },
    {
      key: "sert",
      label: "Sertifikat (Opsional)",
      hint: "PDF/JPG, maks. 2MB",
      ext: ["pdf", "jpg", "jpeg"],
      req: false,
      svg: '<circle cx="12" cy="9" r="5"/><path d="m9 13-1 8 4-2 4 2-1-8"/>',
    },
  ];
  const files = {};
  $("docs").innerHTML =
    DOCS.map(
      (d) => `
    <label class="doc" id="d-${d.key}">
      <span class="ic" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${d.svg}</svg></span>
      <span><b>${d.label}</b><span class="hint">${d.hint}</span></span>
      <input type="file" id="in-${d.key}" accept="${d.ext.map((e) => "." + e).join(",")}" aria-label="Unggah ${d.label}">
      <button type="button" class="x" aria-label="Hapus ${d.label}">✕</button>
    </label>`,
    ).join("") + '<div class="err docerr" id="docerr"></div>';

  DOCS.forEach((d) => {
    const box = $("d-" + d.key),
      input = $("in-" + d.key),
      hint = box.querySelector(".hint");
    const clear = () => {
      delete files[d.key];
      input.value = "";
      box.classList.remove("has");
      hint.textContent = d.hint;
    };
    input.addEventListener("change", () => {
      const f = input.files[0];
      if (!f) return clear();
      const ext = f.name.split(".").pop().toLowerCase();
      if (!d.ext.includes(ext)) {
        clear();
        box.classList.add("bad");
        $("docerr").textContent =
          `${d.label}: format harus ${d.ext.join("/").toUpperCase()}.`;
        return;
      }
      if (f.size > MAX) {
        clear();
        box.classList.add("bad");
        $("docerr").textContent = `${d.label}: ukuran file maksimal 2MB.`;
        return;
      }
      files[d.key] = f;
      box.classList.remove("bad");
      box.classList.add("has");
      hint.textContent = f.name;
      $("docerr").textContent = "";
    });
    box.querySelector(".x").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      clear();
    });
  });

  /* Validasi */
  const setErr = (k, msg) => {
    const f = $("f-" + k);
    f.classList.toggle("bad", !!msg);
    f.querySelector(".err").textContent = msg || "";
    return !msg;
  };
  function validate() {
    const nama = $("nama").value.trim(),
      email = $("email").value.trim(),
      telp = $("telp").value.replace(/[\s-]/g, ""),
      lahir = $("lahir").value;
    const r = [
      setErr("nama", nama.length < 3 ? "Nama lengkap wajib diisi." : ""),
      setErr(
        "email",
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Format email belum benar."
          : "",
      ),
      setErr(
        "telp",
        !/^(\+62|62|0)8\d{7,12}$/.test(telp)
          ? "Nomor telepon belum benar (contoh 08123456789)."
          : "",
      ),
      setErr(
        "lahir",
        !lahir
          ? "Tanggal lahir wajib diisi."
          : new Date(lahir) > new Date()
            ? "Tanggal lahir tidak valid."
            : "",
      ),
    ];
    let docOk = true;
    DOCS.filter((d) => d.req).forEach((d) => {
      if (!files[d.key]) {
        docOk = false;
        $("d-" + d.key).classList.add("bad");
      }
    });
    if (!docOk) $("docerr").textContent = "CV / Resume dan KTP wajib diunggah.";
    const ok = r.every(Boolean) && docOk;
    if (!ok) (document.querySelector(".f.bad input") || $("d-cv")).focus();
    return ok;
  }

  /* Alert / dialog */
  document.querySelectorAll("dialog").forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) dlg.close();
    });
    dlg
      .querySelectorAll("[data-close]")
      .forEach((b) => b.addEventListener("click", () => dlg.close()));
  });
  $("form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate()) $("dlg-send").showModal();
  });
  $("btn-reset").addEventListener("click", () => $("dlg-reset").showModal());

  $("ok-reset").addEventListener("click", () => {
    $("form").reset();
    DOCS.forEach((d) => {
      delete files[d.key];
      const b = $("d-" + d.key);
      b.classList.remove("has", "bad");
      b.querySelector(".hint").textContent = d.hint;
    });
    ["nama", "email", "telp", "lahir"].forEach((k) => setErr(k, ""));
    $("docerr").textContent = "";
    $("dlg-reset").close();
    const t = $("toast");
    t.textContent = "Form dikosongkan.";
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
  });

  $("ok-send").addEventListener("click", () => {
    const payload = {
      job: job.id,
      nama: $("nama").value.trim(),
      email: $("email").value.trim(),
      telp: $("telp").value.trim(),
      lahir: $("lahir").value,
      dokumen: Object.fromEntries(
        Object.entries(files).map(([k, f]) => [k, f.name]),
      ),
      date: new Date().toISOString(),
    };
    // TODO: kirim ke backend, mis. fetch('/api/lamaran', { method:'POST', body: formData })
    try {
      const l = apps();
      l.push(payload);
      localStorage.setItem("aequalis_applications", JSON.stringify(l));
    } catch {}
    location.href =
      "detail-lamaran.html?job=" + encodeURIComponent(job.id) + "&sent=1";
  });
})();
