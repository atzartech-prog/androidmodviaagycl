document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const sidebar = document.getElementById('sidebar');
  const btnToggleSidebar = document.getElementById('btnToggleSidebar');
  const btnCloseSidebar = document.getElementById('btnCloseSidebar');
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');
  const currentSectionTitle = document.getElementById('currentSectionTitle');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const toastContainer = document.getElementById('toastContainer');
  const sidebarSearchInput = document.getElementById('sidebarSearchInput');

  // Generator Elements
  const actionCategory = document.getElementById('actionCategory');
  const subAction = document.getElementById('subAction');
  const dynamicInputsContainer = document.getElementById('dynamicInputsContainer');
  const btnGenerateCommand = document.getElementById('btnGenerateCommand');
  const generatedAdbOutput = document.getElementById('generatedAdbOutput');
  const generatedPromptOutput = document.getElementById('generatedPromptOutput');
  const btnCopyGeneratedAdb = document.getElementById('btnCopyGeneratedAdb');
  const btnCopyGeneratedPrompt = document.getElementById('btnCopyGeneratedPrompt');

  // Terminal Simulator Elements
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const btnSendTerminal = document.getElementById('btnSendTerminal');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Cheatsheet filter
  const tableFilterInput = document.getElementById('tableFilterInput');
  const cheatsheetTable = document.getElementById('cheatsheetTable');

  // Section titles map
  const sectionTitles = {
    'overview': 'Ikhtisar & Arsitektur',
    'prerequisites': 'Setup & Prerequisites',
    'module-install': '1. Instalasi & Debloat APK',
    'module-troubleshoot': '2. Rescue & Troubleshooting',
    'module-termux': '3. Custom Termux via ADB',
    'module-orchestration': '4. Orkestrasi Antigravity',
    'command-generator': 'ADB & AGY Generator',
    'agent-simulator': 'Terminal AGY Simulator',
    'cheatsheet': 'Quick Cheatsheet'
  };

  // --- NAVIGATION LOGIC ---
  function switchSection(targetId) {
    if (!targetId) return;

    // Remove active class
    contentSections.forEach(sec => sec.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));

    // Activate target
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const activeNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
    if (activeNav) {
      activeNav.classList.add('active');
    }

    if (sectionTitles[targetId]) {
      currentSectionTitle.textContent = sectionTitles[targetId];
    }

    // Close mobile sidebar
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      switchSection(target);
    });
  });

  // Module grid cards click
  document.querySelectorAll('.module-card, .hero-actions .btn').forEach(card => {
    card.addEventListener('click', (e) => {
      const target = card.getAttribute('data-target');
      if (target) {
        e.preventDefault();
        switchSection(target);
      }
    });
  });

  // Mobile sidebar toggle
  if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  if (btnCloseSidebar) {
    btnCloseSidebar.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

  // --- THEME TOGGLER ---
  const savedTheme = localStorage.getItem('agy_theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    themeIcon.textContent = '☀️';
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    themeIcon.textContent = '🌙';
  }

  themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      themeIcon.textContent = '☀️';
      localStorage.setItem('agy_theme', 'light');
      showToast('Mode Terang Diaktifkan');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      themeIcon.textContent = '🌙';
      localStorage.setItem('agy_theme', 'dark');
      showToast('Mode Gelap Diaktifkan');
    }
  });

  // --- TOAST NOTIFICATION ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // --- CLIPBOARD COPY ---
  function setupCopyButtons() {
    document.querySelectorAll('.btn-copy, .btn-copy-sm').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = btn.getAttribute('data-code');
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            showToast('✓ Berhasil disalin ke clipboard');
          });
        }
      });
    });
  }
  setupCopyButtons();

  btnCopyGeneratedAdb.addEventListener('click', () => {
    const text = generatedAdbOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('✓ Perintah ADB disalin!');
    });
  });

  btnCopyGeneratedPrompt.addEventListener('click', () => {
    const text = generatedPromptOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('✓ Prompt Antigravity disalin!');
    });
  });

  // --- SEARCH FILTER FOR SIDEBAR ---
  sidebarSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    navItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // --- QUICK CHEATSHEET TABLE FILTER ---
  if (tableFilterInput && cheatsheetTable) {
    tableFilterInput.addEventListener('input', (e) => {
      const filter = e.target.value.toLowerCase().trim();
      const rows = cheatsheetTable.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    });
  }

  // --- COMMAND GENERATOR DATA & LOGIC ---
  const actionConfigs = {
    app_install: [
      { id: 'single_apk', name: 'Install Single APK (Auto Grant Permissions)', fields: [
        { id: 'apk_path', label: 'Path / Nama File APK:', default: 'MyApp.apk', type: 'text' }
      ]},
      { id: 'split_apk', name: 'Install Split APK / App Bundle (APKS/XAPK)', fields: [
        { id: 'split_paths', label: 'Daftar APK (spasi):', default: 'base.apk split_config.arm64.apk split_config.id.apk', type: 'text' }
      ]},
      { id: 'grant_perm', name: 'Bypass / Beri Perizinan Spesifik (pm grant)', fields: [
        { id: 'pkg_name', label: 'Package Name:', default: 'com.termux', type: 'text' },
        { id: 'perm_name', label: 'Permission Identifier:', default: 'android.permission.WRITE_EXTERNAL_STORAGE', type: 'text' }
      ]}
    ],
    debloat: [
      { id: 'uninstall_user0', name: 'Uninstall Bloatware Tanpa Root (User 0)', fields: [
        { id: 'pkg_name', label: 'Package Name Bloatware:', default: 'com.facebook.katana', type: 'text' }
      ]},
      { id: 'disable_user0', name: 'Nonaktifkan Sementara (Disable User)', fields: [
        { id: 'pkg_name', label: 'Package Name:', default: 'com.google.android.apps.tachyon', type: 'text' }
      ]},
      { id: 'restore_pkg', name: 'Restore / Pulihkan Aplikasi Bawaan Terhapus', fields: [
        { id: 'pkg_name', label: 'Package Name:', default: 'com.facebook.katana', type: 'text' }
      ]}
    ],
    troubleshoot: [
      { id: 'safemode', name: 'Reboot ke Safe Mode (Bypass Crash App)', fields: [] },
      { id: 'clear_app', name: 'Reset Data & Cache Aplikasi Rusak', fields: [
        { id: 'pkg_name', label: 'Package Name Aplikasi Error:', default: 'com.android.chrome', type: 'text' }
      ]},
      { id: 'dump_crash', name: 'Ambil Laporan Crash Terbaru dari Logcat', fields: [
        { id: 'out_file', label: 'Nama File Output:', default: 'crash_report.txt', type: 'text' }
      ]},
      { id: 'fastboot_boot', name: 'Booting TWRP Temporer via Fastboot', fields: [
        { id: 'rec_img', label: 'Nama File Recovery Image:', default: 'twrp-3.7.0.img', type: 'text' }
      ]}
    ],
    termux: [
      { id: 'termux_storage', name: 'Beri Akses Storage Lengkap ke Termux', fields: [] },
      { id: 'termux_ssh_setup', name: 'Setup SSH Server Headless di Port 8022', fields: [
        { id: 'ssh_port', label: 'Port SSH:', default: '8022', type: 'number' }
      ]},
      { id: 'termux_proot', name: 'Pasang Distribusi Linux (Debian / Ubuntu)', fields: [
        { id: 'distro_name', label: 'Distribusi Linux (debian/ubuntu/archlinux):', default: 'debian', type: 'text' }
      ]}
    ],
    diagnostics: [
      { id: 'battery_check', name: 'Audit Baterai & Sensor Suhu', fields: [] },
      { id: 'screen_density', name: 'Ubah Kerapatan Layar (DPI)', fields: [
        { id: 'dpi_val', label: 'Target DPI (contoh: 380, 420):', default: '420', type: 'number' }
      ]},
      { id: 'device_specs', name: 'Dump Spesifikasi Hardware & Kernel', fields: [] }
    ]
  };

  function updateSubActions() {
    const cat = actionCategory.value;
    const actions = actionConfigs[cat] || [];
    subAction.innerHTML = '';
    actions.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.id;
      opt.textContent = a.name;
      subAction.appendChild(opt);
    });
    updateDynamicInputs();
  }

  function updateDynamicInputs() {
    const cat = actionCategory.value;
    const sub = subAction.value;
    const actionObj = (actionConfigs[cat] || []).find(a => a.id === sub);
    dynamicInputsContainer.innerHTML = '';

    if (actionObj && actionObj.fields.length > 0) {
      actionObj.fields.forEach(f => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        formGroup.innerHTML = `
          <label for="input_${f.id}">${f.label}</label>
          <input type="${f.type}" id="input_${f.id}" class="form-input" value="${f.default}">
        `;
        dynamicInputsContainer.appendChild(formGroup);
      });
    }
  }

  actionCategory.addEventListener('change', updateSubActions);
  subAction.addEventListener('change', updateDynamicInputs);
  updateSubActions();

  // Generate output handler
  btnGenerateCommand.addEventListener('click', () => {
    const cat = actionCategory.value;
    const sub = subAction.value;

    let adbCommand = '';
    let agyPrompt = '';

    if (cat === 'app_install') {
      if (sub === 'single_apk') {
        const apk = document.getElementById('input_apk_path')?.value || 'app.apk';
        adbCommand = `# Verifikasi device lalu install aplikasi dengan seluruh izin otomatis:\nadb devices -l\nadb install -r -d -g "${apk}"`;
        agyPrompt = `Halo Google Antigravity Agent, tolong periksa koneksi ADB ke ponsel saya. Jika sudah siap, pasang file APK '${apk}' dengan flag -r -d -g agar semua izin runtime otomatis diberikan. Verifikasi apakah status kembalian adalah 'Success'.`;
      } else if (sub === 'split_apk') {
        const files = document.getElementById('input_split_paths')?.value || 'base.apk';
        adbCommand = `# Install split APK secara atomik:\nadb install-multiple -r ${files}`;
        agyPrompt = `Antigravity Agent, saya memiliki paket aplikasi terpisah: ${files}. Jalankan perintah 'adb install-multiple' untuk memasang seluruh bundle tersebut ke Android saya secara bersamaan.`;
      } else if (sub === 'grant_perm') {
        const pkg = document.getElementById('input_pkg_name')?.value || 'com.termux';
        const perm = document.getElementById('input_perm_name')?.value || 'android.permission.WRITE_EXTERNAL_STORAGE';
        adbCommand = `adb shell pm grant ${pkg} ${perm}`;
        agyPrompt = `Berikan izin runtime '${perm}' untuk paket '${pkg}' melalui 'adb shell pm grant', lalu periksa perizinannya dengan 'dumpsys package ${pkg}'.`;
      }
    } else if (cat === 'debloat') {
      const pkg = document.getElementById('input_pkg_name')?.value || 'com.example.app';
      if (sub === 'uninstall_user0') {
        adbCommand = `# Hapus aplikasi untuk User 0 (systemless / non-destructive):\nadb shell pm uninstall -k --user 0 ${pkg}`;
        agyPrompt = `Antigravity, lakukan debloat pada aplikasi '${pkg}' dengan menjalankan 'adb shell pm uninstall -k --user 0 ${pkg}'. Sebelum menghapus, pastikan paket tersebut benar-benar ada dalam daftar 'adb shell pm list packages'.`;
      } else if (sub === 'disable_user0') {
        adbCommand = `adb shell pm disable-user --user 0 ${pkg}`;
        agyPrompt = `Nonaktifkan sementara package '${pkg}' di Android via ADB tanpa menghapus filenya.`;
      } else if (sub === 'restore_pkg') {
        adbCommand = `adb shell cmd package install-existing ${pkg}`;
        agyPrompt = `Pulihkan kembali package '${pkg}' yang sebelumnya dihapus untuk user 0 menggunakan 'cmd package install-existing'.`;
      }
    } else if (cat === 'troubleshoot') {
      if (sub === 'safemode') {
        adbCommand = `adb reboot safe-mode`;
        agyPrompt = `HP saya mengalami crash berulang karena aplikasi pihak ketiga. Jalankan 'adb reboot safe-mode' untuk memaksa Android reboot ke Mode Aman.`;
      } else if (sub === 'clear_app') {
        const pkg = document.getElementById('input_pkg_name')?.value || 'com.android.chrome';
        adbCommand = `adb shell pm clear ${pkg}`;
        agyPrompt = `Aplikasi '${pkg}' terus mengalami force close (ANR). Reset data dan cache aplikasi tersebut menggunakan 'adb shell pm clear ${pkg}'.`;
      } else if (sub === 'dump_crash') {
        const out = document.getElementById('input_out_file')?.value || 'crash.txt';
        adbCommand = `adb logcat -b crash -v threadtime -d > ${out}`;
        agyPrompt = `Tolong dump stacktrace crash terbaru dari buffer logcat Android ke file '${out}', lalu analisa penyebab utamanya (apakah NullPointerException, OutOfMemory, atau missing permission).`;
      } else if (sub === 'fastboot_boot') {
        const img = document.getElementById('input_rec_img')?.value || 'recovery.img';
        adbCommand = `fastboot devices\nfastboot boot ${img}`;
        agyPrompt = `Cek device di mode fastboot, lalu booting sementara ke custom recovery '${img}' tanpa melakukan flashing ke partisi recovery internal.`;
      }
    } else if (cat === 'termux') {
      if (sub === 'termux_storage') {
        adbCommand = `adb shell pm grant com.termux android.permission.READ_EXTERNAL_STORAGE\nadb shell pm grant com.termux android.permission.WRITE_EXTERNAL_STORAGE\nadb shell "mkdir -p /sdcard/TermuxShared"`;
        agyPrompt = `Siapkan integrasi storage untuk Termux via ADB. Berikan perizinan READ dan WRITE EXTERNAL_STORAGE secara otomatis, lalu verifikasi folder kerja bersama.`;
      } else if (sub === 'termux_ssh_setup') {
        const port = document.getElementById('input_ssh_port')?.value || '8022';
        adbCommand = `# Forward port ADB dari ponsel ke PC:\nadb forward tcp:${port} tcp:${port}\n\n# Luncurkan Termux dan jalankan daemon SSH:\nadb shell monkey -p com.termux -c android.intent.category.LAUNCHER 1\nadb shell input text "pkg\\ update\\ -y\\ &&\\ pkg\\ install\\ openssh\\ -y\\ &&\\ sshd"\nadb shell input keyevent 66`;
        agyPrompt = `Orkestrasikan Termux di ponsel agar menjadi headless SSH server. Forward port ${port} via ADB, luncurkan aplikasi Termux, pasang OpenSSH, dan jalankan daemon sshd.`;
      } else if (sub === 'termux_proot') {
        const distro = document.getElementById('input_distro_name')?.value || 'debian';
        adbCommand = `# Jalankan perintah instalasi proot-distro di dalam Termux:\nadb shell monkey -p com.termux -c android.intent.category.LAUNCHER 1\nadb shell input text "pkg\\ install\\ proot-distro\\ -y\\ &&\\ proot-distro\\ install\\ ${distro}"\nadb shell input keyevent 66`;
        agyPrompt = `Bantu saya memasang distribusi Linux '${distro}' di dalam Termux menggunakan proot-distro melalui otomatisasi ADB.`;
      }
    } else if (cat === 'diagnostics') {
      if (sub === 'battery_check') {
        adbCommand = `adb shell dumpsys battery`;
        agyPrompt = `Jalankan diagnostik baterai 'dumpsys battery' via ADB. Analisa level persentase baterai, kesehatan (health), voltase, dan suhu sensor device dalam derajat celcius.`;
      } else if (sub === 'screen_density') {
        const dpi = document.getElementById('input_dpi_val')?.value || '420';
        adbCommand = `# Periksa resolusi asal:\nadb shell wm size\nadb shell wm density\n\n# Ubah kerapatan layar ke target:\nadb shell wm density ${dpi}`;
        agyPrompt = `Ubah kerapatan layar Android (wm density) menjadi ${dpi} via ADB shell, dan berikan opsi reset jika tampilan terlalu kecil/besar.`;
      } else if (sub === 'device_specs') {
        adbCommand = `adb shell getprop ro.product.model\nadb shell getprop ro.product.manufacturer\nadb shell getprop ro.build.version.release\nadb shell getprop ro.product.cpu.abi`;
        agyPrompt = `Kumpulkan informasi spesifikasi perangkat Android: Model, Pabrikan, Versi Android OS, dan Arsitektur CPU (ABI) menggunakan getprop.`;
      }
    }

    generatedAdbOutput.textContent = adbCommand || '# Perintah belum tersedia';
    generatedPromptOutput.textContent = agyPrompt || 'Prompt belum tersedia';
    showToast('✓ Perintah berhasil dibuat!');
  });

  // --- TERMINAL SIMULATOR LOGIC ---
  function appendTermLine(text, type = 'text') {
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function simulateAgentTask(title, steps) {
    appendTermLine(`\n[TASK STARTED] ${title}`, 'info');
    let delay = 300;

    steps.forEach((step, index) => {
      setTimeout(() => {
        appendTermLine(step.text, step.type);
        if (index === steps.length - 1) {
          appendTermLine(`[TASK FINISHED] Operasi selesai dengan sukses. (Status 200 OK)\n`, 'success');
        }
      }, delay);
      delay += step.wait || 500;
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      handlePreset(preset);
    });
  });

  function handlePreset(preset) {
    if (preset === 'clear_term') {
      terminalOutput.innerHTML = '';
      appendTermLine('[AGY-AGENT] Antigravity CLI Simulator Ready.', 'info');
      return;
    }

    if (preset === 'debloat') {
      simulateAgentTask('Automated Bloatware Removal', [
        { text: '→ Scanning attached device: Pixel 5 (Android 14)', type: 'text', wait: 400 },
        { text: '→ Running: adb shell pm list packages | grep -E "facebook|analytics"', type: 'text', wait: 500 },
        { text: '  Found: com.facebook.katana, com.facebook.system, com.miui.analytics', type: 'warning', wait: 400 },
        { text: '→ Executing: adb shell pm uninstall -k --user 0 com.facebook.katana', type: 'info', wait: 600 },
        { text: '  Output: Success', type: 'success', wait: 300 },
        { text: '→ Executing: adb shell pm disable-user --user 0 com.miui.analytics', type: 'info', wait: 500 },
        { text: '  Output: Package com.miui.analytics new state: disabled-user', type: 'success', wait: 400 }
      ]);
    } else if (preset === 'termux_ssh') {
      simulateAgentTask('Termux Headless SSH Server Setup', [
        { text: '→ Verifying Termux package presence: com.termux', type: 'text', wait: 400 },
        { text: '→ Granting storage permissions via ADB pm grant...', type: 'info', wait: 400 },
        { text: '  Storage permission READ & WRITE: GRANTED', type: 'success', wait: 300 },
        { text: '→ Setting up ADB port forward: tcp:8022 -> tcp:8022', type: 'text', wait: 500 },
        { text: '→ Launching Termux background intent & injecting SSH daemon...', type: 'info', wait: 600 },
        { text: '  SSH service active on port 8022. You can connect: ssh u0_a150@localhost -p 8022', type: 'success', wait: 400 }
      ]);
    } else if (preset === 'fix_bootloop') {
      simulateAgentTask('Emergency Bootloop Recovery & Crash Analysis', [
        { text: '→ Connecting to ADB logcat buffer: crash', type: 'text', wait: 500 },
        { text: '  [CRASH DETECTED] FATAL EXCEPTION in com.broken.widget.theme', type: 'error', wait: 600 },
        { text: '  Reason: java.lang.NullPointerException at SystemUI overlay', type: 'error', wait: 400 },
        { text: '→ Antigravity Decision: Clear cache or reboot into safe-mode', type: 'warning', wait: 500 },
        { text: '→ Executing: adb shell pm clear com.broken.widget.theme', type: 'info', wait: 600 },
        { text: '  Output: Success (Cleared 48.2 MB cache/data)', type: 'success', wait: 400 },
        { text: '→ Device UI recovering... System stabilized.', type: 'success', wait: 400 }
      ]);
    } else if (preset === 'battery_audit') {
      simulateAgentTask('Battery & Thermal Hardware Diagnostic', [
        { text: '→ Running: adb shell dumpsys battery', type: 'text', wait: 400 },
        { text: '  AC powered: false | USB powered: true', type: 'text', wait: 300 },
        { text: '  level: 84% | scale: 100 | status: 2 (Charging)', type: 'success', wait: 400 },
        { text: '  health: 2 (Good) | present: true', type: 'success', wait: 300 },
        { text: '  temperature: 312 (31.2°C) - Optimal thermal range', type: 'info', wait: 400 },
        { text: '  voltage: 4192mV', type: 'text', wait: 300 }
      ]);
    }
  }

  // Handle freeform input
  function handleTerminalSubmit() {
    const val = terminalInput.value.trim();
    if (!val) return;

    appendTermLine(`user@agy-cli:~$ ${val}`, 'user');
    terminalInput.value = '';

    const lower = val.toLowerCase();
    if (lower.includes('debloat')) {
      handlePreset('debloat');
    } else if (lower.includes('termux') || lower.includes('ssh')) {
      handlePreset('termux_ssh');
    } else if (lower.includes('bootloop') || lower.includes('crash') || lower.includes('safe')) {
      handlePreset('fix_bootloop');
    } else if (lower.includes('battery') || lower.includes('baterai')) {
      handlePreset('battery_audit');
    } else if (lower === 'clear' || lower === 'cls') {
      handlePreset('clear_term');
    } else if (lower === 'help') {
      appendTermLine('Perintah yang tersedia di simulator: debloat, termux, ssh, bootloop, crash, battery, clear', 'info');
    } else {
      appendTermLine(`[AGY AI] Memproses instruksi: "${val}"...`, 'info');
      setTimeout(() => {
        appendTermLine(`[AGY AI] Menemukan tindakan ADB yang relevan untuk target. Menjalankan verifikasi sistem... OK.`, 'success');
      }, 700);
    }
  }

  btnSendTerminal.addEventListener('click', handleTerminalSubmit);
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleTerminalSubmit();
    }
  });

  // Initial trigger
  btnGenerateCommand.click();
});
