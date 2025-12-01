// Get button groups for FIRST PAGE only
const creativeOptions = document.querySelectorAll('.first-page .creative-option');
const tabs = document.querySelectorAll('.first-page .tab, .first-page .tab-2');
const primaryButtons = document.querySelectorAll('.first-page .btn-primary');
const secondaryButtons = document.querySelectorAll('.first-page .btn-secondary');
const interactivesButton = document.querySelector('.first-page .interactives');
const interactiveButtons = document.querySelectorAll('.first-page .interactive-btn');

// --- Helpers to sync first-page cards <-> menu buttons ---
function getFirstPageButtonTextsForCard(cardId) {
  switch (cardId) {
    case 'image-convert': return ['Image convert'];
    case 'video-convert': return ['Video convert'];
    case 'infographic': return ['Infographic'];
    case 'carousel': return ['Carousel'];
    case 'review': return ['Review'];
    case 'notes': return ['Notes'];
    case 'pop': return ['Pop'];
    case 'rotate': return ['Rotate'];
    case 'float': return ['Float'];
    case 'steps': return ['1-2-3 Steps'];
    case 'stream': return ['Stream'];
    case 'falling': return ['Falling'];
    case 'before-after': return ['Before/After'];
    case 'grid': return ['Grid'];
    case 'gamified-quiz': return ['Gamified Quiz'];
    case 'gamified-product-page': return ['Gamified Product Page'];
    default: return [];
  }
}

function getFirstPageCardIdForButtonText(buttonText) {
  switch (buttonText) {
    case 'Image convert': return 'image-convert';
    case 'Video convert': return 'video-convert';
    case 'Infographic': return 'infographic';
    case 'Carousel': return 'carousel';
    case 'Review': return 'review';
    case 'Notes': return 'notes';
    case 'Pop': return 'pop';
    case 'Rotate': return 'rotate';
    case 'Float': return 'float';
    case '1-2-3 Steps': return 'steps';
    case 'Stream': return 'stream';
    case 'Falling': return 'falling';
    case 'Before/After': return 'before-after';
    case 'Grid': return 'grid';
    case 'Gamified Quiz': return 'gamified-quiz';
    case 'Gamified Product Page': return 'gamified-product-page';
    default: return '';
  }
}

function syncFirstPageMenuWithCard(cardId, isSelected) {
  const texts = getFirstPageButtonTextsForCard(cardId);
  if (texts.length === 0) return;
  const allMenuButtons = document.querySelectorAll('.first-page .interactive-buttons-grid .interactive-btn');
  allMenuButtons.forEach(btn => {
    const txt = btn.textContent.trim();
    if (texts.includes(txt)) {
      if (isSelected) btn.classList.add('active'); else btn.classList.remove('active');
    }
  });
}

function syncFirstPageCardWithMenu(buttonText, isActive) {
  const cardId = getFirstPageCardIdForButtonText(buttonText);
  if (!cardId) return;
  const card = document.getElementById(cardId);
  if (!card) return;
  if (isActive) card.classList.add('selected'); else card.classList.remove('selected');
}

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

