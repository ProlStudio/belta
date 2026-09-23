/**
 * BELTA — Recepción de leads del formulario de contacto en Google Sheets
 * ------------------------------------------------------------------------
 * Qué hace:
 *   1. Recibe el POST que manda assets/js/main.js (fetch en modo no-cors)
 *      cada vez que alguien envía el formulario de contacto del sitio.
 *   2. Agrega una fila nueva a la hoja "Leads" con los datos del formulario.
 *   3. (Opcional) Dispara una alerta por WhatsApp al equipo de Belta.
 *
 * INSTALACIÓN (una sola vez):
 *   0. Planilla placeholder ya creada por PROL mientras Belta define la
 *      definitiva: "Clientes Belta - Formularios enviados"
 *      https://docs.google.com/spreadsheets/d/1gQ450gzZFKb8a8qV_c832e3sA9zQ3LIjeuBkDI3wIbM/edit
 *      No hace falta crear una hoja "Leads" a mano — el script la crea
 *      solo la primera vez que corre (ver doPost/setupSheet más abajo).
 *      Cuando el cliente pase su planilla definitiva, se repite este
 *      mismo proceso ahí y se actualiza la URL en main.js (paso 6).
 *   1. Abrir la planilla de destino (la de arriba, o la definitiva del
 *      cliente cuando llegue).
 *   2. En la planilla: Extensiones → Apps Script.
 *   3. Borrar el contenido de Code.gs que aparece por defecto y pegar
 *      todo este archivo.
 *   4. Ejecutar una vez la función setupSheet() manualmente (▶ arriba,
 *      elegir "setupSheet") para que cree los encabezados. Va a pedir
 *      autorización — es normal, es la planilla pidiéndose permiso a
 *      sí misma.
 *   5. Implementar → Nueva implementación → tipo "Aplicación web".
 *        - Ejecutar como: Yo
 *        - Quién tiene acceso: Cualquier usuario
 *      Copiar la URL que da ("Web app URL").
 *   6. Pegar esa URL en assets/js/main.js, en la constante
 *      GOOGLE_SHEETS_ENDPOINT (buscar el comentario "TODO" en ese archivo).
 *   7. Volver a publicar el sitio. Listo — cada envío del formulario
 *      va a aparecer como fila nueva en "Leads".
 *
 * Nota: como el fetch del sitio usa mode:'no-cors', esta función nunca
 * devuelve una respuesta legible al navegador — es normal y no afecta
 * el guardado del lead. Por eso el formulario redirige a WhatsApp de
 * todas formas, sin esperar confirmación de la planilla.
 */

var SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      writeHeaders(sheet);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.business || '',
      data.service || '',
      data.industry || '',
      data.city || '',
      data.message || ''
    ]);

    // Alerta por WhatsApp — OPCIONAL, desactivada por defecto.
    // Belta no nos pasó un proveedor de WhatsApp API todavía (por ejemplo
    // CallMeBot, Twilio o la API oficial de Meta). Cuando elijan uno,
    // descomentar la línea de abajo y completar sendWhatsappAlert().
    // sendWhatsappAlert(data);

    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function writeHeaders(sheet) {
  sheet.appendRow([
    'Fecha',
    'Nombre y apellido',
    'Empresa',
    'Servicio de interés',
    'Rubro / industria',
    'Ciudad o zona',
    'Mensaje'
  ]);
  sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    writeHeaders(sheet);
  }
}

/**
 * Plantilla para la alerta por WhatsApp — a completar cuando Belta elija
 * un proveedor. Ejemplo con CallMeBot (gratuito para un solo número,
 * requiere activar el bot una vez desde el celular de destino):
 *
 * function sendWhatsappAlert(data) {
 *   var phone = '5493513426418'; // número que recibe la alerta
 *   var apiKey = 'PEGAR_API_KEY_DE_CALLMEBOT';
 *   var text = encodeURIComponent(
 *     'Nuevo lead: ' + data.name + ' (' + data.business + ') — ' +
 *     data.service + ' — ' + data.industry + ' — ' + data.city
 *   );
 *   var url = 'https://api.callmebot.com/whatsapp.php?phone=' + phone +
 *     '&text=' + text + '&apikey=' + apiKey;
 *   UrlFetchApp.fetch(url);
 * }
 */
