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

  /* ============================================================
     1. LOGIKA AUTH (LOGIN & DAFTAR)
     ============================================================ */
  const formLogin = $("form-login");
  const formDaftar = $("form-daftar");

  if (formLogin || formDaftar) {
    // Navigasi Pindah Tampilan (Login <-> Daftar)
    document.querySelectorAll("[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".view")
          .forEach((v) => v.classList.remove("active"));
        const targetView = $("view-" + btn.dataset.go);
        if (targetView) targetView.classList.add("active");
      });
    });

    // Toggle Password Visibility
    const eyeOpen =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
    const eyeOff =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 3.9M6.5 6.6C3.8 8.4 2 12 2 12s4 7 10 7c1.6 0 3-.4 4.3-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';

    document.querySelectorAll("[data-eye]").forEach((btn) => {
      btn.innerHTML = eyeOpen;
      btn.addEventListener("click", () => {
        const input = $(btn.dataset.eye);
        if (!input) return;
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.innerHTML = show ? eyeOff : eyeOpen;
        btn.setAttribute(
          "aria-label",
          show ? "Sembunyikan password" : "Lihat password",
        );
      });
    });

    // Helper Validasi
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const passOk = (v) =>
      v.length >= 8 &&
      /[A-Za-z]/.test(v) &&
      /\d/.test(v) &&
      /[^A-Za-z0-9]/.test(v);

    function setError(id, msg) {
      const errEl = $("e-" + id);
      const fieldEl = $("f-" + id);
      if (errEl) errEl.textContent = msg || "";
      if (fieldEl) fieldEl.classList.toggle("invalid", !!msg);
      return !msg;
    }

    function toast(msg) {
      const t = $("toast");
      if (!t) return;
      t.textContent = msg;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 2800);
    }

    // Submit Form Login
    if (formLogin) {
      formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = $("l-email").value.trim();
        const pass = $("l-pass").value;

        const a = setError(
          "l-email",
          !email
            ? "Email wajib diisi."
            : !emailOk(email)
              ? "Format email belum benar."
              : "",
        );
        const b = setError("l-pass", !pass ? "Password wajib diisi." : "");

        if (a && b) {
          const nama = email.split("@")[0].replace(/[._-]+/g, " ");
          store.set(
            "aequalis_user",
            nama.charAt(0).toUpperCase() + nama.slice(1),
          );
          toast("Berhasil masuk. Mengalihkan ke beranda…");
          setTimeout(() => {
            location.href = "beranda.html";
          }, 700);
        }
      });
    }

    // Submit Form Daftar
    if (formDaftar) {
      formDaftar.addEventListener("submit", (e) => {
        e.preventDefault();
        const nama = $("d-nama").value.trim();
        const email = $("d-email").value.trim();
        const pass = $("d-pass").value;
        const pass2 = $("d-pass2").value;

        const r = [
          setError("d-nama", !nama ? "Nama lengkap wajib diisi." : ""),
          setError(
            "d-email",
            !email
              ? "Email wajib diisi."
              : !emailOk(email)
                ? "Format email belum benar."
                : "",
          ),
          setError(
            "d-pass",
            !pass
              ? "Password wajib diisi."
              : !passOk(pass)
                ? "Gunakan minimal 8 karakter dengan huruf, angka, dan simbol."
                : "",
          ),
          setError(
            "d-pass2",
            pass2 !== pass ? "Konfirmasi password tidak sama." : "",
          ),
        ];

        if (r.every(Boolean)) {
          toast("Akun berhasil dibuat. Silakan masuk.");
          e.target.reset();
          setTimeout(() => {
            const btnGoLogin = document.querySelector(
              '#view-daftar [data-go="login"]',
            );
            if (btnGoLogin) btnGoLogin.click();
          }, 900);
        }
      });
    }

    // Reset error indicator saat input berubah
    document.querySelectorAll(".field input").forEach((inp) => {
      inp.addEventListener("input", () => {
        const id = inp.id.replace(/^(l|d)-/, "");
        setError((inp.id.startsWith("l-") ? "l-" : "d-") + id, "");
      });
    });
  }

  /* ============================================================
     2. LOGIKA BERANDA & AKSESIBILITAS
     ============================================================ */
  const userBtn = $("user-btn");
  if (userBtn) {
    // Session Pengguna
    const name = store.get("aequalis_user") || "User";
    if ($("user-label")) $("user-label").textContent = "Halo, " + name;
    if ($("who-name")) $("who-name").textContent = name;
    if ($("avatar")) $("avatar").textContent = name.charAt(0).toUpperCase();

    // Dropdown User
    const dd = $("dropdown");
    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dd.classList.toggle("open");
      userBtn.setAttribute("aria-expanded", open);
    });

    document.addEventListener("click", () => {
      if (dd) dd.classList.remove("open");
      userBtn.setAttribute("aria-expanded", false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dd) dd.classList.remove("open");
    });

    if ($("logout")) {
      $("logout").addEventListener("click", () => {
        store.del("aequalis_user");
        location.href = "login.html";
      });
    }

    // Fitur Ukuran Teks
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
    applySize();

    // Fitur Toggle Kontras & Disleksia Font
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
        if ($(t.els[0])) $(t.els[0]).setAttribute("aria-pressed", on);
        if ($(t.els[1])) $(t.els[1]).setAttribute("aria-checked", on);
        store.set(t.key, on ? "1" : "0");
      };

      t.els.forEach((id) => {
        const el = $(id);
        if (el) {
          el.addEventListener("click", () =>
            apply(!root.classList.contains(t.cls)),
          );
        }
      });
      apply(store.get(t.key) === "1");
    });

    // Fitur Pencarian & Chip Keyword
    document.querySelectorAll(".chip").forEach((c) =>
      c.addEventListener("click", () => {
        const qInput = $("q");
        if (qInput) {
          qInput.value = c.textContent;
          qInput.focus();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }),
    );

    const searchForm = $("search");
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = encodeURIComponent(($("q")?.value || "").trim());
        const loc = encodeURIComponent(($("loc")?.value || "").trim());
        console.log("Cari lowongan:", q, loc);
      });
    }
  }
})();