// Tab buttons (FIRST PAGE)
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

        // Asegurar que el tab de Video esté activo en second-page
        const spVideoTab = document.querySelector('.second-page .sp-tab:not(.an-ucg):not(.an-aiucg)');
        if (spVideoTab) spVideoTab.classList.add('active');

        // Mostrar contenido de Video
        const videoContent = document.querySelector('.second-page .sp-interactives-container:not(.ugc-content):not(.ai-ugc-content)');
        const ugcContent = document.querySelector('.second-page .ugc-content');
        const aiUgcContent = document.querySelector('.second-page .ai-ugc-content');
        if (videoContent) videoContent.style.display = 'flex';
        if (ugcContent) ugcContent.style.display = 'none';
        if (aiUgcContent) aiUgcContent.style.display = 'none';

        // 显示所有 Video 相关内容，隐藏 UGC 和 AI UGC
        const allSections = document.querySelectorAll('.sp-current-templete, .sp-current-templete-2');
        allSections.forEach(section => {
          const sectionId = section.id;
          if (sectionId === 'ugc' || sectionId === 'ai-ugc') {
            // 隐藏 UGC 和 AI UGC
            section.style.display = 'none';
            const nextBr = section.nextElementSibling;
            if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
            const containerCards = nextBr ? nextBr.nextElementSibling : null;
            if (containerCards && containerCards.classList.contains('sp-container-cards')) {
              containerCards.style.display = 'none';
            }
          } else {
            // 显示所有 Video 区域
            section.style.display = 'flex';
            // 如果标题在 sp-container-cards 外部（如 59s、video-editing）
            const nextBr = section.nextElementSibling;
            if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
            const containerCards = nextBr ? nextBr.nextElementSibling : null;
            if (containerCards && containerCards.classList.contains('sp-container-cards')) {
              containerCards.style.display = 'flex';
            }
            // 如果标题在 sp-container-cards 内部（如 15s）
            const parentContainer = section.closest('.sp-container-cards');
            if (parentContainer) {
              parentContainer.style.display = 'flex';
            }
          }
        });
      }
    } else if (buttonText === 'UGC') {
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
        firstPage.style.display = 'none';
        secondPage.style.display = 'block';
        void secondPage.offsetWidth;
        secondPage.classList.add('visible');
        if (backButton) {
          backButton.style.display = 'flex';
        }

        // Asegurar que el tab de UGC esté activo en second-page
        const spUgcTab = document.querySelector('.second-page .sp-tab.an-ucg');
        if (spUgcTab) spUgcTab.classList.add('active');

        // Mostrar contenido de UGC
        const videoContent = document.querySelector('.second-page .sp-interactives-container:not(.ugc-content):not(.ai-ugc-content)');
        const ugcContent = document.querySelector('.second-page .ugc-content');
        const aiUgcContent = document.querySelector('.second-page .ai-ugc-content');
        if (videoContent) videoContent.style.display = 'none';
        if (ugcContent) ugcContent.style.display = 'flex';
        if (aiUgcContent) aiUgcContent.style.display = 'none';

        // 隐藏所有其他内容区域，只显示 UGC
        const allSections = document.querySelectorAll('.sp-current-templete, .sp-current-templete-2');
        allSections.forEach(section => {
          const sectionId = section.id;
          if (sectionId === 'ugc') {
            // 显示 UGC 标题和内容
            section.style.display = 'flex';
            const nextBr = section.nextElementSibling;
            if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
            const containerCards = nextBr ? nextBr.nextElementSibling : null;
            if (containerCards && containerCards.classList.contains('sp-container-cards')) {
              containerCards.style.display = 'flex';
            }
          } else {
            // 隐藏其他所有区域
            section.style.display = 'none';
            // 如果标题在 sp-container-cards 外部（如 59s、video-editing）
            const nextBr = section.nextElementSibling;
            if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
            const containerCards = nextBr ? nextBr.nextElementSibling : null;
            if (containerCards && containerCards.classList.contains('sp-container-cards')) {
              containerCards.style.display = 'none';
            }
            // 如果标题在 sp-container-cards 内部（如 15s）
            const parentContainer = section.closest('.sp-container-cards');
            if (parentContainer) {
              parentContainer.style.display = 'none';
            }
          }
        });

        // 滚动到 UGC 内容区域
        setTimeout(() => {
          const targetElement = document.getElementById('ugc');
          const cardsContainer = document.querySelector('.sp-cards-container');
          if (targetElement && cardsContainer) {
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - 300;
            cardsContainer.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 600); // 等待页面切换动画完成
      }
    } else if (buttonText === 'AI UGC') {
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
        firstPage.style.display = 'none';
        secondPage.style.display = 'block';
        void secondPage.offsetWidth;
        secondPage.classList.add('visible');
        if (backButton) {
          backButton.style.display = 'flex';
        }

        // Asegurar que el tab de AI UGC esté activo en second-page
        const spAiUgcTab = document.querySelector('.second-page .sp-tab.an-aiucg');
        if (spAiUgcTab) spAiUgcTab.classList.add('active');

        // Mostrar contenido de AI UGC
        const videoContent = document.querySelector('.second-page .sp-interactives-container:not(.ugc-content):not(.ai-ugc-content)');
        const ugcContent = document.querySelector('.second-page .ugc-content');
        const aiUgcContent = document.querySelector('.second-page .ai-ugc-content');
        if (videoContent) videoContent.style.display = 'none';
        if (ugcContent) ugcContent.style.display = 'none';
        if (aiUgcContent) aiUgcContent.style.display = 'flex';

        // 隐藏所有其他内容区域，只显示 AI UGC
        const allSections = document.querySelectorAll('.sp-current-templete, .sp-current-templete-2');
        allSections.forEach(section => {
          const sectionId = section.id;
          if (sectionId === 'ai-ugc') {
            // 显示 AI UGC 标题和内容
            section.style.display = 'flex';
            const nextBr = section.nextElementSibling;
            if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
            const containerCards = nextBr ? nextBr.nextElementSibling : null;
            if (containerCards && containerCards.classList.contains('sp-container-cards')) {
              containerCards.style.display = 'flex';
            }
          } else {
            // 隐藏其他所有区域
            section.style.display = 'none';
            // 如果标题在 sp-container-cards 外部（如 59s、video-editing）
            const nextBr = section.nextElementSibling;
            if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
            const containerCards = nextBr ? nextBr.nextElementSibling : null;
            if (containerCards && containerCards.classList.contains('sp-container-cards')) {
              containerCards.style.display = 'none';
            }
            // 如果标题在 sp-container-cards 内部（如 15s）
            const parentContainer = section.closest('.sp-container-cards');
            if (parentContainer) {
              parentContainer.style.display = 'none';
            }
          }
        });

        // 滚动到 AI UGC 内容区域
        setTimeout(() => {
          const targetElement = document.getElementById('ai-ugc');
          const cardsContainer = document.querySelector('.sp-cards-container');
          if (targetElement && cardsContainer) {
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - 300;
            cardsContainer.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 600); // 等待页面切换动画完成
      }
    } else if (buttonText === 'Interactives') {
      // En first-page, Interactives debe permanecer activo siempre
      const fpInteractivesTab = document.querySelector('.first-page .tab-2');
      const fpVideoTab = document.querySelector('.first-page .tab');
      if (fpVideoTab) fpVideoTab.classList.remove('active');
      if (fpInteractivesTab) fpInteractivesTab.classList.add('active');
      // No navegación (ya estamos en first-page)
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

    // Sync associated card selection with this button state
    const buttonText = this.textContent.trim();
    const isActive = this.classList.contains('active');
    syncFirstPageCardWithMenu(buttonText, isActive);
  });
});

