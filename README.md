# 🤖 Android Modding & ADB Orchestration via Google Antigravity (AGY)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Android ADB](https://img.shields.io/badge/Android-ADB-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/tools/adb)
[![Google Antigravity](https://img.shields.io/badge/Google-Antigravity_CLI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://github.com/atzartech-prog/androidmodviaagycl)

Aplikasi web interaktif modern yang menyajikan tutorial komprehensif mengenai **otak-atik sistem Android**, **sideloading/instalasi aplikasi tingkat lanjut**, **troubleshooting & penyelamatan bootloop**, serta **kustomisasi ekstrem Termux** melalui sambungan **USB ADB**, yang diorkestrasi secara otomatis oleh **Agent AI (Google Antigravity CLI / AGY)**.

---

## 🌟 Ikhtisar & Arsitektur

Modding Android tradisional sering kali membutuhkan interaksi manual yang lambat, berisiko salah ketik perintah shell, dan membingungkan pemula. Dengan mengintegrasikan **Google Antigravity CLI Agent** dengan antarmuka **Android Debug Bridge (ADB)** via USB, kita menciptakan alur kerja otonom di mana:

1. **User Goal**: Pengguna memberikan instruksi bahasa alami (misal: *"Audit bloatware pabrikan, amankan logcat crash, dan pasang SSH server di Termux"*).
2. **Antigravity AI Agent**: Membaca state perangkat via ADB tools, merencanakan eksekusi (planning), memverifikasi dependensi, dan menjalankan perintah shell sistem.
3. **ADB Daemon**: Mengeksekusi instruksi di layer sistem operasi Android secara aman dan terukur.
4. **Self-Healing & Feedback**: Jika terjadi kegagalan (misal package diproteksi atau izin ditolak), agen AI menganalisis error log dan menerapkan fallback strategy secara otomatis.

```
+------------------------+        +--------------------------+
|  User / Pengembang     | -----> | Google Antigravity (AGY) |
|  (Natural Prompt)      |        | (Agentic AI Reasoning)   |
+------------------------+        +--------------------------+
                                               |
                                               v  (Tool Calls / Shell MCP)
                                  +--------------------------+
                                  |    USB ADB Interface     |
                                  |   (Android Debug Bridge) |
                                  +--------------------------+
                                               |
                                               v
                                  +--------------------------+
                                  |   Perangkat Android      |
                                  | (System, Termux, Linux)  |
                                  +--------------------------+
```

---

## 🚀 Fitur Utama Aplikasi Web

- **📚 4 Modul Pembelajaran Interaktif**:
  - **Setup & Prerequisites**: Langkah aktivasi Developer Options, USB Debugging, otorisasi RSA fingerprint, hingga pairing ADB.
  - **Modul 1 (Instalasi & Debloat APK)**: Teknik bypass runtime permission (`-g`), instalasi Split APKs (`adb install-multiple`), dan debloat bloatware aman tanpa root (`pm uninstall -k --user 0`).
  - **Modul 2 (Troubleshooting & Rescue)**: Penyelamatan perangkat bootloop ke Safe Mode, pembersihan cache package rusak, live logcat crash buffer analysis, serta fastboot flashing.
  - **Modul 3 (Supercharge Termux via ADB)**: Headless OpenSSH server setup (port 8022), USB port forwarding (`adb forward tcp:8022`), dan deployment distribusi Linux penuh via `proot-distro` (Debian/Ubuntu).
  - **Modul 4 (Orkestrasi Google Antigravity)**: Resep prompt agen AI, pembuatan file rule keselamatan sistem, dan pola otomatisasi agentic pair-programming.
- **🎛️ Interactive ADB & AGY Command Generator**:
  - Pilih skenario, atur parameter (nama paket, file APK, nomor port), dan dapatkan script ADB beserta template prompt siap kirim ke Antigravity CLI.
- **📟 Terminal AGY Simulator (Live Demo)**:
  - Uji coba simulasi interaktif alur kerja AI Agent dalam membersihkan bloatware, mengonfigurasi Termux, dan mendiagnosa crash sistem.
- **📑 Quick Cheatsheet & Real-time Filter**:
  - Kamus referensi cepat perintah ADB, Fastboot, Termux, dan hardware dumpsys dengan tombol salin instan.
- **🌓 Dual Theme (Dark / Light Mode)**:
  - Antarmuka futuristik glassmorphism dengan tema gelap ramah mata pengembang dan tema terang yang bersih.

---

## 📂 Struktur Direktori Proyek

```
agycli_android/
├── index.html       # Struktur antarmuka web, navigasi tab, & modul tutorial
├── style.css        # Tata letak glassmorphism modern, responsif, & tema gelap/terang
├── app.js           # Logika interaktif: generator perintah, simulator CLI, filter pencarian
├── README.md        # Dokumentasi lengkap proyek & panduan penggunaan
└── .gitignore       # Konfigurasi pengabaian file Git
```

---

## 💻 Cara Menjalankan Aplikasi Web

Aplikasi ini bersifat *client-side* murni (HTML, CSS, dan Vanilla JavaScript). Anda tidak memerlukan dependensi build tools yang rumit:

### Opsi 1: Buka Langsung di Web Browser
Cukup klik ganda file `index.html` atau buka melalui browser pilihan Anda (Google Chrome, Firefox, Microsoft Edge, Brave, dll).

### Opsi 2: Menggunakan Local Web Server (Python)
Buka terminal / PowerShell di direktori proyek:
```bash
python -m http.server 8080
```
Buka browser di alamat: `http://localhost:8080`

---

## 🛠️ Panduan Ringkas Perintah Kunci (ADB & Antigravity)

### 1. Verifikasi Konektivitas
```bash
adb devices -l
```

### 2. Sideloading dengan Perizinan Penuh
```bash
adb install -r -d -g target_aplikasi.apk
```

### 3. Debloat Bloatware Bawaan (User 0)
```bash
adb shell pm uninstall -k --user 0 com.facebook.katana
# Mengembalikan jika diperlukan:
adb shell cmd package install-existing com.facebook.katana
```

### 4. Mengatasi Bootloop / Soft-Brick
```bash
# Masuk ke Safe Mode:
adb reboot safe-mode

# Ambil crash stacktrace dari logcat:
adb logcat -b crash -v threadtime -d > crash_report.txt

# Bersihkan data package penyebab crash:
adb shell pm clear com.aplikasi.rusak
```

### 5. Setup Headless Termux SSH via Port Forwarding
```bash
# Teruskan port SSH HP ke komputer:
adb forward tcp:8022 tcp:8022

# Hubungkan langsung dari terminal komputer:
ssh -p 8022 u0_a150@localhost
```

---

## 🤖 Contoh Prompt Orkestrasi Google Antigravity

Kirimkan instruksi berikut ke **Antigravity CLI**:
```text
Halo Antigravity Agent, lakukan audit sistem pada perangkat Android yang terhubung via USB:
1. Verifikasi koneksi adb devices dan periksa versi OS Android serta model HP.
2. Periksa buffer logcat crash untuk 10 menit terakhir dan simpulkan jika ada aplikasi sistem yang crash berulang.
3. Berikan rekomendasi debloat aplikasi telemetry tanpa merusak core OS (gunakan user 0).
4. Konfigurasikan Termux agar siap dijadikan server SSH headless pada port 8022.
```

---

## 📜 Lisensi & Kontribusi

Proyek ini dirilis di bawah lisensi **MIT License**. Terbuka untuk kontribusi, penambahan modul, maupun perbaikan bug melalui Pull Request pada repositori GitHub:
👉 [atzartech-prog/androidmodviaagycl](https://github.com/atzartech-prog/androidmodviaagycl)
