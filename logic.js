// Get button groups for FIRST PAGE only
const creativeOptions = document.querySelectorAll('.first-page .creative-option');
const tabs = document.querySelectorAll('.first-page .tab, .first-page .tab-2');
const primaryButtons = document.querySelectorAll('.first-page .btn-primary');
const secondaryButtons = document.querySelectorAll('.first-page .btn-secondary');
const interactivesButton = document.querySelector('.first-page .interactives');
const interactiveButtons = document.querySelectorAll('.first-page .interactive-btn');

// Function to deactivate all buttons in FIRST PAGE only
function deactivateAllFirstPageButtons() {
  creativeOptions.forEach(btn => btn.classList.remove('active'));
  tabs.forEach(btn => btn.classList.remove('active'));
  primaryButtons.forEach(btn => btn.classList.remove('active'));
  secondaryButtons.forEach(btn => btn.classList.remove('active'));
  interactiveButtons.forEach(btn => btn.classList.remove('active'));
  if (interactivesButton) {
    interactivesButton.classList.remove('active');
  }
}

// Creative Options buttons
creativeOptions.forEach(button => {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      deactivateAllFirstPageButtons();
      this.classList.add('active');
    }

    // Si está en la second-page, regresar a first-page con animación
    const secondPage = document.querySelector('.second-page');
    const firstPage = document.querySelector('.first-page');
    const backButton = document.querySelector('.back-button');
    if (secondPage && secondPage.classList.contains('visible')) {
      // Resetear todos los botones de ambas páginas
      deactivateAllFirstPageButtons();
      deactivateAllSecondPageButtons();

      // Ocultar second-page con animación
      secondPage.classList.remove('visible');
      if (backButton) backButton.style.display = 'none';
      setTimeout(() => {
        secondPage.style.display = 'none';
        firstPage.style.display = 'flex';
        void firstPage.offsetWidth;
        firstPage.classList.remove('hidden');
      }, 500); // Duración igual a la transición CSS
    }
  });
});

// Tab buttons
tabs.forEach(button => {
  button.addEventListener('click', function () {
    const buttonText = this.textContent.trim();

    // Si es el botón "Video", mostrar second-page con animación
    if (buttonText === 'Video') {
      const firstPage = document.querySelector('.first-page');
      const secondPage = document.querySelector('.second-page');
      const backButton = document.querySelector('.back-button');

      if (firstPage && secondPage) {
        // Resetear todos los botones de ambas páginas
        deactivateAllFirstPageButtons();
        deactivateAllSecondPageButtons();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Fade out first-page
        firstPage.classList.add('hidden');

        // Mostrar second-page inmediatamente
        firstPage.classList.add('hidden');
        firstPage.style.display = 'none';
        secondPage.classList.remove('visible');
        secondPage.style.display = 'block';
        void secondPage.offsetWidth;
        secondPage.classList.add('visible');
        if (backButton) {
          backButton.style.display = 'flex';
        }
      }
    } else {
      // Comportamiento normal para otros tabs
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      } else {
        deactivateAllFirstPageButtons();
        this.classList.add('active');
      }
    }
  });
});

// Primary buttons
primaryButtons.forEach(button => {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      deactivateAllFirstPageButtons();
      this.classList.add('active');
    }
  });
});

// Secondary buttons
secondaryButtons.forEach(button => {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      deactivateAllFirstPageButtons();
      this.classList.add('active');
    }
    // Scroll handled in scrollLogic.js
  });
});

// Interactives button
if (interactivesButton) {
  interactivesButton.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      deactivateAllFirstPageButtons();
      this.classList.add('active');
    }
    // Scroll handled in scrollLogic.js
  });
}

// Interactive buttons functionality
interactiveButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Toggle this button only (multi-select allowed)
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
    }
    // Scroll handled in scrollLogic.js
  });
});

// Priority dropdown functionality
const prioritySection = document.getElementById('priority-section');
const priorityDropdown = document.getElementById('priority-dropdown');
const priorityText = document.getElementById('priority-text');
const menu = document.querySelector('.menu');
let isDropdownOpen = false;

prioritySection.addEventListener('click', function () {
  isDropdownOpen = !isDropdownOpen;

  if (isDropdownOpen) {
    prioritySection.classList.add('open');
    priorityDropdown.classList.add('open');
    menu.classList.add('expanded');
  } else {
    prioritySection.classList.remove('open');
    priorityDropdown.classList.remove('open');
    menu.classList.remove('expanded');
  }
});