// Priority dropdown functionality
const prioritySection = document.getElementById('priority-section');
const priorityDropdown = document.getElementById('priority-dropdown');
const priorityText = document.getElementById('priority-text');
const menu = document.querySelector('.menu');
const landingInput = document.querySelector('.first-page .landing');
const companyInput = document.querySelector('.first-page .company');
const descriptionIcons = document.querySelectorAll('.first-page .description-icons');
const companyInput2 = document.querySelector('.first-page .company-2');
let isDropdownOpen = false;

prioritySection.addEventListener('click', function () {
  isDropdownOpen = !isDropdownOpen;

  if (isDropdownOpen) {
    prioritySection.classList.add('open');
    priorityDropdown.classList.add('open');
    menu.classList.add('expanded');
    // Hide landing and company inputs when dropdown opens
    if (landingInput) landingInput.style.display = 'none';
    if (companyInput) companyInput.style.display = 'none';
    if (companyInput2) companyInput2.style.display = 'none';
    descriptionIcons.forEach(icon => {
      icon.style.display = 'none';
  });
  } else {
    prioritySection.classList.remove('open');
    priorityDropdown.classList.remove('open');
    menu.classList.remove('expanded');
    // Show landing and company inputs when dropdown closes
    if (landingInput) landingInput.style.display = 'flex';
    if (companyInput) companyInput.style.display = 'flex';
    if (companyInput2) companyInput2.style.display = 'flex';
    descriptionIcons.forEach(icon => {
      icon.style.display = 'flex';
  });
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
    // Show landing and company inputs when dropdown closes
    if (landingInput) landingInput.style.display = 'flex';
    if (companyInput) companyInput.style.display = 'flex';
    descriptionIcons.forEach(icon => {
      icon.style.display = 'flex';
  });
    if (companyInput2) companyInput2.style.display = 'flex';
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
      // Show landing and company inputs when dropdown closes
      if (landingInput) landingInput.style.display = 'flex';
      if (companyInput) companyInput.style.display = 'flex';
      descriptionIcons.forEach(icon => {
        icon.style.display = 'flex';
    });
      if (companyInput2) companyInput2.style.display = 'flex';
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

setTimeout(() => {
  menuToggleCLick()
  spMenuToggleClick()
}, 10);
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

        // Asegurar que el tab de Interactives esté activo en first-page
        const fpInteractivesTab = document.querySelector('.first-page .tab-2');
        if (fpInteractivesTab) fpInteractivesTab.classList.add('active');
      }, 500); // Duración igual a la transición CSS
    }
  });
});

