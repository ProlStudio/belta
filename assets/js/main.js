/* ==========================================================================
   BELTA — Production Interface Scripts
   Vanilla JS. No external dependencies.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     Mobile navigation toggle
     ------------------------------------------------------------------------ */
  var navToggle = document.getElementById('nav-toggle');
  var primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
      );
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (primaryNav.classList.contains('is-open')) {
          primaryNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
          document.body.style.overflow = '';
        }
      });
    });

    // Close mobile nav on escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Sticky header shadow on scroll
     ------------------------------------------------------------------------ */
  var siteHeader = document.getElementById('site-header');

  if (siteHeader) {
    var updateHeaderState = function () {
      if (window.scrollY > 8) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  /* ------------------------------------------------------------------------
     FAQ accordion
     ------------------------------------------------------------------------ */
  var faqQuestions = document.querySelectorAll('.faq-item__question');

  faqQuestions.forEach(function (button) {
    var answer = button.nextElementSibling;
    if (!answer) { return; }

    button.addEventListener('click', function () {
      var isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other items for a clean single-open accordion
      faqQuestions.forEach(function (otherButton) {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          var otherAnswer = otherButton.nextElementSibling;
          if (otherAnswer) { otherAnswer.style.maxHeight = null; }
        }
      });

      button.setAttribute('aria-expanded', String(!isExpanded));
      answer.style.maxHeight = isExpanded ? null : answer.scrollHeight + 'px';
    });
  });

  /* ------------------------------------------------------------------------
     Dynamic footer year
     ------------------------------------------------------------------------ */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------------
     Contact form → Google Sheets + WhatsApp redirect

     GOOGLE_SHEETS_ENDPOINT: URL del Google Apps Script Web App que recibe
     el lead y lo agrega como fila nueva en la planilla. Ver
     /google-apps-script/Code.gs para el script desplegado y las
     instrucciones de instalación.

     Apunta hoy a la planilla PLACEHOLDER de PROL ("Clientes Belta -
     Formularios enviados") mientras Belta define su planilla definitiva.
     Cuando la compartan, repetir el deploy de Code.gs ahí y reemplazar
     esta URL por la nueva.
     ------------------------------------------------------------------------ */
  var contactForm = document.getElementById('contact-form');
  var WHATSAPP_NUMBER = '5493513426418';
  var GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw5mV6QqOj4kgAl91f7uDmNyDdwQ6_uhzI3ymxhb932maGxbK-N-4KJwbLZvfGOk95f/exec';

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = (contactForm.elements['name'].value || '').trim();
      var business = (contactForm.elements['business'].value || '').trim();
      var service = (contactForm.elements['service'].value || '').trim();
      var industry = (contactForm.elements['industry'].value || '').trim();
      var city = (contactForm.elements['city'].value || '').trim();
      var message = (contactForm.elements['message'].value || '').trim();

      if (!name || !business || !service || !industry || !city) {
        contactForm.reportValidity();
        return;
      }

      // 1) Registrar el lead en Google Sheets (fire-and-forget, no bloquea
      //    el redirect a WhatsApp aunque la planilla no esté conectada aún).
      if (GOOGLE_SHEETS_ENDPOINT) {
        try {
          fetch(GOOGLE_SHEETS_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,
              business: business,
              service: service,
              industry: industry,
              city: city,
              message: message,
              date: new Date().toISOString()
            })
          });
        } catch (err) {
          // Silencioso: si falla el envío a la planilla, el lead igual
          // llega por WhatsApp.
        }
      }

      // 2) Redirigir a WhatsApp con el mensaje ya armado.
      var lines = [
        'Hola Belta, soy ' + name + ' de ' + business + '.',
        'Me interesa el servicio de: ' + service + '.',
        'Rubro: ' + industry + ' — Zona: ' + city + '.'
      ];

      if (message) {
        lines.push('Cuéntame más: ' + message);
      }

      var text = encodeURIComponent(lines.join('\n'));
      var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;

      window.open(whatsappUrl, '_blank', 'noopener');
    });
  }
})();
