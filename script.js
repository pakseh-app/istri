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
  intro.classList.add("hide");
  setTimeout(() => {
    intro.style.display = "none";
    letterScene.classList.add("show");
    letterScene.setAttribute("aria-hidden", "false");

    // Mulai musik setelah tombol Buka ditekan.
    tryStartMusic();

    // Beri sedikit jeda supaya amplop muncul dulu sebelum terbuka.
    setTimeout(() => {
      envelope.classList.add("open");
      setTimeout(() => letterScene.classList.add("revealed"), 1500);
    }, 550);
  }, 580);
});

/* Hati seperti gelembung yang melayang dari bawah. */
const heartCount = window.innerWidth < 600 ? 24 : 34;
for (let i = 0; i < heartCount; i++) {
  const heart = document.createElement("div");
  heart.className = "float-heart";
  if (i % 5 === 0) heart.classList.add("bubble");
  const size = 18 + Math.random() * 30;
  heart.style.setProperty("--left", `${Math.random() * 100}%`);
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--duration", `${8 + Math.random() * 10}s`);
  heart.style.setProperty("--delay", `${-Math.random() * 16}s`);
  heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
  heart.style.setProperty("--opacity", `${0.30 + Math.random() * 0.42}`);
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
