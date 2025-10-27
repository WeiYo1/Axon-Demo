// scrollLogic.js
// Centraliza la lógica de scroll de los botones de first-page/interactives

function scrollToTargetId(targetId, offset = -300) {
  const targetElement = document.getElementById(targetId);
  const cardsContainer = document.querySelector('.cards-container');
  if (!targetElement) {
    console.warn('No se encontró el elemento con id:', targetId);
    return;
  }
  if (!cardsContainer) {
    console.warn('No se encontró .cards-container');
    return;
  }
  // Solo agrega 'selected' si el target es una card
  if (targetElement.classList.contains('card')) {
    // Solo cambia la selección si el target no está ya seleccionado
    if (!targetElement.classList.contains('selected')) {
      document.querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
      targetElement.classList.add('selected');
      // Forzar repaint para asegurar el box-shadow
      targetElement.style.display = 'none';
      // eslint-disable-next-line no-unused-expressions
      targetElement.offsetHeight;
      targetElement.style.display = '';
      console.log('Agregado .selected a:', targetElement.id);
    }
  } else {
    console.warn('El target no es una card:', targetElement);
  }
  const elementPosition = targetElement.offsetTop;
  const offsetPosition = elementPosition + offset;
  cardsContainer.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

function handleSecondaryButtonScroll(button) {
  const buttonText = button.textContent.trim();
  let targetId = '';
  if (buttonText === 'Image/Video convert to HTML') {
    targetId = 'convert-to-html';
  }
  if (targetId) scrollToTargetId(targetId);
}

function handleInteractivesButtonScroll(button) {
  const buttonText = button.textContent.trim();
  let targetId = '';
  if (buttonText === 'Interactives') {
    targetId = 'interactives';
  }
  if (targetId) scrollToTargetId(targetId);
}

function handleInteractiveGridButtonScroll(button) {
  const buttonText = button.textContent.trim();
  let cardId = '';
  if (buttonText === 'Image convert') cardId = 'image-convert';
  else if (buttonText === 'Video convert') cardId = 'video-convert';
  else if (buttonText === 'Infographics') cardId = 'infographic';
  else if (buttonText === 'Carousel') cardId = 'carousel';
  else if (buttonText === 'Review') cardId = 'review';
  else if (buttonText === 'Notes') cardId = 'notes';
  else if (buttonText === 'Pop') cardId = 'pop';
  else if (buttonText === 'Rotate') cardId = 'rotate';
  else if (buttonText === 'Float') cardId = 'float';
  else if (buttonText === '1-2-3 Steps') cardId = 'steps';
  else if (buttonText === 'Stream') cardId = 'stream';
  else if (buttonText === 'Falling') cardId = 'falling';
  else if (buttonText === 'Grid') cardId = 'grid';
  else if (buttonText === 'Before/After') cardId = 'before-after';
  else if (buttonText === 'Gamified Quiz') cardId = 'gamified-quiz';
  else if (buttonText === 'Gamified Product Page') cardId = 'gamified-product-page';
  if (cardId) scrollToTargetId(cardId, cardId === 'image-convert' || cardId === 'video-convert' ? -500 : 500);
}

function setupFirstPageScrolls() {
  // Secondary buttons
  document.querySelectorAll('.first-page .btn-secondary').forEach(button => {
    button.addEventListener('click', function () {
      handleSecondaryButtonScroll(this);
    });
  });
  // Interactives button
  const interactivesButton = document.querySelector('.first-page .interactives');
  if (interactivesButton) {
    interactivesButton.addEventListener('click', function () {
      handleInteractivesButtonScroll(this);
    });
  }
  // Interactive grid buttons
  document.querySelectorAll('.first-page .interactive-btn').forEach(button => {
    button.addEventListener('click', function () {
      handleInteractiveGridButtonScroll(this);
    });
  });
}

document.addEventListener('DOMContentLoaded', setupFirstPageScrolls);
