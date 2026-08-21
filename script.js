/*
  ==============================
  PENGATURAN WEBSITE
  ==============================

  Nama dan foto sudah dibuat PERMANEN.
  Pengunjung tidak memiliki form untuk mengubahnya.

  Untuk mengganti musik:
  1. Masukkan file MP3 ke folder: music/
  2. Beri nama: lagu.mp3
  3. Upload ke GitHub.

  Kalau ingin nama file musik berbeda, ubah MUSIC_FILE di bawah.
*/

const MUSIC_FILE = "music/lagu.mp3";

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = musicBtn.querySelector(".music-label");
const toast = document.getElementById("toast");
const floatLayer = document.getElementById("floatLayer");
const sparkleLayer = document.getElementById("sparkleLayer");

// Pastikan sumber musik mengikuti pengaturan di atas.
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
      showToast("Belum ada musik. Tambahkan music/lagu.mp3 di GitHub 🎵");
    }
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.setAttribute("aria-label", "Putar musik");
    musicLabel.textContent = "Putar Musik";
  }
}

musicBtn.addEventListener("click", toggleMusic);

music.addEventListener("error", () => {
  musicBtn.classList.remove("playing");
});

// Membuat hati seperti gelembung yang melayang dari bawah ke atas.
const heartCount = window.innerWidth < 600 ? 18 : 28;
const symbols = ["♥", "♡", "❤", "💕"];

for (let i = 0; i < heartCount; i++) {
  const heart = document.createElement("div");
  heart.className = "float-heart";
  if (i % 5 === 0) heart.classList.add("bubble");

  const size = 18 + Math.random() * 30;
  heart.style.setProperty("--left", `${Math.random() * 100}%`);
  heart.style.setProperty("--size", `${size}px`);
  heart.style.setProperty("--duration", `${8 + Math.random() * 10}s`);
  heart.style.setProperty("--delay", `${-Math.random() * 15}s`);
  heart.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
  heart.style.setProperty("--opacity", `${0.22 + Math.random() * 0.42}`);
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  floatLayer.appendChild(heart);
}

// Sparkle kecil untuk efek dreamy.
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

// Saat halaman pertama kali disentuh/diklik, kita mencoba menyalakan musik.
// Ini mengikuti aturan autoplay browser: musik tidak dipaksa berjalan sebelum interaksi.
document.addEventListener("click", () => {
  if (music.paused && music.readyState > 0) {
    music.play().then(() => {
      musicBtn.classList.add("playing");
      musicLabel.textContent = "Musik Berjalan";
    }).catch(() => {});
  }
}, { once: true });
