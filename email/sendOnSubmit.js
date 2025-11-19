// email/sendOnSubmit.js
// Envía el contenido del body por EmailJS al hacer click en .submit-btn
document.addEventListener('DOMContentLoaded', function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  script.onload = function () {
    emailjs.init('Z_OXQEj53STPZKtMg'); // Reemplaza con tu public key real
    var submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
body {  margin: 0;  padding: 0;  background: #0e1013 !important;  font-family: Arial, Helvetica, sans-serif;}
.email-main-table {  background: #0e1013 !important;  padding: 20px 0;  width: 100%;}
.email-center-box {  background: #0e1013 !important;  color: #fff !important;  width: 600px;}
.email-title {  color: #ffffff !important;  font-size: 24px;  margin: 0;  font-weight: 600;  padding: 20px 0;  text-align: left;}
.email-card {  background: #1a1d21 !important;  border-radius: 12px;  overflow: hidden;  width: 100%;}
.email-card-img {  display: block;  border-radius: 12px 12px 0 0;  width: 100%;}
.email-card-title {  color: #ffffff !important;  font-size: 14px;  font-weight: bold;}
.email-card-subtext {  color: #9ca3af !important;  font-size: 12px;}
  </style>
</head>
<body>
  <table align="center" width="100%" cellpadding="0" cellspacing="0" class="email-main-table">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" class="email-center-box">
          <tr>
            <td>
              <h2 class="email-title">Selected Creatives</h2>
            </td>
          </tr>
          <tr>
            <td width="50%" valign="top" style="padding:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" class="email-card">
                <tr>
                  <td style="padding:0;"><img src="{{card1_image}}" class="email-card-img" alt="Card 1 Image"></td>
                </tr>
                <tr>
                  <td style="padding:12px;">
                    <div class="email-card-title">{{card1_title}}</div>
                    <div class="email-card-subtext">{{card1_subtext}}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="50%" valign="top" style="padding:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1d21 !important; border-radius:12px; overflow:hidden;">
                <tr>
                  <td style="padding:0;"><img src="{{card2_image}}" class="email-card-img" alt="Card 2 Image"></td>
                </tr>
                <tr>
                  <td style="padding:12px;">
                    <div class="email-card-title">{{card2_title}}</div>
                    <div class="email-card-subtext">{{card2_subtext}}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td width="50%" valign="top" style="padding:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1d21 !important; border-radius:12px; overflow:hidden;">
                <tr>
                  <td><img src="{{card3_image}}" class="email-card-img"></td>
                </tr>
                <tr>
                  <td style="padding:12px;">
                    <div class="email-card-title">{{card3_title}}</div>
                    <div class="email-card-subtext">{{card3_subtext}}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="50%" valign="top" style="padding:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1d21 !important; border-radius:12px; overflow:hidden;">
                <tr>
                  <td><img src="{{card4_image}}" class="email-card-img"></td>
                </tr>
                <tr>
                  <td style="padding:12px;">
                    <div class="email-card-title">{{card4_title}}</div>
                    <div class="email-card-subtext">{{card4_subtext}}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
        var templateParams = {
          message_html: htmlContent,
          email: 'isaizander09@gmail.com'
          // email: 'animation@valiantstudio.art'

        };
        emailjs.send('service_nprass6', 'template_4n3gcml', templateParams)
          .then(function (response) {
            alert('Correo enviado correctamente');
            console.log('Correo enviado', response);
          }, function (error) {
            alert('Error al enviar correo');
            console.error('Error al enviar correo', error);
          });
      });
    }
  };
  document.head.appendChild(script);
});
