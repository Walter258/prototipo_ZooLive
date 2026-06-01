/* ============================================================
   ZooLive — Huellitas Solidarias
   Archivo: script.js
   ============================================================ */

/* ── URL que codifica el QR ─────────────────────────────────────
   Cambia esta URL cuando tengas el dominio real de ZooLive.     */
const QR_URL = 'https://zoolive.pe/perfil?user=gabriela&card=ZL-2026-001';

/* ── Navegación entre páginas ───────────────────────────────── */
function showPage(id) {
  // Ocultar todas las páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Quitar clase activa de todos los tabs
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Mostrar la página seleccionada
  const page = document.getElementById('page-' + id);
  const tab  = document.getElementById('tab-' + id);
  if (page) page.classList.add('active');
  if (tab)  tab.classList.add('active');

  // Scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Selección de monto de donación ─────────────────────────── */
function selDon(btn) {
  document.querySelectorAll('.don-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── Generar código QR ──────────────────────────────────────── */
function generarQRs() {
  // QR pequeño dentro de la tarjeta física
  new QRCode(document.getElementById('qr-tarjeta'), {
    text: QR_URL,
    width: 58,
    height: 58,
    colorDark:  '#085041',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });

  // QR grande para mostrar y descargar
  new QRCode(document.getElementById('qr-grande'), {
    text: QR_URL,
    width: 160,
    height: 160,
    colorDark:  '#085041',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}

/* ── Descargar QR como imagen PNG ───────────────────────────── */
function descargarQR() {
  const canvas = document.querySelector('#qr-grande canvas');
  if (!canvas) {
    alert('El QR aún no está listo, espera un momento.');
    return;
  }
  const link = document.createElement('a');
  link.download = 'QR_ZooLive_Huellitas.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/* ── Inicialización al cargar la página ─────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  generarQRs();
});