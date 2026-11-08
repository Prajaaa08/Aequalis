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
  document
    .querySelectorAll(".avatar")
    .forEach((e) => (e.textContent = name.charAt(0).toUpperCase()));
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
  const dlgOut = $("dlg-logout");
  $("logout").addEventListener("click", () => {
    dd.classList.remove("open");
    btn.setAttribute("aria-expanded", false);
    dlgOut.showModal();
  });
  dlgOut.addEventListener("click", (e) => {
    if (e.target === dlgOut) dlgOut.close();
  });
  dlgOut
    .querySelectorAll("[data-close]")
    .forEach((b) => b.addEventListener("click", () => dlgOut.close()));
  $("ok-logout").addEventListener("click", () => {
    store.del("aequalis_user");
    location.href = "login.html";
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
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const load = (k, d) => {
    try {
      return { ...d, ...JSON.parse(localStorage.getItem(k) || "{}") };
    } catch {
      return clone(d);
    }
  };
  const save = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  };
  function toast(m) {
    const t = $("toast");
    t.textContent = m;
    t.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove("show"), 2800);
  }
  const dlg = $("dlg-save");
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close();
  });
  dlg
    .querySelectorAll("[data-close]")
    .forEach((b) => b.addEventListener("click", () => dlg.close()));
  function confirmSave(text, onOk) {
    $("p-save").textContent = text;
    $("ok-save").onclick = () => {
      dlg.close();
      onOk();
    };
    dlg.showModal();
  }
  const openLogout = () => $("dlg-logout").showModal();

  const BUL = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const BULF = [
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
  const OPTS = [
    "Interview via chat",
    "Waktu tambahan",
    "Pembaca layar",
    "Juru bahasa isyarat",
    "Akses kursi roda",
    "Jadwal kerja fleksibel",
  ];
  const DOCS = [
    {
      key: "cv",
      label: "CV",
      ext: ["pdf", "doc", "docx"],
      max: 2,
      hint: "PDF/DOC, maks. 2 MB",
    },
    {
      key: "ktp",
      label: "KTP",
      ext: ["jpg", "jpeg", "png", "pdf"],
      max: 2,
      hint: "JPG/PNG/PDF, maks. 2 MB",
    },
    {
      key: "sert",
      label: "Sertifikat (opsional)",
      ext: ["pdf", "jpg", "jpeg"],
      max: 5,
      hint: "PDF/JPG, maks. 5 MB",
    },
  ];
  const DEF = {
    nama: "User Aequalis",
    email: "user@gmail.com",
    telp: "0812 3456 7890",
    lahir: "2003-04-12",
    domisili: "Jakarta Selatan, DKI Jakarta",
    pendidikan: "S1 Manajemen",
    akom: ["Interview via chat", "Waktu tambahan"],
    docs: {
      cv: {
        name: "CV_User_2026.pdf",
        size: "12 KB",
        date: "20 Okt 2026",
      },
      ktp: { name: "KTP.jpg", size: "640 KB", date: "20 Okt 2026" },
      sert: null,
    },
    updated: "2026-10-28",
  };
  let saved = load("aequalis_profile", DEF),
    cur = clone(saved),
    editing = false;
  const F = ["nama", "email", "telp", "lahir", "domisili", "pendidikan"];

  const fmtSize = (b) =>
    b < 1048576
      ? Math.max(1, Math.round(b / 1024)) + " KB"
      : (b / 1048576).toFixed(1) + " MB";
  const today = () => {
    const d = new Date();
    return d.getDate() + " " + BUL[d.getMonth()] + " " + d.getFullYear();
  };

  /* ---------- render ---------- */
  function renderChips() {
    $("chips").innerHTML = OPTS.map(
      (o) =>
        `<button type="button" class="opt" aria-pressed="${cur.akom.includes(o)}">${esc(o)}</button>`,
    ).join("");
    $("chips")
      .querySelectorAll(".opt")
      .forEach((b, i) =>
        b.addEventListener("click", () => {
          const o = OPTS[i],
            k = cur.akom.indexOf(o);
          if (k >= 0) cur.akom.splice(k, 1);
          else cur.akom.push(o);
          b.setAttribute("aria-pressed", k < 0);
          refresh();
        }),
      );
  }
  function renderDocs() {
    $("docs").innerHTML = DOCS.map((d) => {
      const v = cur.docs[d.key];
      return `<div class="doc ${v ? "" : "empty"}"><span class="ic" aria-hidden="true">${v ? "▤" : "⇪"}</span>
        <div class="t"><b>${esc(v ? v.name : d.label)}</b><small>${esc(v ? v.size + " · diunggah " + v.date : d.hint)}</small></div>
        <button type="button" data-k="${d.key}">${v ? "Ganti" : "Unggah"}</button>
        <input type="file" id="in-${d.key}" accept="${d.ext.map((e) => "." + e).join(",")}"></div>`;
    }).join("");
    DOCS.forEach((d) => {
      const input = $("in-" + d.key);
      document
        .querySelector(`[data-k="${d.key}"]`)
        .addEventListener("click", () => input.click());
      input.addEventListener("change", () => {
        const f = input.files[0];
        if (!f) return;
        const ext = f.name.split(".").pop().toLowerCase();
        if (!d.ext.includes(ext)) {
          $("docerr").textContent =
            `${d.label}: format harus ${d.ext.join("/").toUpperCase()}.`;
          return;
        }
        if (f.size > d.max * 1048576) {
          $("docerr").textContent =
            `${d.label}: ukuran file maksimal ${d.max} MB.`;
          return;
        }
        $("docerr").textContent = "";
        cur.docs[d.key] = {
          name: f.name,
          size: fmtSize(f.size),
          date: today(),
        };
        renderDocs();
        refresh();
      });
    });
  }
  function fill() {
    F.forEach((k) => {
      $(k).value = cur[k];
    });
    renderChips();
    renderDocs();
    setEditing(false);
    refresh();
    F.forEach((k) => setErr(k, ""));
    $("upd").textContent =
      "Terakhir diperbarui " +
      ((d) => d.getDate() + " " + BULF[d.getMonth()] + " " + d.getFullYear())(
        new Date(saved.updated),
      );
  }
  function setEditing(on) {
    editing = on;
    F.forEach((k) => {
      $(k).readOnly = !on;
    });
    $("edit").textContent = on ? "Selesai ✓" : "Edit data ✎";
  }
  function collect() {
    const o = { ...cur };
    F.forEach((k) => {
      o[k] = $(k).value.trim();
    });
    return o;
  }
  function pct(o) {
    const parts = [
      F.every((k) => String(o[k]).trim()),
      o.akom.length > 0,
      !!o.docs.cv,
      !!o.docs.ktp,
      !!o.docs.sert,
    ];
    return { n: parts.filter(Boolean).length, parts };
  }
  function refresh() {
    const o = collect(),
      p = pct(o),
      first = (o.nama || "User").split(" ")[0];
    $("av").textContent = first.charAt(0).toUpperCase();
    $("s-nama").textContent = first;
    $("s-role").textContent =
      "Pencari kerja · " + (o.domisili.split(/[ ,]/)[0] || "-");
    $("pct").textContent = p.n * 20 + "%";
    $("seg").innerHTML = [0, 1, 2, 3, 4]
      .map((i) => `<i class="${i < p.n ? "on" : ""}"></i>`)
      .join("");
    $("pct-hint").textContent =
      p.n === 5
        ? "Profilmu sudah lengkap."
        : { 2: "Tambahkan CV dan KTP agar 100%." }[p.n] ||
          (!o.docs.sert && o.docs.cv && o.docs.ktp
            ? "Tambahkan sertifikat agar 100%."
            : "Lengkapi data agar profil 100%.");
  }
  const strip = (o) => {
    const { updated, ...r } = o;
    return JSON.stringify(r);
  };
  const dirty = () => strip(collect()) !== strip(saved);

  /* ---------- validasi ---------- */
  function setErr(k, msg) {
    const f = $("f-" + k);
    f.classList.toggle("bad", !!msg);
    f.querySelector(".err").textContent = msg || "";
    return !msg;
  }
  function validate() {
    const o = collect(),
      tl = o.telp.replace(/[\s-]/g, "");
    const r = [
      setErr("nama", o.nama.length < 3 ? "Nama lengkap wajib diisi." : ""),
      setErr(
        "email",
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)
          ? "Format email belum benar."
          : "",
      ),
      setErr(
        "telp",
        !/^(\+62|62|0)8\d{7,12}$/.test(tl)
          ? "Nomor telepon belum benar (contoh 08123456789)."
          : "",
      ),
      setErr(
        "lahir",
        !o.lahir
          ? "Tanggal lahir wajib diisi."
          : new Date(o.lahir) > new Date()
            ? "Tanggal lahir tidak valid."
            : "",
      ),
      setErr("domisili", !o.domisili ? "Domisili wajib diisi." : ""),
      setErr(
        "pendidikan",
        !o.pendidikan ? "Pendidikan terakhir wajib diisi." : "",
      ),
    ];
    const ok = r.every(Boolean);
    if (!ok) {
      setEditing(true);
      (document.querySelector(".f.bad input") || {}).focus?.();
    }
    return ok;
  }

  /* ---------- aksi ---------- */
  F.forEach((k) => $(k).addEventListener("input", refresh));
  $("edit").addEventListener("click", () => {
    setEditing(!editing);
    if (editing) $("nama").focus();
  });
  $("side-out").addEventListener("click", openLogout);
  $("cancel").addEventListener("click", () => {
    cur = clone(saved);
    fill();
    toast("Perubahan dibatalkan.");
  });

  $("form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!dirty()) return toast("Belum ada perubahan untuk disimpan.");
    if (!validate()) return;
    confirmSave(
      "Data diri, kebutuhan akomodasi, dan dokumen profilmu akan diperbarui.",
      () => {
        saved = {
          ...collect(),
          updated: new Date().toISOString().slice(0, 10),
        };
        // TODO: kirim ke backend, mis. fetch('/api/profil', { method:'PUT', body: JSON.stringify(saved) })
        save("aequalis_profile", saved);
        try {
          localStorage.setItem("aequalis_user", saved.nama.split(" ")[0]);
        } catch {}
        document.querySelectorAll(".avatar").forEach((a) => {
          a.textContent = saved.nama.charAt(0).toUpperCase();
        });
        const ul = $("user-label");
        if (ul) ul.textContent = "Halo, " + saved.nama.split(" ")[0];
        const wn = $("who-name");
        if (wn) wn.textContent = saved.nama.split(" ")[0];
        cur = clone(saved);
        fill();
        toast("Perubahan profil disimpan.");
      },
    );
  });

  fill();
})();
