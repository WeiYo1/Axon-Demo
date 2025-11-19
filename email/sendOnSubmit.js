// email/sendOnSubmit.js
// Envía el contenido del body por EmailJS al hacer click en .submit-btn
document.addEventListener('DOMContentLoaded', function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  script.onload = function () {
    emailjs.init('Z_OXQEj53STPZKtMg'); // Reemplaza con tu public key real

    // Función helper para normalizar títulos y hacer matching
    function normalizeTitle(title) {
      return title.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    // Función para obtener imagen desde el schema basado en el título
    function getImageFromSchema(title, subtitle, creativeType) {
      const normalized = normalizeTitle(title);
      const normalizedSubtitle = subtitle ? normalizeTitle(subtitle) : '';
      
      console.log('Buscando:', { title, subtitle, creativeType, normalized, normalizedSubtitle });

      if (creativeType === 'Interactives') {
        const interactives = schema.images.interactives;
        for (let key in interactives) {
          // Saltar la propiedad 'type'
          if (key === 'type' || !interactives[key].title) continue;
          
          const schemaTitle = normalizeTitle(interactives[key].title);
          console.log('Comparando con:', key, interactives[key].title, 'normalizado:', schemaTitle);
          
          if (schemaTitle === normalized) {
            console.log('✓ Match encontrado!', interactives[key]);
            return {
              image: interactives[key].image,
              title: interactives[key].title
            };
          }
        }
      } else if (creativeType === 'Video') {
        const video = schema.images.video;
        for (let category in video) {
          // Saltar la propiedad 'type'
          if (category === 'type') continue;
          
          if (typeof video[category] === 'object' && video[category] !== null) {
            for (let item in video[category]) {
              if (video[category][item].title && video[category][item].subtitle) {
                const itemNormalized = normalizeTitle(video[category][item].title);
                const itemSubNormalized = normalizeTitle(video[category][item].subtitle);
                
                console.log('Comparando video:', video[category][item].title, '+', video[category][item].subtitle);
                
                if (itemNormalized === normalized && itemSubNormalized === normalizedSubtitle) {
                  console.log('✓ Match de video encontrado!');
                  return {
                    image: video[category][item].image,
                    title: video[category][item].title,
                    subtitle: video[category][item].subtitle
                  };
                }
              }
            }
          }
        }
      }
      console.log('✗ No se encontró match');
      return null;
    }

    // Handler para ambos botones de submit
    function handleSubmit(e) {
      e.preventDefault();

      // Determinar qué página está activa comprobando la visibilidad de .second-page
      const secondPage = document.querySelector('.second-page');
      const isFirstPage = !secondPage || secondPage.style.display === 'none' || !secondPage.classList.contains('visible');
      const creativeType = isFirstPage ? 'Interactives' : 'Video';

      // Obtener cards seleccionadas
      let selectedCards = [];
      if (isFirstPage) {
        selectedCards = Array.from(document.querySelectorAll('.card.selected'));
      } else {
        selectedCards = Array.from(document.querySelectorAll('.sp-card.selected'));
      }

      // Capturar datos del formulario - buscar en ambas páginas
      let clientName, clientUrl, additionalInfo;

      if (isFirstPage) {
        clientName = document.querySelector('.landing').value || 'N/A';
        clientUrl = document.querySelector('.company').value || 'N/A';
        const textarea = document.querySelector('.description-area textarea');
        additionalInfo = textarea ? textarea.value : 'N/A';
      } else {
        const landings = document.querySelectorAll('.landing');
        clientName = landings[1] ? landings[1].value : (landings[0] ? landings[0].value : 'N/A');
        const companies = document.querySelectorAll('.company');
        clientUrl = companies[1] ? companies[1].value : (companies[0] ? companies[0].value : 'N/A');
        const textarea = document.querySelector('.sp-description-area textarea') || document.querySelector('.description-area textarea');
        additionalInfo = textarea ? textarea.value : 'N/A';
      }

      // Capturar prioridad seleccionada
      let priority = 'Not set';
      const prioritySelected = document.querySelector('.priority-option.selected') || document.querySelector('.sp-priority-option.selected');
      if (prioritySelected) {
        priority = prioritySelected.textContent.trim();
      }

      // Procesar las cards seleccionadas y obtener sus imágenes del schema
      const cardsData = selectedCards.map(card => {
        let title, subtitle;
        if (isFirstPage) {
          const titleElement = card.querySelector('.title-card');
          title = titleElement ? titleElement.textContent.trim() : '';
          subtitle = 'secondary text';
        } else {
          const titleElement = card.querySelector('.sp-title-card');
          const subtitleElement = card.querySelector('.sp-subtitle-card');
          title = titleElement ? titleElement.textContent.trim() : '';
          subtitle = subtitleElement ? subtitleElement.textContent.trim() : '';
        }
        
        console.log('Card seleccionada:', { title, subtitle });

        const imageData = getImageFromSchema(title, subtitle, creativeType);
        
        if (!imageData) {
          console.warn('No se encontró imagen para:', title, subtitle);
        }

        return {
          title: title || 'Unknown',
          subtitle: subtitle,
          image: imageData ? imageData.image : 'https://via.placeholder.com/250'
        };
      });

      // Eliminar creativos duplicados
      const uniqueCardsData = [];
      const seenCreatives = new Set();
      
      cardsData.forEach(card => {
        // Crear un identificador único basado en título + subtítulo
        const uniqueKey = `${normalizeTitle(card.title)}_${normalizeTitle(card.subtitle)}`;
        
        if (!seenCreatives.has(uniqueKey)) {
          seenCreatives.add(uniqueKey);
          uniqueCardsData.push(card);
        } else {
        }
      });
    

      
      // Validar que haya al menos un creativo seleccionado
      if (uniqueCardsData.length === 0) {
        alert('Por favor, selecciona al menos un creativo antes de enviar.');
        return;
      }
      
      console.log(`✓ Total de creativos únicos a enviar: ${uniqueCardsData.length}`);

      // Generar HTML dinámicamente para las cards seleccionadas (solo únicas)
      let cardsHtml = '';
      uniqueCardsData.forEach((cardData, index) => {
        if (index % 2 === 0 && index !== 0) {
          cardsHtml += '</tr><tr>';
        }

        cardsHtml += `
            <td width="50%" valign="top" style="padding:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" class="email-card">
                <tr>
                  <td style="padding:0;"><img src="${cardData.image}" class="email-card-img" alt="${cardData.title}"></td>
                </tr>
                <tr>
                  <td style="padding:12px;">
                    <div class="email-card-title">${cardData.title}</div>
                    <div class="email-card-subtext">${cardData.subtitle}</div>
                  </td>
                </tr>
              </table>
            </td>
          `;
      });

      // Si hay un número impar de cards, agregar una celda vacía
      if (uniqueCardsData.length % 2 !== 0) {
        cardsHtml += '<td width="50%" valign="top" style="padding:10px;"></td>';
      }

      // Template HTML del email
      var htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
body {  margin: 0;  padding: 0;  background: #0e1013 !important;  font-family: Arial, Helvetica, sans-serif;}
.email-main-table {  background: #0e1013 !important;  padding: 20px 0;  width: 100%;}
.email-center-box {  background: #0e1013 !important;  color: #fff !important;  width: 600px; max-width: 600px;}
.email-title {  color: #ffffff !important;  font-size: 28px;  margin: 0;  font-weight: 600;  padding: 30px 0 20px 0;  text-align: center;}
.email-card {  background: #1a1d21 !important;  border-radius: 12px;  overflow: hidden;  width: 100%;}
.email-card-img {  display: block;  width: 100%;  height: auto;}
.email-card-title {  color: #ffffff !important;  font-size: 16px;  font-weight: 600;  margin-bottom: 4px;}
.email-card-subtext {  color: #9ca3af !important;  font-size: 13px;}
.email-info-section {  background: #1a1d21 !important;  border-radius: 12px;  padding: 20px;  margin: 20px 0;}
.email-info-label {  color: #9ca3af !important;  font-size: 13px;  margin-bottom: 5px;}
.email-info-value {  color: #ffffff !important;  font-size: 15px;  margin-bottom: 15px;  word-break: break-word;}
.email-priority-badge {  display: inline-block;  background: #0066ff;  color: white;  padding: 8px 16px;  border-radius: 20px;  font-size: 14px;  font-weight: 600;}
  </style>
</head>
<body>
  <table align="center" width="100%" cellpadding="0" cellspacing="0" class="email-main-table">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" class="email-center-box">
          <!-- Información del cliente -->
          <tr>
            <td style="padding: 0 10px;">
              <div class="email-info-section">
                <div class="email-info-label">Creative type</div>
                <div class="email-info-value">${creativeType}</div>
                
                <div class="email-info-label">Priority</div>
                <div class="email-info-value">
                  <span class="email-priority-badge">${priority}</span>
                </div>
                
                <div class="email-info-label">Client name</div>
                <div class="email-info-value">${clientName}</div>
                
                ${clientUrl !== 'N/A' ? `
                <div class="email-info-label">Client URL</div>
                <div class="email-info-value"><a href="${clientUrl}" style="color: #0066ff; text-decoration: none;">${clientUrl}</a></div>
                ` : ''}
                
                ${additionalInfo !== 'N/A' ? `
                <div class="email-info-label">Additional request information</div>
                <div class="email-info-value" style="font-size: 14px; line-height: 1.5;">${additionalInfo}</div>
                ` : ''}
              </div>
            </td>
          </tr>
          
          <!-- Título -->
          <tr>
            <td>
              <h2 class="email-title">Selected Creatives</h2>
            </td>
          </tr>
          
          <!-- Cards seleccionadas -->
          <tr>
            ${cardsHtml}
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      var templateParams = {
        message_html: htmlContent,
        // email: 'isaizander09@gmail.com'
        email: 'animation@valiantstudio.art'
      };

      emailjs.send('service_nprass6', 'template_4n3gcml', templateParams)
        .then(function (response) {
          alert('Correo enviado correctamente');
          console.log('Correo enviado', response);
        }, function (error) {
          alert('Error al enviar correo');
          console.error('Error al enviar correo', error);
        });
    }

    // Agregar event listener a ambos botones de submit
    var submitBtn = document.querySelector('.submit-btn');
    var spSubmitBtn = document.querySelector('.sp-submit-btn');

    if (submitBtn) {
      submitBtn.addEventListener('click', handleSubmit);
    }

    if (spSubmitBtn) {
      spSubmitBtn.addEventListener('click', handleSubmit);
    }
  };
  document.head.appendChild(script);


  const schema = {
    "images": {
      "interactives": {
        "type": "Interactives",
        "imageConvert": {
          "title": "Image convert",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516168/image1_qzjzdl.webp"
        },
        "videoConvert": {
          "title": "Video convert",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516182/image10_jnrl74.webp"
        },
        "infographic": {
          "title": "Infographic",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516191/image15_cmnkqb.webp"
        },
        "carousel": {
          "title": "Carousel",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516183/image11_qjtjmt.webp"
        },
        "review": {
          "title": "Review",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516174/image6_mrhw1t.webp"
        },
        "notes": {
          "title": "Notes",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516176/image7_xot5rj.webp"
        },
        "pop": {
          "title": "Pop",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516168/image3_u1tyik.webp"
        },
        "rotate": {
          "title": "Rotate",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516169/image4_s7lzwn.webp"
        },
        "float": {
          "title": "Float",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516190/image14_iwki9k.webp"
        },
        "123Steps": {
          "title": "1-2-3 Steps",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516168/image2_bihrkf.webp"
        },
        "stream": {
          "title": "Stream",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516183/image12_tn5wiv.webp"
        },
        "falling": {
          "title": "Falling",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516190/image13_snagtl.webp"
        },
        "beforeAfter": {
          "title": "Before After",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516170/image5_bbtg9c.webp"
        },
        "grid": {
          "title": "Grid",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516177/image8_lpj8yq.webp"
        },
        "gamifiedQuiz": {
          "title": "Gamified Quiz",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516182/image9_pojky7.webp"
        },
        "gamidiedProductPage": {
          "title": "Gamified Product Page",
          "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516196/image16_jfs7jm.webp"
        }
      },
      "video": {
        "type": "Video",
        "15staticVideo": {
          "staticVideo": {
            "title": "Static Video",
            "subtitle": "no animation, no music",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516156/15s-video-01_sogyss.webp"
          },
          "staticVideo2": {
            "title": "Static Video",
            "subtitle": "no animation, with music",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516156/15s-video-02_tagohs.webp"
          },
          "staticVideo3": {
            "title": "Static Video",
            "subtitle": "with animation, no music",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516157/15s-video-03_umvz5b.webp"
          },
          "staticVideo4": {
            "title": "Static Video",
            "subtitle": "with animation, and music",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516157/15s-video-04_mee883.webp"
          }
        },
        "60sVideo": {
          "imageMashup": {
            "title": "Image mash up",
            "subtitle": "multi-statics + subtle animation + music + texts animations + logo",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516158/59s-video-01_xj0ieo.webp"
          },
          "videoAndImage": {
            "title": "Video and Image",
            "subtitle": "mash up of top videos + statics + cool transitions + music",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516159/59s-video-02_ujsztd.webp"
          },
          "product": {
            "title": "Product",
            "subtitle": "multi-statics + music + logo",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516160/ai-ugc-02-new_f1qw89.webp"
          }
        },
        "videoEditing": {
          "addingSubtitles": {
            "title": "Adding Subtitles",
            "subtitle": "captions",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763522587/vid-edit-01_qeotoj.webp"
          },
          "adding": {
            "title": "Adding",
            "subtitle": "disclaimer",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763522593/vid-edit-02_kl7eqp.webp"
          }
        },
        "ugc": {
          "product": {
            "title": "Product",
            "subtitle": "review",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763522575/ugc-01_ktmiwz.webp"
          },
          "product2": {
            "title": "Product",
            "subtitle": "try on",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763522578/ugc-02_qpa75z.webp"
          }
        },
        "AIugc": {
          "ai": {
            "title": "AI",
            "subtitle": "Intro",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516160/ai-ugc-01_trzjwi.webp"
          },
          "product": {
            "title": "Product",
            "subtitle": "review",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516163/ai-ugc-03_ialzzm.webp"
          },
          "product2": {
            "title": "Product",
            "subtitle": "showcasing",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516163/ai-ugc-04_c5xse7.webp"
          },
          "street": {
            "title": "Street",
            "subtitle": "interview",
            "image": "https://res.cloudinary.com/diknoci6h/image/upload/v1763516165/ai-ugc-05_hrbg1k.webp"
          }
        }
      }
    }
  }

});