// Handle priority option selection
const priorityOptions = document.querySelectorAll('.priority-option');
priorityOptions.forEach(option => {
  option.addEventListener('click', function (e) {
    e.stopPropagation();

    // Remove selected class from all options
    priorityOptions.forEach(opt => opt.classList.remove('selected'));

    // Add selected class to clicked option
    this.classList.add('selected');

    // Update the priority text
    priorityText.textContent = this.textContent;

    // Close dropdown
    isDropdownOpen = false;
    prioritySection.classList.remove('open');
    priorityDropdown.classList.remove('open');
    menu.classList.remove('expanded');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
  if (!prioritySection.contains(e.target) && !priorityDropdown.contains(e.target)) {
    if (isDropdownOpen) {
      isDropdownOpen = false;
      prioritySection.classList.remove('open');
      priorityDropdown.classList.remove('open');
      menu.classList.remove('expanded');
    }
  }
});





// -----------------------------------------------------------------------

// Get button groups for SECOND PAGE only
const spCreativeOptions = document.querySelectorAll('.second-page .sp-creative-option');
const spTabs = document.querySelectorAll('.second-page .sp-tab, .second-page .sp-tab-2');
const spPrimaryButtons = document.querySelectorAll('.second-page .sp-btn-primary');
const spSecondaryButtons = document.querySelectorAll('.second-page .sp-btn-secondary, .second-page .sp-59s-video-button');
const spInteractivesButtons = document.querySelectorAll('.second-page .sp-interactives');

// Function to deactivate all buttons in SECOND PAGE only
function deactivateAllSecondPageButtons() {
  spCreativeOptions.forEach(btn => btn.classList.remove('active'));
  spTabs.forEach(btn => btn.classList.remove('active'));
  spPrimaryButtons.forEach(btn => btn.classList.remove('active'));
  spSecondaryButtons.forEach(btn => btn.classList.remove('active'));
  spInteractivesButtons.forEach(btn => btn.classList.remove('active'));
}

// Creative Options buttons
spCreativeOptions.forEach(button => {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      deactivateAllSecondPageButtons();
      this.classList.add('active');
    }

    // Navegar de second-page a first-page con animación
    const secondPage = document.querySelector('.second-page');
    const firstPage = document.querySelector('.first-page');
    const backButton = document.querySelector('.back-button');
    if (secondPage && secondPage.classList.contains('visible')) {
      // Resetear todos los botones de ambas páginas
      deactivateAllFirstPageButtons();
      deactivateAllSecondPageButtons();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Ocultar second-page con animación
      secondPage.classList.remove('visible');
      if (backButton) backButton.style.display = 'none';
      setTimeout(() => {
        secondPage.style.display = 'none';
        firstPage.style.display = 'flex';
        void firstPage.offsetWidth;
        firstPage.classList.remove('hidden');
      }, 500); // Duración igual a la transición CSS
    }
  });
});

// Tab buttons
spTabs.forEach(button => {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      deactivateAllSecondPageButtons();
      this.classList.add('active');
    }

    // Si es el botón "Interactives", navegar de second-page a first-page con animación
    const buttonText = this.textContent.trim();
    if (buttonText === 'Interactives') {
      const secondPage = document.querySelector('.second-page');
      const firstPage = document.querySelector('.first-page');
      const backButton = document.querySelector('.back-button');
      if (secondPage && secondPage.classList.contains('visible')) {
        // Resetear todos los botones de ambas páginas
        deactivateAllFirstPageButtons();
        deactivateAllSecondPageButtons();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Ocultar second-page con animación
        secondPage.classList.remove('visible');
        if (backButton) backButton.style.display = 'none';
        setTimeout(() => {
          secondPage.style.display = 'none';
          firstPage.style.display = 'flex';
          void firstPage.offsetWidth;
          firstPage.classList.remove('hidden');
        }, 500); // Duración igual a la transición CSS
      }
    }
  });
});

// Primary buttons
spPrimaryButtons.forEach(button => {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      deactivateAllSecondPageButtons();
      this.classList.add('active');
    }
  });
});

