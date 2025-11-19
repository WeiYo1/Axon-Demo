// email/sendEmail.js
// Envía el HTML de email/email.html como cuerpo del correo usando EmailJS
(function(){
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  script.onload = function() {
    emailjs.init('service_bo4i6eh');
    // Leer el HTML del body
    var htmlContent = document.body.innerHTML;
    var templateParams = {
      to_email: 'isaizander09@gmail.com',
      message_html: htmlContent
    };
    emailjs.send('service_bo4i6eh', 'default_template', templateParams)
      .then(function(response) {
        console.log('Correo enviado', response);
      }, function(error) {
        console.error('Error al enviar correo', error);
      });
  };
  document.head.appendChild(script);
})();
