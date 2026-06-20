/* ═══════════════════════════════════════════════════════════
   ELEGANCE BY STOICA — Utilidades compartidas del Salón
   Lógica pura reutilizada por el panel (admin.js) y la web (main.js).
   Sin dependencias. Se expone en window.SalonUtils.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  // Orden de la semana (clave interna, etiqueta y abreviatura)
  const DAYS = [
    { key: "lunes",     label: "Lunes",     abbr: "Lun" },
    { key: "martes",    label: "Martes",    abbr: "Mar" },
    { key: "miercoles", label: "Miércoles", abbr: "Mié" },
    { key: "jueves",    label: "Jueves",    abbr: "Jue" },
    { key: "viernes",   label: "Viernes",   abbr: "Vie" },
    { key: "sabado",    label: "Sábado",    abbr: "Sáb" },
    { key: "domingo",   label: "Domingo",   abbr: "Dom" }
  ];

  // Horario por defecto (Mar–Vie 09–19, Sáb 08–15, resto cerrado)
  function defaultSchedule() {
    return DAYS.map(d => {
      if (["martes", "miercoles", "jueves", "viernes"].includes(d.key)) {
        return { dia: d.key, abierto: true, inicio: "09:00", fin: "19:00" };
      }
      if (d.key === "sabado") {
        return { dia: d.key, abierto: true, inicio: "08:00", fin: "15:00" };
      }
      return { dia: d.key, abierto: false, inicio: "", fin: "" };
    });
  }

  // "09:00h – 19:00h" → ["09:00", "19:00"]
  function parseTimeRange(str) {
    const m = (str || "").match(/(\d{1,2}:\d{2})/g);
    if (m && m.length >= 2) return [m[0], m[1]];
    if (m && m.length === 1) return [m[0], ""];
    return ["", ""];
  }

  // Acepta handle o URL y devuelve el handle/slug limpio (sin @, sin query)
  function parseHandle(value, red) {
    if (!value) return "";
    let v = String(value).trim();
    if (!/^https?:\/\//i.test(v)) {
      return v.replace(/^@/, "").replace(/\/+$/, "");
    }
    try {
      const u = new URL(v);
      let path = u.pathname.replace(/^\/+|\/+$/g, "");
      if (red === "tiktok") path = path.replace(/^@/, "");
      return path;
    } catch (e) {
      return v.replace(/^@/, "");
    }
  }

  // Construye la URL pública a partir del handle/slug
  function socialUrl(red, handle) {
    if (!handle) return "";
    const h = String(handle).trim().replace(/^@/, "");
    if (red === "instagram") return "https://www.instagram.com/" + h + "/";
    if (red === "facebook")  return "https://www.facebook.com/" + h + "/";
    if (red === "tiktok")    return "https://www.tiktok.com/@" + h;
    return "";
  }

  // Migra el formato antiguo (hoursWeek/hoursSat + URLs de redes) al nuevo.
  // Muta y devuelve el objeto; el llamante decide si re-persistir.
  function migrateSalonInfo(info) {
    if (!info || typeof info !== "object") return info;
    if (!Array.isArray(info.schedule)) {
      const sched = defaultSchedule();
      if (info.hoursWeek) {
        const [i, f] = parseTimeRange(info.hoursWeek);
        ["martes", "miercoles", "jueves", "viernes"].forEach(k => {
          const d = sched.find(s => s.dia === k);
          d.abierto = true; d.inicio = i; d.fin = f;
        });
      }
      if (info.hoursSat) {
        const [i, f] = parseTimeRange(info.hoursSat);
        const d = sched.find(s => s.dia === "sabado");
        d.abierto = true; d.inicio = i; d.fin = f;
      }
      info.schedule = sched;
    }
    if (info.instagram && /^https?:\/\//i.test(info.instagram)) info.instagram = parseHandle(info.instagram, "instagram");
    if (info.facebook  && /^https?:\/\//i.test(info.facebook))  info.facebook  = parseHandle(info.facebook, "facebook");
    if (info.tiktok    && /^https?:\/\//i.test(info.tiktok))    info.tiktok    = parseHandle(info.tiktok, "tiktok");
    return info;
  }

  // Agrupa días consecutivos con el mismo horario → [{label, valor, cerrado}]
  function groupSchedule(schedule) {
    if (!Array.isArray(schedule) || !schedule.length) return [];
    const sig = s => (s.abierto && s.inicio && s.fin) ? (s.inicio + "-" + s.fin) : "closed";
    const groups = [];
    schedule.forEach(s => {
      const day = DAYS.find(x => x.key === s.dia) || { abbr: s.dia };
      const signature = sig(s);
      const last = groups[groups.length - 1];
      if (last && last.signature === signature) {
        last.days.push(day);
      } else {
        groups.push({ signature, days: [day], abierto: s.abierto, inicio: s.inicio, fin: s.fin });
      }
    });
    return groups.map(g => {
      let label;
      if (g.days.length === 1) label = g.days[0].abbr;
      else if (g.days.length === 2) label = g.days.map(d => d.abbr).join(", ");
      else label = g.days[0].abbr + "–" + g.days[g.days.length - 1].abbr;
      const cerrado = g.signature === "closed";
      return { label, valor: cerrado ? "Cerrado" : (g.inicio + " – " + g.fin), cerrado };
    });
  }

  // ¿Abierto ahora? Según día y hora locales del visitante.
  function isOpenNow(schedule, date) {
    date = date || new Date();
    if (!Array.isArray(schedule)) return false;
    const map = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    const today = schedule.find(s => s.dia === map[date.getDay()]);
    if (!today || !today.abierto || !today.inicio || !today.fin) return false;
    const now = date.getHours() * 60 + date.getMinutes();
    const [ih, im] = today.inicio.split(":").map(Number);
    const [fh, fm] = today.fin.split(":").map(Number);
    return now >= (ih * 60 + im) && now < (fh * 60 + fm);
  }

  // ─── Validadores ───────────────────────────────────────────
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim()); }
  function validPhone(v) {
    const s = String(v || "").trim();
    return /^\+?[0-9\s().-]{9,20}$/.test(s) && s.replace(/\D/g, "").length >= 9;
  }
  function validUrl(v) { try { new URL(String(v).trim()); return true; } catch (e) { return false; } }
  function validHandle(v) { return /^@?[\w.]{1,40}$/.test(String(v || "").trim()); }       // IG / TikTok
  function validFbSlug(v) { return /^[\w.\-/]{1,80}$/.test(String(v || "").trim()); }       // Facebook (slug/p/...)

  window.SalonUtils = {
    DAYS, defaultSchedule, parseTimeRange, parseHandle, socialUrl,
    migrateSalonInfo, groupSchedule, isOpenNow,
    validEmail, validPhone, validUrl, validHandle, validFbSlug
  };
})();