// Secondary buttons
spSecondaryButtons.forEach(button => {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
    }

    // Scroll functionality
    const buttonText = this.textContent.trim();
    let targetId = '';
    // Card target id mapping (ids in DOM end with '-target')
    let cardTargetId = '';

    if (buttonText === '15s static video') {
      targetId = '15s';
      cardTargetId = '15s-target';
    } else if (buttonText === '59s video') {
      targetId = '59s';
      // Nota: en el DOM los ids son '60s-target' según index.html
      cardTargetId = '60s-target';
    }

    // Toggle selection of associated sp-cards without affecting others
    if (cardTargetId) {
      const cards = document.querySelectorAll(`.second-page .sp-card[id="${cardTargetId}"]`);
      if (this.classList.contains('active')) {
        cards.forEach(c => c.classList.add('selected'));
      } else {
        cards.forEach(c => c.classList.remove('selected'));
      }
    }

    if (targetId) {
      const targetElement = document.getElementById(targetId);
      const cardsContainer = document.querySelector('.sp-cards-container');

      if (targetElement && cardsContainer) {
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - 300;

        cardsContainer.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Interactives buttons
spInteractivesButtons.forEach(button => {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
    }

    // Scroll functionality
    const buttonText = this.textContent.trim();
    let targetId = '';
    // Card target id mapping (ids en DOM terminan con '-target')
    let cardTargetId = '';

    if (buttonText === '59s video templates') {
      targetId = '59s';
    } else if (buttonText === 'Video Editing') {
      targetId = 'video-editing';
      cardTargetId = 'video-editing-target';
    } else if (buttonText === 'UGC') {
      targetId = 'ugc';
      cardTargetId = 'ugc-target';
    } else if (buttonText === 'AI UGC') {
      targetId = 'ai-ugc';
      cardTargetId = 'ai-ugc-target';
    }

    // Toggle selection of associated sp-cards without affecting others
    if (cardTargetId) {
      const cards = document.querySelectorAll(`.second-page .sp-card[id="${cardTargetId}"]`);
      if (this.classList.contains('active')) {
        cards.forEach(c => c.classList.add('selected'));
      } else {
        cards.forEach(c => c.classList.remove('selected'));
      }
    }

    if (targetId) {
      const targetElement = document.getElementById(targetId);
      const cardsContainer = document.querySelector('.sp-cards-container');

      if (targetElement && cardsContainer) {
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - 300;

        cardsContainer.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Lazy loading para videos usando Intersection Observer
document.addEventListener('DOMContentLoaded', function () {
  const videos = document.querySelectorAll('video[data-src]');

  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const source = video.getAttribute('data-src');

        if (source) {
          video.src = source;
          video.load();
          video.play().catch(err => console.log('Video play error:', err));
          video.removeAttribute('data-src');
          observer.unobserve(video);
        }
      }
    });
  }, {
    rootMargin: '50px' // Cargar videos 50px antes de que sean visibles
  });

  videos.forEach(video => {
    videoObserver.observe(video);
  });
});

// Priority dropdown functionality for second-page
const spPrioritySection = document.getElementById('sp-priority-section');
const spPriorityDropdown = document.getElementById('sp-priority-dropdown');
const spPriorityText = document.getElementById('sp-priority-text');
const spMenu = document.querySelector('.sp-menu');
let isSpDropdownOpen = false;

if (spPrioritySection) {
  spPrioritySection.addEventListener('click', function () {
    isSpDropdownOpen = !isSpDropdownOpen;

    if (isSpDropdownOpen) {
      spPrioritySection.classList.add('open');
      spPriorityDropdown.classList.add('open');
      spMenu.classList.add('expanded');
    } else {
      spPrioritySection.classList.remove('open');
      spPriorityDropdown.classList.remove('open');
      spMenu.classList.remove('expanded');
    }
  });
}

// Handle priority option selection for second-page
const spPriorityOptions = document.querySelectorAll('.sp-priority-option');
spPriorityOptions.forEach(option => {
  option.addEventListener('click', function (e) {
    e.stopPropagation();

    // Remove selected class from all options
    spPriorityOptions.forEach(opt => opt.classList.remove('selected'));

    // Add selected class to clicked option
    this.classList.add('selected');

    // Update the priority text
    if (spPriorityText) {
      spPriorityText.textContent = this.textContent;
    }

    // Close dropdown
    isSpDropdownOpen = false;
    spPrioritySection.classList.remove('open');
    spPriorityDropdown.classList.remove('open');
    spMenu.classList.remove('expanded');
  });
});

// Close dropdown when clicking outside (second-page)
document.addEventListener('click', function (e) {
  if (spPrioritySection && spPriorityDropdown) {
    if (!spPrioritySection.contains(e.target) && !spPriorityDropdown.contains(e.target)) {
      if (isSpDropdownOpen) {
        isSpDropdownOpen = false;
        spPrioritySection.classList.remove('open');
        spPriorityDropdown.classList.remove('open');
        spMenu.classList.remove('expanded');
      }
    }
  }
});

// Play/Pause icon functionality
const playIcons = document.querySelectorAll('.sp-play-icon');

playIcons.forEach(playIcon => {
  playIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    const card = this.closest('.sp-card');
    const video = card.querySelector('video');
    if (video) {
      if (this.classList.contains('sp-play-icon')) {
        // Switch to pause icon
        this.classList.remove('sp-play-icon');
        this.classList.add('sp-pause-icon');
        this.src = './assets/PAUSE.svg';
        video.currentTime = 0;
        video.play();
      } else {
        // Switch to play icon
        this.classList.remove('sp-pause-icon');
        this.classList.add('sp-play-icon');
        this.src = './assets/PLAY.svg';
        video.pause();
      }
    }
  });
});


