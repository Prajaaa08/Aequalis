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

  /* ---------- Pengguna (diisi dari halaman login) ---------- */
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
    const open = dd.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
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

  /* ---------- Aksesibilitas ---------- */
  let size = parseInt(store.get("aequalis_size") || "0", 10);
  const applySize = () => {
    ["t--1", "t-1", "t-2", "t-3"].forEach((c) => root.classList.remove(c));
    if (size !== 0) root.classList.add("t-" + size);
    store.set("aequalis_size", size);
  };
  document.querySelectorAll("[data-size]").forEach((b) =>
    b.addEventListener("click", () => {
      size = Math.max(-1, Math.min(3, size + parseInt(b.dataset.size, 10)));
      applySize();
    }),
  );

  const toggles = [
    {
      cls: "contrast",
      key: "aequalis_contrast",
      els: ["t-contrast", "s-contrast"],
    },
    { cls: "dys", key: "aequalis_dys", els: ["t-dys", "s-dys"] },
  ];
  toggles.forEach((t) => {
    const apply = (on) => {
      root.classList.toggle(t.cls, on);
      $(t.els[0]).setAttribute("aria-pressed", on);
      $(t.els[1]).setAttribute("aria-checked", on);
      store.set(t.key, on ? "1" : "0");
    };
    t.els.forEach((id) =>
      $(id).addEventListener("click", () =>
        apply(!root.classList.contains(t.cls)),
      ),
    );
    apply(store.get(t.key) === "1");
  });
  applySize();

  /* ---------- Pencarian ---------- */
  document.querySelectorAll(".chip").forEach((c) =>
    c.addEventListener("click", () => {
      $("q").value = c.textContent;
      $("q").focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }),
  );
  $("search").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = encodeURIComponent($("q").value.trim());
    const loc = encodeURIComponent($("loc").value.trim());
    location.href = `lowongan.html?q=${q}&lokasi=${loc}`;
  });
})();
