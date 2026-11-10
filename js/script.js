/**
 * The Wedding of Aditya & Anindya
 * Vanilla JavaScript Implementation
 * - URL Parameter Guest Name
 * - Smooth Opening Transition
 * - Real-time Countdown Timer
 * - Dual-Engine Audio Player (HTML5 Audio + Web Audio API Romantic Synthesizer Fallback)
 * - Gallery Lightbox with Keyboard & Touch Navigation
 * - RSVP Form Validation & LocalStorage Persistence with Live Feed
 * - Copy to Clipboard with Toast Notification
 * - Intersection Observer Scroll Reveal & Navigation Spy
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. DYNAMIC GUEST NAME (URL Parameter ?to=...)
  // =========================================================================
  const initGuestName = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to') || urlParams.get('guest') || urlParams.get('u');
    const guestNameEl = document.getElementById('guest-name');
    const rsvpNameInput = document.getElementById('rsvp-name');

    if (guestParam) {
      // Decode and clean up formatting
      const cleanName = guestParam.replace(/\+/g, ' ').trim();
      if (cleanName.length > 0 && guestNameEl) {
        guestNameEl.textContent = cleanName;
        if (rsvpNameInput) {
          rsvpNameInput.value = cleanName;
        }
      }
    }
  };

  // =========================================================================
  // 2. DUAL-ENGINE AUDIO PLAYER (HTML5 + Web Audio API Romantic Ambient Chords)
  // =========================================================================
  const audioEl = document.getElementById('wedding-audio');
  const btnMusicToggle = document.getElementById('btn-music-toggle');
  let isPlaying = false;
  let webAudioCtx = null;
  let synthInterval = null;

  // Gentle Web Audio API Synthesizer (Canon in D / Wedding Chords)
  // Used as reliable offline/zero-file romantic music fallback
  const startRomanticSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!webAudioCtx) {
        webAudioCtx = new AudioContext();
      }
      if (webAudioCtx.state === 'suspended') {
        webAudioCtx.resume();
      }

      // Chord frequencies in Hz: D - A - Bm - F#m - G - D - G - A
      const chords = [
        [293.66, 369.99, 440.00], // D major (D4, F#4, A4)
        [220.00, 277.18, 329.63], // A major (A3, C#4, E4)
        [246.94, 293.66, 369.99], // B minor (B3, D4, F#4)
        [185.00, 220.00, 277.18], // F# minor (F#3, A3, C#4)
        [196.00, 246.94, 293.66], // G major (G3, B3, D4)
        [220.00, 293.66, 369.99], // D major (A3, D4, F#4)
        [196.00, 246.94, 293.66], // G major
        [220.00, 277.18, 329.63]  // A major
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!isPlaying || !webAudioCtx) return;
        const now = webAudioCtx.currentTime;
        const currentChord = chords[chordIndex];
        chordIndex = (chordIndex + 1) % chords.length;

        currentChord.forEach((freq, idx) => {
          const osc = webAudioCtx.createOscillator();
          const gain = webAudioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);

          // Soft bell/harp acoustic envelope
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.045, now + 0.1 + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

          osc.connect(gain);
          gain.connect(webAudioCtx.destination);

          osc.start(now + idx * 0.12);
          osc.stop(now + 3.0);
        });
      };

      playChord();
      synthInterval = setInterval(playChord, 2600);
    } catch (e) {
      console.warn('Web Audio Fallback error:', e);
    }
  };

  const stopRomanticSynth = () => {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  };

  const playMusic = () => {
    isPlaying = true;
    if (btnMusicToggle) {
      btnMusicToggle.classList.add('playing');
    }

    if (audioEl) {
      audioEl.play().catch(() => {
        // Fallback to Web Audio Ambient Chords if media file fails or is blocked
        startRomanticSynth();
      });
    } else {
      startRomanticSynth();
    }
  };

  const pauseMusic = () => {
    isPlaying = false;
    if (btnMusicToggle) {
      btnMusicToggle.classList.remove('playing');
    }
    if (audioEl) {
      audioEl.pause();
    }
    stopRomanticSynth();
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
      showToast('Musik dijeda');
    } else {
      playMusic();
      showToast('Musik diputar');
    }
  };

  if (btnMusicToggle) {
    btnMusicToggle.addEventListener('click', toggleMusic);
  }

  // =========================================================================
  // 3. OPENING INVITATION TRANSITION
  // =========================================================================
  const coverOverlay = document.getElementById('cover-overlay');
  const btnOpenInvitation = document.getElementById('btn-open-invitation');
  const audioContainer = document.getElementById('audio-container');
  const bottomNav = document.getElementById('bottom-nav');

  if (btnOpenInvitation && coverOverlay) {
    btnOpenInvitation.addEventListener('click', () => {
      // 1. Play Opening Sound/Music
      playMusic();

      // 2. Animate Opening Curtain
      coverOverlay.classList.add('opened');
      document.body.classList.remove('lock-scroll');

      // 3. Reveal Floating Navigation & Floating Music Disc
      if (audioContainer) {
        audioContainer.style.display = 'block';
        audioContainer.style.opacity = '0';
        setTimeout(() => {
          audioContainer.style.transition = 'opacity 0.6s ease';
          audioContainer.style.opacity = '1';
        }, 300);
      }

      if (bottomNav) {
        bottomNav.style.display = 'flex';
        bottomNav.style.opacity = '0';
        setTimeout(() => {
          bottomNav.style.transition = 'opacity 0.6s ease';
          bottomNav.style.opacity = '1';
        }, 500);
      }

      // 4. Scroll smoothly to Hero Section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }

      // 5. Trigger first animations
      setTimeout(checkRevealElements, 400);
    });
  }

  // =========================================================================
  // 4. REAL-TIME COUNTDOWN TIMER
  // =========================================================================
  const initCountdown = () => {
    // Wedding Date: 24 October 2026 08:00:00 WIB (UTC+7)
    const weddingDate = new Date('2026-10-24T08:00:00+07:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const statusEl = document.getElementById('countdown-status');

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        if (statusEl) {
          statusEl.textContent = 'Alhamdulillah, hari bahagia telah tiba!';
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const pad = (n) => (n < 10 ? '0' + n : n);

      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minutesEl) minutesEl.textContent = pad(minutes);
      if (secondsEl) secondsEl.textContent = pad(seconds);
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  };

  // =========================================================================
  // 5. GALLERY LIGHTBOX MODAL
  // =========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  let currentGalleryIndex = 0;

  const showGalleryImage = (index) => {
    if (galleryItems.length === 0) return;
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;

    currentGalleryIndex = index;
    const item = galleryItems[index];
    const fullSrc = item.getAttribute('data-src');
    const caption = item.getAttribute('data-caption') || '';

    if (lightboxImg) lightboxImg.src = fullSrc;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${galleryItems.length}`;
    }
  };

  const openLightbox = (index) => {
    if (!lightboxModal) return;
    showGalleryImage(index);
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    // Only restore scroll if cover is opened
    if (coverOverlay && coverOverlay.classList.contains('opened')) {
      document.body.style.overflow = '';
    }
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showGalleryImage(currentGalleryIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showGalleryImage(currentGalleryIndex + 1);
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showGalleryImage(currentGalleryIndex - 1);
    if (e.key === 'ArrowRight') showGalleryImage(currentGalleryIndex + 1);
  });

  // =========================================================================
  // 6. RSVP & WISHES (LocalStorage Persistence + Real-time Rendering)
  // =========================================================================
  const STORAGE_KEY = 'wedding_wishes_aditya_anindya';
  const rsvpForm = document.getElementById('rsvp-form');
  const wishesListEl = document.getElementById('wishes-list');
  const wishesCountEl = document.getElementById('wishes-count');
  const guestsCountGroup = document.getElementById('guests-count-group');

  // Pre-seed realistic initial wishes for engaging initial presentation
  const defaultWishes = [
    {
      id: 'wish-1',
      name: 'Rian & Sarah',
      attendance: 'Hadir',
      guests: '2',
      message: 'Selamat menempuh hidup baru Aditya & Anindya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selamanya!',
      time: '2 jam yang lalu'
    },
    {
      id: 'wish-2',
      name: 'Dimas Prasetyo',
      attendance: 'Hadir',
      guests: '1',
      message: 'Barakallahu lakum wa baraka alaikum. Selamat untuk sahabatku Aditya dan Anindya! Lancar sampai hari H.',
      time: '5 jam yang lalu'
    },
    {
      id: 'wish-3',
      name: 'Dr. Hendri Kusuma & Keluarga',
      attendance: 'Hadir',
      guests: '2',
      message: 'Selamat atas pernikahan Anindya & Aditya. Semoga senantiasa dipenuhi keberkahan dan kebahagiaan berlimpah.',
      time: '1 hari yang lalu'
    },
    {
      id: 'wish-4',
      name: 'Maya Anggraini',
      attendance: 'Tidak Hadir',
      guests: '0',
      message: 'Selamat Anin dan Mas Adit! Mohon maaf belum bisa hadir langsung karena masih di luar kota. Doa terbaik untuk kalian berdua!',
      time: '1 hari yang lalu'
    }
  ];

  const getStoredWishes = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return defaultWishes;
  };

  const saveWishes = (wishes) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'W';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  const renderWishes = () => {
    if (!wishesListEl) return;
    const wishes = getStoredWishes();

    if (wishesCountEl) {
      wishesCountEl.textContent = `${wishes.length} Doa`;
    }

    wishesListEl.innerHTML = '';

    wishes.forEach((item) => {
      const wishItem = document.createElement('div');
      wishItem.className = 'wish-item';

      const isHadir = item.attendance === 'Hadir';
      const badgeClass = isHadir ? 'hadir' : 'tidak-hadir';
      const badgeText = isHadir ? `Hadir (${item.guests || 1} org)` : 'Tidak Hadir';

      wishItem.innerHTML = `
        <div class="wish-header">
          <div class="wish-avatar">${getInitials(item.name)}</div>
          <div class="wish-meta">
            <h4 class="wish-name">${escapeHTML(item.name)}</h4>
            <span class="wish-time">${escapeHTML(item.time || 'Baru saja')}</span>
          </div>
          <span class="wish-badge ${badgeClass}">${badgeText}</span>
        </div>
        <p class="wish-body">${escapeHTML(item.message)}</p>
      `;

      wishesListEl.appendChild(wishItem);
    });
  };

  // Toggle guest count selector based on attendance choice
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  attendanceRadios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      if (guestsCountGroup) {
        if (e.target.value === 'Tidak Hadir') {
          guestsCountGroup.style.display = 'none';
        } else {
          guestsCountGroup.style.display = 'block';
        }
      }
    });
  });

  // Handle RSVP Form Submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('rsvp-name');
      const messageInput = document.getElementById('rsvp-message');
      const guestsSelect = document.getElementById('rsvp-guests');
      const attendanceInput = document.querySelector('input[name="attendance"]:checked');

      const nameError = document.getElementById('name-error');
      const messageError = document.getElementById('message-error');

      let isValid = true;

      // Validation
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Mohon masukkan nama lengkap Anda.';
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameError.classList.remove('visible');
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Mohon tuliskan doa atau ucapan Anda.';
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageError.classList.remove('visible');
      }

      if (!isValid) return;

      const newWish = {
        id: 'wish-' + Date.now(),
        name: nameInput.value.trim(),
        attendance: attendanceInput ? attendanceInput.value : 'Hadir',
        guests: attendanceInput && attendanceInput.value === 'Hadir' ? guestsSelect.value : '0',
        message: messageInput.value.trim(),
        time: 'Baru saja'
      };

      const wishes = getStoredWishes();
      wishes.unshift(newWish);
      saveWishes(wishes);

      renderWishes();

      // Reset message field & keep name
      messageInput.value = '';

      showToast('Terima kasih atas doa & konfirmasi kehadiran Anda!');

      // Smooth scroll to wishes list on small screens
      if (wishesListEl) {
        wishesListEl.scrollTop = 0;
      }
    });
  }

  // =========================================================================
  // 7. COPY ACCOUNT NUMBER WITH TOAST FEEDBACK
  // =========================================================================
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const textToCopy = targetEl.textContent.replace(/\s+/g, '');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Nomor rekening berhasil disalin!');
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  const fallbackCopyText = (text) => {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Nomor rekening berhasil disalin!');
    } catch (err) {
      showToast('Gagal menyalin nomor rekening');
    }
    document.body.removeChild(tempInput);
  };

  // =========================================================================
  // 8. ADD TO GOOGLE CALENDAR
  // =========================================================================
  const calendarButtons = document.querySelectorAll('.add-calendar-btn');
  calendarButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = encodeURIComponent(btn.getAttribute('data-title') || 'Pernikahan Aditya & Anindya');
      const start = btn.getAttribute('data-start') || '20261024T080000';
      const end = btn.getAttribute('data-end') || '20261024T140000';
      const location = encodeURIComponent(btn.getAttribute('data-location') || 'Jakarta Selatan');
      const details = encodeURIComponent('Pernikahan Aditya Pratama & Anindya Kirana. Merupakan kehormatan bagi kami atas kehadiran Anda.');

      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
      window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // =========================================================================
  // 9. TOAST NOTIFICATION UTILITY
  // =========================================================================
  let toastTimeout = null;
  const showToast = (message) => {
    const toastEl = document.getElementById('toast');
    if (!toastEl) return;

    toastEl.textContent = message;
    toastEl.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  };

  // =========================================================================
  // 10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right, .reveal-scale');

  const checkRevealElements = () => {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach((el) => el.classList.add('revealed'));
    }
  };

  // =========================================================================
  // 11. NAVIGATION ACTIVE HIGHLIGHT (SCROLL SPY)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const updateActiveNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 180;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach((nav) => {
          nav.classList.remove('active');
          if (nav.getAttribute('data-section') === sectionId) {
            nav.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Smooth scroll click handler for nav items
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // INITIALIZE EVERYTHING
  // =========================================================================
  initGuestName();
  initCountdown();
  renderWishes();
  checkRevealElements();
});