// Also handle when video ends naturally
const videos = document.querySelectorAll('video');
videos.forEach(video => {
  video.addEventListener('ended', function () {
    const card = this.closest('.sp-card');
    let icon = card.querySelector('.sp-pause-icon, .sp-play-icon');
    if (icon) {
      icon.classList.remove('sp-pause-icon');
      icon.classList.add('sp-play-icon');
      icon.src = './assets/PLAY.svg';
    }
  });
});
// Unmute/mute video on hover of .sp-gif-card (respecting mute icon state)
const gifVideos = document.querySelectorAll('.sp-gif-card');
gifVideos.forEach(vid => {
  vid.addEventListener('mouseenter', function () {
    // Only unmute on hover if the mute icon is not active
    const card = this.closest('.sp-card');
    const muteIcon = card.querySelector('.sp-mute-icon');

    if (!muteIcon) {
      // No mute icon present, or sound icon is active - allow hover unmute
      this.muted = false;
      this.volume = 1.0;
      this.play(); // force play in case browser paused it
    }
  });
  vid.addEventListener('mouseleave', function () {
    // Only mute on mouse leave if the mute icon is not active
    const card = this.closest('.sp-card');
    const muteIcon = card.querySelector('.sp-mute-icon');

    if (!muteIcon) {
      // No mute icon present, or sound icon is active - allow hover mute
      this.muted = true;
    }
  });
});

// Sound/Mute icon functionality using event delegation
document.addEventListener('click', function (e) {
  // Check if clicked element is a sound or mute icon
  if (e.target.classList.contains('sp-sound-icon') || e.target.classList.contains('sp-mute-icon')) {
    e.stopPropagation();

    const icon = e.target;
    const card = icon.closest('.sp-card');
    const video = card.querySelector('.sp-gif-card');

    if (video) {
      if (icon.classList.contains('sp-sound-icon')) {
        // Click on SOUND icon → Mute video and change to MUTE icon
        video.muted = true;
        icon.src = './assets/MUTE.svg';
        icon.classList.remove('sp-sound-icon');
        icon.classList.add('sp-mute-icon');
      } else if (icon.classList.contains('sp-mute-icon')) {
        // Click on MUTE icon → Unmute video and change to SOUND icon
        video.muted = false;
        video.volume = 1.0;
        icon.src = './assets/SOUND.svg';
        icon.classList.remove('sp-mute-icon');
        icon.classList.add('sp-sound-icon');
      }
    }
  }
});

// Handle card selection
document.addEventListener('click', function (e) {
  // Si el click es en un botón de la interactive-buttons-grid, no hacer nada (dejar que scrollLogic.js controle la selección)
  if (e.target.closest('.interactive-buttons-grid .interactive-btn')) {
    return;
  }
  // Handle .card clicks
  if (e.target.closest('.card') && !e.target.closest('.sp-card')) {
    const card = e.target.closest('.card');

    // Toggle only this card without affecting others (multi-select)
    if (card.classList.contains('selected')) {
      card.classList.remove('selected');
    } else {
      card.classList.add('selected');
    }
  }

  // Handle .sp-card clicks
  else if (e.target.closest('.sp-card')) {
    const card = e.target.closest('.sp-card');

    // Toggle only this card without affecting others (multi-select)
    if (card.classList.contains('selected')) {
      card.classList.remove('selected');
    } else {
      card.classList.add('selected');
    }
  }

  // No background click behavior: keep current selections until user toggles a card
  else if (!e.target.closest('.card') && !e.target.closest('.sp-card')) {
    // Intentionally do nothing to preserve selections
  }
});