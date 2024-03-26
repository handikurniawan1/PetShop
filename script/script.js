document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.onkeydown = function (e) {
  if (e.key === "F12") {
      e.preventDefault();
  }
};


const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img"),
  downloadBtn = wrapper.querySelector(".download");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.onload = () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        // Aktifkan tombol download jika QR Code telah digenerate
        downloadBtn.disabled = false;
    };
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
        // Nonaktifkan tombol download jika QR Code belum digenerate
        downloadBtn.disabled = true;
    }
});

downloadBtn.addEventListener("click", async () => {
    // Ambil URL dari atribut src pada elemen gambar QR Code
    const qrImageUrl = qrImg.src;
  
    // Pastikan URL gambar QR Code sudah ada
    if (qrImageUrl) {
      try {
        // Gunakan fetch untuk mengunduh gambar dari URL
        const response = await fetch(qrImageUrl);
        const blob = await response.blob();
  
        // Buat tautan untuk mendownload gambar QR Code
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = "qrcode.png";
  
        // Simulasikan klik pada tautan untuk mengunduh
        downloadLink.click();
      } catch (error) {
        console.error('Gagal mengunduh gambar QR Code:', error);
      }
    }
  });
