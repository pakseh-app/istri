/*
  ==============================================
  PENGATURAN WEBSITE
  ==============================================

  Nama Wulan dan isi surat sudah permanen.
  Pengunjung tidak memiliki form untuk mengubahnya.

  MUSIK:
  Masukkan file MP3 pilihanmu ke folder music/
  lalu beri nama: lagu.mp3

  Kalau ingin memakai nama file lain, ubah MUSIC_FILE di bawah.
*/

const MUSIC_FILE = "music/lagu.mp3";

const intro = document.getElementById("intro");
const letterScene = document.getElementById("letterScene");
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = musicBtn.querySelector(".music-label");
const toast = document.getElementById("toast");
const floatLayer = document.getElementById("floatLayer");
const sparkleLayer = document.getElementById("sparkleLayer");

music.src = MUSIC_FILE;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("aria-label", "Jeda musik");
      musicLabel.textContent = "Musik Berjalan";
    } catch (error) {
      showToast("Tambahkan music/lagu.mp3 ke GitHub terlebih dahulu 🎵");
    }
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.setAttribute("aria-label", "Putar musik");
    musicLabel.textContent = "Musik";
  }
}

musicBtn.addEventListener("click", toggleMusic);
music.addEventListener("error", () => musicBtn.classList.remove("playing"));

function tryStartMusic() {
  if (!music.paused) return;
  music.play().then(() => {
    musicBtn.classList.add("playing");
    musicLabel.textContent = "Musik Berjalan";
  }).catch(() => {});
}

/* Membuka halaman amplop. */
openBtn.addEventListener("click", () => {
  // Tampilkan animasi flap amplop terlebih dahulu, lalu pindah ke surat.
  const introEnvelope = document.querySelector(".intro-envelope");
  introEnvelope.classList.add("opening");
  tryStartMusic();

  setTimeout(() => {
    intro.classList.add("hide");
  }, 360);

  setTimeout(() => {
    intro.style.display = "none";
    letterScene.classList.add("show");
    letterScene.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      envelope.classList.add("open");
      setTimeout(() => {
        letterScene.classList.add("revealed");
        setupPrayerReadingAnimation();
      }, 1350);
    }, 420);
  }, 900);
});

/* =========================================================
   ANIMASI DOA SAAT DIBACA
   Mengikuti gaya referensi video: setiap bagian doa masuk
   dari bawah dengan fade + blur lembut ketika pembaca
   menggulir sampai bagian tersebut.
   ========================================================= */
function setupPrayerReadingAnimation() {
  const paragraphs = [...document.querySelectorAll(".prayer p")];
  if (!paragraphs.length || paragraphs[0].dataset.animated === "1") return;

  paragraphs.forEach((paragraph, index) => {
    paragraph.dataset.animated = "1";
    paragraph.classList.add("reveal-ready");
    paragraph.style.setProperty("--reveal-delay", `${Math.min(index * 0.04, 0.18)}s`);
  });

  const reveal = (paragraph) => {
    if (paragraph.classList.contains("reveal-reading")) return;
    paragraph.classList.add("reveal-reading");
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: document.querySelector(".paper-inner"),
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px"
  });

  paragraphs.forEach((paragraph) => observer.observe(paragraph));

  // Paragraf pertama langsung terasa masuk ketika surat mulai dibaca.
  requestAnimationFrame(() => {
    if (paragraphs[0]) reveal(paragraphs[0]);
  });
}

/* Hati seperti gelembung yang melayang dari bawah. */
const heartCount = window.innerWidth < 600 ? 34 : 48;
for (let i = 0; i < heartCount; i++) {
  const heart = document.createElement("div");
  heart.className = "float-heart";
  if (i % 3 === 0) heart.classList.add("bubble");
  const size = i % 3 === 0 ? 13 + Math.random() * 28 : 16 + Math.random() * 30;
  heart.style.setProperty("--left", `${Math.random() * 100}%`);
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--duration", `${9 + Math.random() * 11}s`);
  heart.style.setProperty("--delay", `${-Math.random() * 16}s`);
  heart.style.setProperty("--drift", `${-110 + Math.random() * 220}px`);
  heart.style.setProperty("--opacity", `${0.24 + Math.random() * 0.48}`);
  floatLayer.appendChild(heart);
}

/* Sparkle lembut di seluruh halaman. */
const sparkleCount = window.innerWidth < 600 ? 10 : 18;
for (let i = 0; i < sparkleCount; i++) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.setProperty("--left", `${Math.random() * 100}%`);
  sparkle.style.setProperty("--top", `${Math.random() * 100}%`);
  sparkle.style.setProperty("--size", `${4 + Math.random() * 8}px`);
  sparkle.style.setProperty("--duration", `${2 + Math.random() * 3}s`);
  sparkle.style.setProperty("--delay", `${-Math.random() * 4}s`);
  sparkle.style.setProperty("--opacity", `${.3 + Math.random() * .6}`);
  sparkleLayer.appendChild(sparkle);
}
