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

  const DEF = { vis: "Perusahaan terdaftar", kontak: true };
  let saved = load("aequalis_settings", DEF);
  const prof = load("aequalis_profile", {
    nama: "User Aequalis",
    email: "user@gmail.com",
  });
  const first = (prof.nama || "User").split(" ")[0];
  $("av").textContent = first.charAt(0).toUpperCase();
  $("s-nama").textContent = first;
  $("s-email").textContent = prof.email;

  const sw = $("kontak");
  sw.addEventListener("click", () =>
    sw.setAttribute("aria-checked", sw.getAttribute("aria-checked") !== "true"),
  );
  $("eye").addEventListener("click", () => {
    const show = $("pw").type === "password";
    $("pw").type = show ? "text" : "password";
    $("eye").setAttribute(
      "aria-label",
      show ? "Sembunyikan kata sandi" : "Lihat kata sandi",
    );
  });
  function fill() {
    $("vis").value = saved.vis;
    sw.setAttribute("aria-checked", !!saved.kontak);
    $("pw").value = "";
    $("pw").type = "password";
    $("e-pw").textContent = "";
  }
  fill();
  $("side-out").addEventListener("click", openLogout);
  $("reset").addEventListener("click", () => {
    fill();
    toast("Pengaturan diatur ulang.");
  });
  $("alldev").addEventListener("click", () => {
    // TODO: panggil backend untuk mencabut sesi di perangkat lain
    toast("Kamu keluar dari semua perangkat lain.");
  });

  $("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const pw = $("pw").value;
    if (
      pw &&
      !(
        pw.length >= 8 &&
        /[A-Za-z]/.test(pw) &&
        /\d/.test(pw) &&
        /[^A-Za-z0-9]/.test(pw)
      )
    ) {
      $("e-pw").textContent =
        "Gunakan minimal 8 karakter dengan huruf, angka, dan simbol.";
      $("pw").focus();
      return;
    }
    $("e-pw").textContent = "";
    const next = {
      vis: $("vis").value,
      kontak: sw.getAttribute("aria-checked") === "true",
    };
    if (!pw && JSON.stringify(next) === JSON.stringify(saved))
      return toast("Belum ada perubahan untuk disimpan.");
    confirmSave(
      "Pengaturan privasi dan keamanan akunmu akan diperbarui.",
      () => {
        // TODO: kirim ke backend (termasuk kata sandi baru). Kata sandi tidak disimpan di browser.
        saved = next;
        save("aequalis_settings", saved);
        const changedPw = !!pw;
        fill();
        toast(
          changedPw
            ? "Pengaturan dan kata sandi diperbarui."
            : "Pengaturan disimpan.",
        );
      },
    );
  });
})();
