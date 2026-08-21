const photoInput = document.getElementById("photoInput");
const preview = document.getElementById("preview");
const previewWrap = document.getElementById("previewWrap");
const uploadText = document.getElementById("uploadText");
const nameInput = document.getElementById("nameInput");

const setupCard = document.getElementById("setupCard");
const birthdayCard = document.getElementById("birthdayCard");
const wifePhoto = document.getElementById("wifePhoto");
const wifeName = document.getElementById("wifeName");

let photoData = "";

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    photoData = reader.result;
    preview.src = photoData;
    previewWrap.classList.remove("hidden");
    uploadText.textContent = "📷 Foto sudah dipilih";
  };

  reader.readAsDataURL(file);
});

document.getElementById("startBtn").addEventListener("click", () => {
  if (!photoData) {
    alert("Silakan pilih foto istri terlebih dahulu ❤️");
    return;
  }

  const name = nameInput.value.trim() || "Sayang";

  wifeName.textContent = name;
  wifePhoto.src = photoData;

  setupCard.classList.add("hidden");
  birthdayCard.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("againBtn").addEventListener("click", () => {
  birthdayCard.classList.add("hidden");
  setupCard.classList.remove("hidden");

  photoInput.value = "";
  nameInput.value = "";
  photoData = "";
  preview.src = "";
  previewWrap.classList.add("hidden");
  uploadText.textContent = "📷 Pilih Foto Istri";
});
