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

  /* ---------- Header: user + aksesibilitas (sama seperti beranda) ---------- */
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

  /* ---------- Data lowongan (ganti dengan fetch ke API kamu) ---------- */
  const JOBS = [
    {
      co: "Nusantara Digital",
      t: "Customer Support Specialist",
      city: "Jakarta Selatan",
      mode: "Hybrid",
      min: 5,
      max: 8,
      dis: ["Fisik", "Netra"],
      acc: ["Ramah disabilitas fisik", "Akses kursi roda", "Kerja hybrid"],
      c: "#dbe6ff",
    },
    {
      co: "Visiona Finansial",
      t: "Junior Data Analyst",
      city: "Bandung",
      mode: "Remote",
      min: 6,
      max: 10,
      dis: ["Tuli/Wicara", "Fisik"],
      acc: ["Ramah disabilitas fisik", "Akses kursi roda", "Kerja hybrid"],
      c: "#f6d4f2",
    },
    {
      co: "Kelor Negeri",
      t: "Customer Support Specialist",
      city: "Yogyakarta",
      mode: "On-site",
      min: 4,
      max: 6,
      dis: ["Fisik"],
      acc: ["Ramah disabilitas fisik", "Akses kursi roda", "Kerja hybrid"],
      c: "#fde7a8",
    },
    {
      co: "Pelita Kreatif",
      t: "Desain Grafis Junior",
      city: "Surabaya",
      mode: "Remote",
      min: 4.5,
      max: 7,
      dis: ["Tuli/Wicara", "Intelektual"],
      acc: ["Juru bahasa isyarat", "Jam fleksibel", "Kerja remote"],
      c: "#d5f3e4",
    },
    {
      co: "Sentra Logistik",
      t: "Administrasi Gudang",
      city: "Semarang",
      mode: "On-site",
      min: 4,
      max: 5.5,
      dis: ["Fisik", "Psikososial"],
      acc: ["Akses kursi roda", "Jam fleksibel"],
      c: "#ffe0d6",
    },
    {
      co: "Teknologi Wicara",
      t: "QA Tester",
      city: "Jakarta Barat",
      mode: "Hybrid",
      min: 7,
      max: 12,
      dis: ["Netra", "Fisik"],
      acc: ["Pembaca layar", "Akses kursi roda", "Kerja hybrid"],
      c: "#e3dcff",
    },
    {
      co: "Aksara Media",
      t: "Content Writer",
      city: "Malang",
      mode: "Remote",
      min: 4,
      max: 7,
      dis: ["Tuli/Wicara", "Fisik", "Psikososial"],
      acc: ["Jam fleksibel", "Kerja remote"],
      c: "#dbe6ff",
    },
    {
      co: "Bumi Retail",
      t: "Staf Administrasi",
      city: "Medan",
      mode: "On-site",
      min: 4,
      max: 5,
      dis: ["Fisik", "Intelektual"],
      acc: ["Akses kursi roda", "Ramah disabilitas fisik"],
      c: "#fde7a8",
    },
    {
      co: "Cakra Konsultan",
      t: "Customer Service Chat",
      city: "Denpasar",
      mode: "Remote",
      min: 4.5,
      max: 6.5,
      dis: ["Fisik", "Netra", "Psikososial"],
      acc: ["Pembaca layar", "Jam fleksibel", "Kerja remote"],
      c: "#f6d4f2",
    },
    {
      co: "Nusantara Digital",
      t: "UI Designer",
      city: "Jakarta Selatan",
      mode: "Hybrid",
      min: 8,
      max: 14,
      dis: ["Tuli/Wicara", "Fisik"],
      acc: ["Juru bahasa isyarat", "Kerja hybrid"],
      c: "#dbe6ff",
    },
  ];
  const OPTS = {
    dis: ["Fisik", "Netra", "Tuli/Wicara", "Intelektual", "Psikososial"],
    acc: [
      "Akses kursi roda",
      "Juru bahasa isyarat",
      "Pembaca layar",
      "Jam fleksibel",
    ],
    mode: ["Remote", "Hybrid", "On-site"],
  };
  const PER_PAGE = 3;
  let page = 1,
    applied = {
      dis: [],
      acc: [],
      mode: [],
      min: null,
      max: null,
      q: "",
      loc: "",
    };

  /* ---------- Bangun checkbox filter ---------- */
  document.querySelectorAll("fieldset[data-group]").forEach((fs) => {
    const g = fs.dataset.group;
    OPTS[g].forEach((o) => {
      const l = document.createElement("label");
      l.className = "opt";
      l.innerHTML =
        '<input type="checkbox" name="' +
        g +
        '" value="' +
        o +
        '"><span>' +
        o +
        "</span>";
      fs.appendChild(l);
    });
  });

  const checked = (g) =>
    [...document.querySelectorAll('input[name="' + g + '"]:checked')].map(
      (i) => i.value,
    );
  const num = (v) => (v === "" ? null : parseFloat(v));

  /* ---------- Filter + render ---------- */
  const rupiah = (n) => String(n).replace(".", ",");
  const esc = (s) =>
    s.replace(
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

  function filtered() {
    const q = applied.q.toLowerCase(),
      loc = applied.loc.toLowerCase();
    return JOBS.filter((j) => {
      const hay = (j.t + " " + j.co + " " + j.acc.join(" ")).toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (loc && !(j.city + " " + j.mode).toLowerCase().includes(loc))
        return false;
      if (applied.dis.length && !applied.dis.some((d) => j.dis.includes(d)))
        return false;
      if (
        applied.acc.length &&
        !applied.acc.every((a) =>
          j.acc.some((x) =>
            x
              .toLowerCase()
              .includes(
                a
                  .toLowerCase()
                  .replace("akses ", "")
                  .replace("kursi roda", "kursi roda"),
              ),
          ),
        )
      )
        return false;
      if (applied.mode.length && !applied.mode.includes(j.mode)) return false;
      if (applied.min !== null && j.max < applied.min) return false;
      if (applied.max !== null && j.min > applied.max) return false;
      return true;
    });
  }

  function render() {
    const data = filtered();
    const pages = Math.max(1, Math.ceil(data.length / PER_PAGE));
    page = Math.min(page, pages);
    const slice = data.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    $("count").innerHTML =
      "Menampilkan <b>" +
      data.length +
      "</b> dari <b>1.240+</b> lowongan inklusif";
    $("list").innerHTML = slice.length
      ? slice
          .map(
            (j) => `
      <article class="job">
        <div class="lg" style="background:${j.c};color:var(--navy)" aria-hidden="true">${esc(j.co[0])}</div>
        <div class="info">
          <div class="co">${esc(j.co)} <span class="v">✓ Terverifikasi</span></div>
          <h3>${esc(j.t)}</h3>
          <div class="meta"><span>📍 ${esc(j.city)} · ${esc(j.mode)}</span><span>Rp${rupiah(j.min)}–${rupiah(j.max)} Juta / Bulan</span></div>
          <div class="tags">${j.acc.map((a) => '<span class="tag">✓ ' + esc(a) + "</span>").join("")}</div>
        </div>
        <button class="go" type="button" data-co="${esc(j.co)}">Lihat Profil Perusahaan</button>
      </article>`,
          )
          .join("")
      : '<div class="empty">Belum ada lowongan yang cocok. Coba kurangi filter atau ubah kata kunci.</div>';

    const p = $("pager");
    p.innerHTML = "";
    const mk = (txt, label, dis, cb, cur) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = txt;
      b.setAttribute("aria-label", label);
      b.disabled = dis;
      if (cur) {
        b.classList.add("cur");
        b.setAttribute("aria-current", "page");
      }
      b.addEventListener("click", cb);
      p.appendChild(b);
    };
    mk("‹", "Halaman sebelumnya", page === 1, () => {
      page--;
      render();
      scrollTo({ top: 300, behavior: "smooth" });
    });
    for (let i = 1; i <= pages; i++)
      mk(
        i,
        "Halaman " + i,
        false,
        () => {
          page = i;
          render();
        },
        i === page,
      );
    mk("›", "Halaman berikutnya", page === pages, () => {
      page++;
      render();
      scrollTo({ top: 300, behavior: "smooth" });
    });
  }

  function apply() {
    applied = {
      dis: checked("dis"),
      acc: checked("acc"),
      mode: checked("mode"),
      min: num($("min").value),
      max: num($("max").value),
      q: $("q").value.trim(),
      loc: $("loc").value.trim(),
    };
    page = 1;
    render();
  }

  $("filter").addEventListener("submit", (e) => {
    e.preventDefault();
    apply();
  });
  $("search").addEventListener("submit", (e) => {
    e.preventDefault();
    apply();
  });
  $("reset").addEventListener("click", () => {
    $("filter").reset();
    apply();
  });
  document.querySelectorAll(".popular button").forEach((b) =>
    b.addEventListener("click", () => {
      $("q").value = b.textContent;
      apply();
    }),
  );
  $("list").addEventListener("click", (e) => {
    const b = e.target.closest(".go");
    // TODO: arahkan ke halaman profil perusahaan, mis. perusahaan.html?nama=...
    if (b) console.log("Profil perusahaan:", b.dataset.co);
  });

  /* ---------- Terima kata kunci dari beranda (?q=...&lokasi=...) ---------- */
  const params = new URLSearchParams(location.search);
  $("q").value = params.get("q") || "";
  $("loc").value = params.get("lokasi") || "";
  apply();
})();
