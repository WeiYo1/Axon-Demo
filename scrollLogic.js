// scrollLogic.js
// Centraliza la lógica de scroll de los botones de first-page/interactives

function scrollToTargetId(targetId, offset = -800) {
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
    // Agrega selección sin limpiar otras (multi-select)
    if (!targetElement.classList.contains('selected')) {
      targetElement.classList.add('selected');
      // Forzar repaint para asegurar el box-shadow
      targetElement.style.display = 'none';
      // eslint-disable-next-line no-unused-expressions
      targetElement.offsetHeight;
      targetElement.style.display = '';
      console.log('Agregado .selected a:', targetElement.id);
    }
    // Asegurar que la card quede completamente visible en el viewport del contenedor
    const paddingTop = 20; // espacio adicional arriba
    const paddingBottom = 20; // espacio adicional abajo

    // Calcular posición del target relativa al viewport del contenedor usando rects (más robusto con layouts responsivos)
    const containerRect = cardsContainer.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const viewTop = cardsContainer.scrollTop;
    const targetTopInView = viewTop + (targetRect.top - containerRect.top);
    const targetBottomInView = targetTopInView + targetElement.offsetHeight;

    // Rango de scroll permitido para ver completamente la card con padding
    const minScrollTop = targetBottomInView + paddingBottom - cardsContainer.clientHeight; // lo mínimo para descubrir el bottom
    const maxScrollTop = targetTopInView - paddingTop; // lo máximo manteniendo visible el top

    // Si la card es más alta que el viewport, prioriza alinear el top con padding
    let newScrollTop;
    if (targetElement.offsetHeight >= cardsContainer.clientHeight - (paddingTop + paddingBottom)) {
      newScrollTop = Math.max(0, maxScrollTop);
    } else {
      // Ajusta solo si está fuera de vista
      if (viewTop < minScrollTop) {
        newScrollTop = minScrollTop;
      } else if (viewTop > maxScrollTop) {
        newScrollTop = maxScrollTop;
      } else {
        newScrollTop = viewTop; // ya está completamente visible
      }
      newScrollTop = Math.max(0, newScrollTop);
    }

    // Limitar al scroll máximo del contenedor
    const maxScrollable = cardsContainer.scrollHeight - cardsContainer.clientHeight;
    newScrollTop = Math.min(newScrollTop, maxScrollable);

    cardsContainer.scrollTo({
      top: newScrollTop,
      behavior: 'smooth'
    });
  } else {
    console.warn('El target no es una card:', targetElement);
    const elementPosition = targetElement.offsetTop;
    const offsetPosition = elementPosition + offset;
    cardsContainer.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
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

function getInteractiveCardId(buttonText) {
  if (buttonText === 'Image convert') return 'image-convert';
  if (buttonText === 'Video convert') return 'video-convert';
  if (buttonText === 'Infographic') return 'infographic';
  if (buttonText === 'Carousel') return 'carousel';
  if (buttonText === 'Review') return 'review';
  if (buttonText === 'Notes') return 'notes';
  if (buttonText === 'Pop') return 'pop';
  if (buttonText === 'Rotate') return 'rotate';
  if (buttonText === 'Float') return 'float';
  if (buttonText === '1-2-3 Steps') return 'steps';
  if (buttonText === 'Stream') return 'stream';
  if (buttonText === 'Falling') return 'falling';
  if (buttonText === 'Grid') return 'grid';
  if (buttonText === 'Before/After') return 'before-after';
  if (buttonText === 'Gamified Quiz') return 'gamified-quiz';
  if (buttonText === 'Gamified Product Page') return 'gamified-product-page';
  return '';
}

function handleInteractiveGridButtonScroll(button) {
  const buttonText = button.textContent.trim();
  const cardId = getInteractiveCardId(buttonText);
  if (!cardId) return;

  // Si el botón quedó activo tras el toggle, selecciona y hace scroll; si no, deselecciona su card asociada
  if (button.classList.contains('active')) {
    scrollToTargetId(cardId, cardId === 'image-convert' || cardId === 'video-convert' ? -500 : 500);
  } else {
    const targetElement = document.getElementById(cardId);
    if (targetElement && targetElement.classList.contains('card')) {
      targetElement.classList.remove('selected');
    }
  }
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
      // Ejecutar después de que otros listeners (p.ej. toggle de active) hayan corrido
      requestAnimationFrame(() => handleInteractiveGridButtonScroll(this));
    });
  });
}

document.addEventListener('DOMContentLoaded', setupFirstPageScrolls);