// Tab buttons (SECOND PAGE)
spTabs.forEach(button => {
  button.addEventListener('click', function () {
    const buttonText = this.textContent.trim();
    // const menuToggle = document.getElementById('menu-toggle');
    // const spMenuToggle = document.getElementById('sp-menu-toggle');
    // console.log('menuToggle', menuToggle)
    // menuToggle.click()
    // spMenuToggle.click()
    // 获取所有内容容器
    const videoContent = document.querySelector('.second-page .sp-interactives-container:not(.ugc-content):not(.ai-ugc-content)');
    const ugcContent = document.querySelector('.second-page .ugc-content');
    const aiUgcContent = document.querySelector('.second-page .ai-ugc-content');

    // 取消所有卡片的选中状态
    const allCards = document.querySelectorAll('.second-page .sp-card');
    allCards.forEach(card => card.classList.remove('selected'));

    if (buttonText === 'Video') {
      // En second-page, Video debe permanecer activo siempre
      const spVideoTab = document.querySelector('.second-page .sp-tab:not(.an-ucg):not(.an-aiucg)');
      const spInterTab = document.querySelector('.second-page .sp-tab-2');
      const spUgcTab = document.querySelector('.second-page .sp-tab.an-ucg');
      const spAiUgcTab = document.querySelector('.second-page .sp-tab.an-aiucg');
      if (spInterTab) spInterTab.classList.remove('active');
      if (spUgcTab) spUgcTab.classList.remove('active');
      if (spAiUgcTab) spAiUgcTab.classList.remove('active');
      if (spVideoTab) spVideoTab.classList.add('active');

      // 显示 Video 内容，隐藏其他
      if (videoContent) videoContent.style.display = 'flex';
      if (ugcContent) ugcContent.style.display = 'none';
      if (aiUgcContent) aiUgcContent.style.display = 'none';

      // 显示所有 Video 相关内容，隐藏 UGC 和 AI UGC
      const allSections = document.querySelectorAll('.sp-current-templete, .sp-current-templete-2');
      console.log('sp-current-templete')
      allSections.forEach(section => {
        const sectionId = section.id;
        if (sectionId === 'ugc' || sectionId === 'ai-ugc') {
          // 隐藏 UGC 和 AI UGC
          section.style.display = 'none';
          const nextBr = section.nextElementSibling;
          if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
          const containerCards = nextBr ? nextBr.nextElementSibling : null;
          if (containerCards && containerCards.classList.contains('sp-container-cards')) {
            containerCards.style.display = 'none';
          }
        } else {
          // 显示所有 Video 区域
          section.style.display = 'flex';
          // 如果标题在 sp-container-cards 外部（如 59s、video-editing）
          const nextBr = section.nextElementSibling;
          if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
          const containerCards = nextBr ? nextBr.nextElementSibling : null;
          if (containerCards && containerCards.classList.contains('sp-container-cards')) {
            containerCards.style.display = 'flex';
          }
          // 如果标题在 sp-container-cards 内部（如 15s）
          const parentContainer = section.closest('.sp-container-cards');
          if (parentContainer) {
            parentContainer.style.display = 'flex';
          }
        }
      });
      return; // sin navegación
    }

    if (buttonText === 'UGC') {
      // En second-page, UGC debe permanecer activo siempre
      const spVideoTab = document.querySelector('.second-page .sp-tab:not(.an-ucg):not(.an-aiucg)');
      const spInterTab = document.querySelector('.second-page .sp-tab-2');
      const spUgcTab = document.querySelector('.second-page .sp-tab.an-ucg');
      const spAiUgcTab = document.querySelector('.second-page .sp-tab.an-aiucg');
      if (spVideoTab) spVideoTab.classList.remove('active');
      if (spInterTab) spInterTab.classList.remove('active');
      if (spAiUgcTab) spAiUgcTab.classList.remove('active');
      if (spUgcTab) spUgcTab.classList.add('active');

      // 显示 UGC 内容，隐藏其他
      if (videoContent) videoContent.style.display = 'none';
      if (ugcContent) ugcContent.style.display = 'flex';
      if (aiUgcContent) aiUgcContent.style.display = 'none';

      // 隐藏所有其他内容区域，只显示 UGC
      const allSections = document.querySelectorAll('.sp-current-templete, .sp-current-templete-2');
      allSections.forEach(section => {
        const sectionId = section.id;
        if (sectionId === 'ugc') {
          // 显示 UGC 标题和内容
          section.style.display = 'flex';
          const nextBr = section.nextElementSibling;
          if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
          const containerCards = nextBr ? nextBr.nextElementSibling : null;
          if (containerCards && containerCards.classList.contains('sp-container-cards')) {
            containerCards.style.display = 'flex';
          }
        } else {
          // 隐藏其他所有区域
          section.style.display = 'none';
          // 如果标题在 sp-container-cards 外部（如 59s、video-editing）
          const nextBr = section.nextElementSibling;
          if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
          const containerCards = nextBr ? nextBr.nextElementSibling : null;
          if (containerCards && containerCards.classList.contains('sp-container-cards')) {
            containerCards.style.display = 'none';
          }
          // 如果标题在 sp-container-cards 内部（如 15s）
          const parentContainer = section.closest('.sp-container-cards');
          if (parentContainer) {
            parentContainer.style.display = 'none';
          }
        }
      });

      // 滚动到 UGC 内容区域
      setTimeout(() => {
        const targetElement = document.getElementById('ugc');
        const cardsContainer = document.querySelector('.sp-cards-container');
        if (targetElement && cardsContainer) {
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - 300;
          cardsContainer.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return; // sin navegación
    }

    if (buttonText === 'AI UGC') {
      // En second-page, AI UGC debe permanecer activo siempre
      const spVideoTab = document.querySelector('.second-page .sp-tab:not(.an-ucg):not(.an-aiucg)');
      const spInterTab = document.querySelector('.second-page .sp-tab-2');
      const spUgcTab = document.querySelector('.second-page .sp-tab.an-ucg');
      const spAiUgcTab = document.querySelector('.second-page .sp-tab.an-aiucg');
      if (spVideoTab) spVideoTab.classList.remove('active');
      if (spInterTab) spInterTab.classList.remove('active');
      if (spUgcTab) spUgcTab.classList.remove('active');
      if (spAiUgcTab) spAiUgcTab.classList.add('active');

      // 显示 AI UGC 内容，隐藏其他
      if (videoContent) videoContent.style.display = 'none';
      if (ugcContent) ugcContent.style.display = 'none';
      if (aiUgcContent) aiUgcContent.style.display = 'flex';

      // 隐藏所有其他内容区域，只显示 AI UGC
      const allSections = document.querySelectorAll('.sp-current-templete, .sp-current-templete-2');
      allSections.forEach(section => {
        const sectionId = section.id;
        if (sectionId === 'ai-ugc') {
          // 显示 AI UGC 标题和内容
          section.style.display = 'flex';
          const nextBr = section.nextElementSibling;
          if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
          const containerCards = nextBr ? nextBr.nextElementSibling : null;
          if (containerCards && containerCards.classList.contains('sp-container-cards')) {
            containerCards.style.display = 'flex';
          }
        } else {
          // 隐藏其他所有区域
          section.style.display = 'none';
          // 如果标题在 sp-container-cards 外部（如 59s、video-editing）
          const nextBr = section.nextElementSibling;
          if (nextBr && nextBr.tagName === 'BR') nextBr.style.display = 'none';
          const containerCards = nextBr ? nextBr.nextElementSibling : null;
          if (containerCards && containerCards.classList.contains('sp-container-cards')) {
            containerCards.style.display = 'none';
          }
          // 如果标题在 sp-container-cards 内部（如 15s）
          const parentContainer = section.closest('.sp-container-cards');
          if (parentContainer) {
            parentContainer.style.display = 'none';
          }
        }
      });

      // 滚动到 AI UGC 内容区域
      setTimeout(() => {
        const targetElement = document.getElementById('ai-ugc');
        const cardsContainer = document.querySelector('.sp-cards-container');
        if (targetElement && cardsContainer) {
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - 300;
          cardsContainer.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return; // sin navegación
    }

    // Si es el botón "Interactives", navegar de second-page a first-page con animación
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

          // Asegurar que el tab de Interactives esté activo en first-page
          const fpInteractivesTab = document.querySelector('.first-page .tab-2');
          if (fpInteractivesTab) fpInteractivesTab.classList.add('active');
        }, 500); // Duración igual a la transición CSS
        return; // sin navegación
      } else {
        // Si no está en second-page visible, solo activar el botón
        const spVideoTab = document.querySelector('.second-page .sp-tab:not(.an-ucg):not(.an-aiucg)');
        const spInterTab = document.querySelector('.second-page .sp-tab-2');
        const spUgcTab = document.querySelector('.second-page .sp-tab.an-ucg');
        const spAiUgcTab = document.querySelector('.second-page .sp-tab.an-aiucg');
        if (spVideoTab) spVideoTab.classList.remove('active');
        if (spUgcTab) spUgcTab.classList.remove('active');
        if (spAiUgcTab) spAiUgcTab.classList.remove('active');
        if (spInterTab) spInterTab.classList.add('active');

        // 隐藏所有内容模块
        if (videoContent) videoContent.style.display = 'none';
        if (ugcContent) ugcContent.style.display = 'none';
        if (aiUgcContent) aiUgcContent.style.display = 'none';
        return; // sin navegación
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
      deactivateAllSecondPageButtons();
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
    } else if (buttonText === '59s video' || buttonText === '60s video') {
      // El anchor de sección en el DOM sigue siendo '59s'
      targetId = '59s';
      cardTargetId = '60s-target';
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
      deactivateAllSecondPageButtons();
      this.classList.add('active');
    }

    // Scroll functionality
    const buttonText = this.textContent.trim();
    let targetId = '';
    // Card target id mapping (ids en DOM terminan con '-target')
    let cardTargetId = '';

    // 获取内容模块
    const videoContent = document.querySelector('.second-page .sp-interactives-container:not(.ugc-content):not(.ai-ugc-content)');
    const ugcContent = document.querySelector('.second-page .ugc-content');
    const aiUgcContent = document.querySelector('.second-page .ai-ugc-content');

    if (buttonText === '59s video templates') {
      targetId = '59s';
    } else if (buttonText === 'Video Editing') {
      targetId = 'video-editing';
      cardTargetId = 'video-editing-target';
      // 显示 Video 内容
      if (videoContent) videoContent.style.display = 'flex';
      if (ugcContent) ugcContent.style.display = 'none';
      if (aiUgcContent) aiUgcContent.style.display = 'none';
      // 激活 Video tab
      const spVideoTab = document.querySelector('.second-page .sp-tab:not(.an-ucg):not(.an-aiucg)');
      const spInterTab = document.querySelector('.second-page .sp-tab-2');
      const spUgcTab = document.querySelector('.second-page .sp-tab.an-ucg');
      const spAiUgcTab = document.querySelector('.second-page .sp-tab.an-aiucg');
      if (spInterTab) spInterTab.classList.remove('active');
      if (spUgcTab) spUgcTab.classList.remove('active');
      if (spAiUgcTab) spAiUgcTab.classList.remove('active');
      if (spVideoTab) spVideoTab.classList.add('active');
    } else if (buttonText === 'UGC') {
      targetId = 'ugc';
      cardTargetId = 'ugc-target';
      // 显示 UGC 内容
      if (videoContent) videoContent.style.display = 'none';
      if (ugcContent) ugcContent.style.display = 'flex';
      if (aiUgcContent) aiUgcContent.style.display = 'none';
      // 激活 UGC tab
      const spVideoTab = document.querySelector('.second-page .sp-tab:not(.an-ucg):not(.an-aiucg)');
      const spInterTab = document.querySelector('.second-page .sp-tab-2');
      const spUgcTab = document.querySelector('.second-page .sp-tab.an-ucg');
      const spAiUgcTab = document.querySelector('.second-page .sp-tab.an-aiucg');
      if (spVideoTab) spVideoTab.classList.remove('active');
      if (spInterTab) spInterTab.classList.remove('active');
      if (spAiUgcTab) spAiUgcTab.classList.remove('active');
      if (spUgcTab) spUgcTab.classList.add('active');
    } else if (buttonText === 'AI UGC') {
      targetId = 'ai-ugc';
      cardTargetId = 'ai-ugc-target';
      // 显示 AI UGC 内容
      if (videoContent) videoContent.style.display = 'none';
      if (ugcContent) ugcContent.style.display = 'none';
      if (aiUgcContent) aiUgcContent.style.display = 'flex';
      // 激活 AI UGC tab
      const spVideoTab = document.querySelector('.second-page .sp-tab:not(.an-ucg):not(.an-aiucg)');
      const spInterTab = document.querySelector('.second-page .sp-tab-2');
      const spUgcTab = document.querySelector('.second-page .sp-tab.an-ucg');
      const spAiUgcTab = document.querySelector('.second-page .sp-tab.an-aiucg');
      if (spVideoTab) spVideoTab.classList.remove('active');
      if (spInterTab) spInterTab.classList.remove('active');
      if (spUgcTab) spUgcTab.classList.remove('active');
      if (spAiUgcTab) spAiUgcTab.classList.add('active');
    }

    // Do not toggle selection of cards from interactives menu buttons; only scroll

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
  // 初始化 second-page 的内容模块显示状态
  const videoContent = document.querySelector('.second-page .sp-interactives-container:not(.ugc-content):not(.ai-ugc-content)');
  const ugcContent = document.querySelector('.second-page .ugc-content');
  const aiUgcContent = document.querySelector('.second-page .ai-ugc-content');

  // 默认显示 Video 内容，隐藏其他
  if (videoContent) videoContent.style.display = 'flex';
  if (ugcContent) ugcContent.style.display = 'none';
  if (aiUgcContent) aiUgcContent.style.display = 'none';

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
const spLandingInput = document.querySelector('.second-page .landing');
const spCompanyInput = document.querySelector('.second-page .company');
const descriptionIcons2 = document.querySelectorAll('.second-page .description-icons');
const spCompanyInput2 = document.querySelector('.second-page .company-2');
let isSpDropdownOpen = false;

if (spPrioritySection) {
  spPrioritySection.addEventListener('click', function () {
    isSpDropdownOpen = !isSpDropdownOpen;

    if (isSpDropdownOpen) {
      spPrioritySection.classList.add('open');
      spPriorityDropdown.classList.add('open');
      spMenu.classList.add('expanded');
      // Hide landing and company inputs when dropdown opens
      if (spLandingInput) spLandingInput.style.display = 'none';
      if (spCompanyInput) spCompanyInput.style.display = 'none';
      if (spCompanyInput2) spCompanyInput2.style.display = 'none';
      descriptionIcons2.forEach(icon => {
        icon.style.display = 'none';
    });
    } else {
      spPrioritySection.classList.remove('open');
      spPriorityDropdown.classList.remove('open');
      spMenu.classList.remove('expanded');
      // Show landing and company inputs when dropdown closes
      if (spLandingInput) spLandingInput.style.display = 'flex';
      if (spCompanyInput) spCompanyInput.style.display = 'flex';
      if (spCompanyInput2) spCompanyInput2.style.display = 'flex';
      descriptionIcons2.forEach(icon => {
        icon.style.display = 'flex';
    });
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
    // Show landing and company inputs when dropdown closes
    if (spLandingInput) spLandingInput.style.display = 'flex';
    if (spCompanyInput) spCompanyInput.style.display = 'flex';
    if (spCompanyInput2) spCompanyInput2.style.display = 'flex';
    descriptionIcons2.forEach(icon => {
      icon.style.display = 'flex';
  });
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
        // Show landing and company inputs when dropdown closes
        if (spLandingInput) spLandingInput.style.display = 'flex';
        if (spCompanyInput) spCompanyInput.style.display = 'flex';
        if (spCompanyInput2) spCompanyInput2.style.display = 'flex';
        descriptionIcons2.forEach(icon => {
          icon.style.display = 'flex';
      });
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
    const wasSelected = card.classList.contains('selected');
    if (wasSelected) card.classList.remove('selected'); else card.classList.add('selected');

    // Sync associated menu button(s) with this card state
    const nowSelected = !wasSelected;
    const cardId = card.id;
    syncFirstPageMenuWithCard(cardId, nowSelected);
  }

  // Handle .sp-card clicks
  else if (e.target.closest('.sp-card')) {
    const card = e.target.closest('.sp-card');

    // Toggle only this card without affecting others (multi-select)
    const wasSelected = card.classList.contains('selected');
    if (wasSelected) {
      card.classList.remove('selected');
    } else {
      card.classList.add('selected');
    }

    const cardId = card.id;
    let candidateTexts = [];
    if (cardId === '15s-target') {
      candidateTexts = ['15s static video'];
    } else if (cardId === '60s-target') {
      candidateTexts = ['59s video', '60s video'];
    } else if (cardId === 'video-editing-target') {
      candidateTexts = ['Video Editing'];
    } else if (cardId === 'ugc-target') {
      candidateTexts = ['UGC'];
    } else if (cardId === 'ai-ugc-target') {
      candidateTexts = ['AI UGC'];
    }

    // Sync buttons with selection state in this section.
    if (candidateTexts.length > 0) {
      const anySelectedInSection = document.querySelectorAll(`.second-page .sp-card[id="${cardId}"].selected`).length > 0;
      const allMenuButtons = document.querySelectorAll('.second-page .sp-btn-secondary, .second-page .sp-59s-video-button, .second-page .sp-interactives');
      for (const btn of allMenuButtons) {
        const txt = btn.textContent.trim();
        if (candidateTexts.includes(txt)) {
          if (anySelectedInSection) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        }
      }
    }
  }

  // No background click behavior: keep current selections until user toggles a card
  else if (!e.target.closest('.card') && !e.target.closest('.sp-card')) {
    // Intentionally do nothing to preserve selections
  }
});

// ==================== Menu Toggle Functionality ====================

// First-page menu toggle
const menuToggle = document.getElementById('menu-toggle');
const firstPageMenu = document.querySelector('.first-page .menu');
const menuHiddenContents = document.querySelectorAll('.first-page .menu-content-hidden');
const linkButton = document.querySelector('.first-page .link-button');
const associatedFiles = document.querySelector('.first-page .associated-files');
const submitBtn = document.querySelector('.first-page .submit-btn');

if (menuToggle) {
  function menuToggleCLick(e) {
    e?.stopPropagation();

    // Toggle the expanded class on the button and menu
    menuToggle.classList.toggle('expanded');
    if (firstPageMenu) {
      firstPageMenu.classList.toggle('menu-expanded');
    }

    // Check if we're opening or closing
    const isOpening = !menuHiddenContents[0].classList.contains('show');

    if (isOpening) {
      // Opening: Show content first, then fade in bottom elements after 1s
      menuHiddenContents.forEach(content => {
        content.classList.add('show');
      });

      // Add fade-in class immediately (the delay is in CSS)
      setTimeout(() => {
        if (linkButton) linkButton.classList.add('fade-in');
        if (associatedFiles) associatedFiles.classList.add('fade-in');
        if (submitBtn) submitBtn.classList.add('fade-in');
      }, 0);
    } else {
      // Closing: Fade out bottom elements first (0.5s), then hide content 0.5s later
      if (linkButton) linkButton.classList.remove('fade-in');
      if (associatedFiles) associatedFiles.classList.remove('fade-in');
      if (submitBtn) submitBtn.classList.remove('fade-in');

      // Wait 0.5s for the 3 elements to fade out completely, then hide the rest of content
      setTimeout(() => {
        menuHiddenContents.forEach(content => {
          content.classList.remove('show');
        });
      }, 10);
    }
  }
  menuToggle.addEventListener('click', (e) => menuToggleCLick(e));
}

// Second-page menu toggle
const spMenuToggle = document.getElementById('sp-menu-toggle');
const secondPageMenu = document.querySelector('.second-page .sp-menu');
const spMenuHiddenContents = document.querySelectorAll('.second-page .sp-menu-content-hidden');
const spLinkButton = document.querySelector('.second-page .sp-link-button');
const spAssociatedFiles = document.querySelector('.second-page .sp-associated-files');
const spSubmitBtn = document.querySelector('.second-page .sp-submit-btn');

if (spMenuToggle) {
  function spMenuToggleClick(e) {
    e?.stopPropagation();

    // Toggle the expanded class on the button and menu
    spMenuToggle.classList.toggle('expanded');
    if (secondPageMenu) {
      secondPageMenu.classList.toggle('menu-expanded');
    }

    // Check if we're opening or closing
    const isOpening = !spMenuHiddenContents[0].classList.contains('show');

    if (isOpening) {
      // Opening: Show content first, then fade in bottom elements after 1s
      spMenuHiddenContents.forEach(content => {
        content.classList.add('show');
      });

      // Add fade-in class immediately (the delay is in CSS)
      setTimeout(() => {
        if (spLinkButton) spLinkButton.classList.add('fade-in');
        if (spAssociatedFiles) spAssociatedFiles.classList.add('fade-in');
        if (spSubmitBtn) spSubmitBtn.classList.add('fade-in');
      }, 0);
    } else {
      // Closing: Fade out bottom elements first (0.5s), then hide content 0.5s later
      if (spLinkButton) spLinkButton.classList.remove('fade-in');
      if (spAssociatedFiles) spAssociatedFiles.classList.remove('fade-in');
      if (spSubmitBtn) spSubmitBtn.classList.remove('fade-in');

      // Wait 0.5s for the 3 elements to fade out completely, then hide the rest of content
      setTimeout(() => {
        spMenuHiddenContents.forEach(content => {
          content.classList.remove('show');
        });
      }, 10);
    }
  }
  spMenuToggle.addEventListener('click', (e) => spMenuToggleClick(e));
}

// 第一页提交按钮验证
const firstPageSubmitBtn = document.querySelector('.first-page .submit-btn');
if (firstPageSubmitBtn) {
  firstPageSubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const landingInput = document.querySelector('.first-page .landing');
    const companyInput = document.querySelector('.first-page .company');

    const landingValue = landingInput ? landingInput.value.trim() : '';
    const companyValue = companyInput ? companyInput.value.trim() : '';

    if (!landingValue) {
      alert('Please fill in the Company\'s name field.');
      if (landingInput) landingInput.focus();
      return;
    }

    if (!companyValue) {
      alert('Please fill in the link field.');
      if (companyInput) companyInput.focus();
      return;
    }

    // If validation passes, you can submit the form or perform other actions
    console.log('Form submitted successfully');
    // Add your submit logic here
  });
}

// Second-page submit button validation
const secondPageSubmitBtn = document.querySelector('.second-page .sp-submit-btn');
if (secondPageSubmitBtn) {
  secondPageSubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const landingInput = document.querySelector('.second-page .landing');
    const companyInput = document.querySelector('.second-page .company');

    const landingValue = landingInput ? landingInput.value.trim() : '';
    const companyValue = companyInput ? companyInput.value.trim() : '';

    if (!landingValue) {
      alert('Please fill in the Company\'s name field.');
      if (landingInput) landingInput.focus();
      return;
    }

    if (!companyValue) {
      alert('Please fill in the link field.');
      if (companyInput) companyInput.focus();
      return;
    }

    // If validation passes, you can submit the form or perform other actions
    console.log('Form submitted successfully');
    // Add your submit logic here
  });
}