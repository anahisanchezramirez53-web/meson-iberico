const express = require('express');
const cron = require('node-cron');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Credenciales de Twilio desde variables de entorno
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;

// Inicializar cliente de Twilio
const client = twilio(accountSid, authToken);

// Equipo de MESÓN IBÉRICO
const equipoCocineros = [
  { nombre: 'Rubén Chaparro', rol: 'Chef', numero: '+52322XXXXXXXX' },
  { nombre: 'Juan', rol: 'Parrilla - Sartenes', numero: '+52322XXXXXXXX' },
  { nombre: 'Guillermo', rol: 'Parrilla - Sartenes', numero: '+52322XXXXXXXX' },
  { nombre: 'Melanie', rol: 'Paellas - Fritos', numero: '+52322XXXXXXXX' },
  { nombre: 'Yuri', rol: 'Zona Fría', numero: '+52322XXXXXXXX' },
  { nombre: 'Brayan', rol: 'Zona Fría', numero: '+52322XXXXXXXX' },
  { nombre: 'Miguel', rol: 'Zona Versátil', numero: '+52322XXXXXXXX' }
];

// Función para obtener el horario del día
function obtenerHorarioDelDia() {
  const hoy = new Date();
  const diaSemana = hoy.toLocaleDateString('es-ES', { weekday: 'long' });
  const fecha = hoy.toLocaleDateString('es-ES');
  
  const horario = `
🍳 *HORARIO DE HOY - ${fecha.toUpperCase()}*

*Zona: Parrilla - Sartenes*
⏰ 11:00 - 16:00: Juan
⏰ 16:00 - 22:00: Guillermo

*Zona: Paellas - Fritos*
⏰ 11:00 - 16:00: Melanie
⏰ 16:00 - 22:00: [Verificar cobertura]

*Zona: Fría*
⏰ 11:00 - 16:00: Yuri
⏰ 16:00 - 22:00: Brayan

*Zona: Versátil*
⏰ 11:00 - 22:00: Miguel

📌 *Chef:* Rubén Chaparro

¡Que sea un excelente servicio! 🔥
  `;
  
  return horario;
}

// Función para enviar mensajes vía WhatsApp
async function enviarHorarios() {
  const horario = obtenerHorarioDelDia();
  
  console.log(`\n📱 Enviando horarios a las ${new Date().toLocaleTimeString('es-ES')}`);
  
  // Enviar al grupo (si tienes un número de grupo)
  // O enviar a números individuales
  const numerosParaEnviar = [
    'whatsapp:+52322XXXXXXXX' // Reemplaza con números reales
  ];
  
  for (const numero of numerosParaEnviar) {
    try {
      const mensaje = await client.messages.create({
        body: horario,
        from: twilioNumber,
        to: numero
      });
      console.log(`✅ Mensaje enviado a ${numero}: ${mensaje.sid}`);
    } catch (error) {
      console.error(`❌ Error enviando a ${numero}:`, error.message);
    }
  }
}

// Programar envío automático a las 11:00 AM (América/México_City)
// Cron: "0 11 * * *" = Todos los días a las 11:00 AM
cron.schedule('0 11 * * *', () => {
  console.log('⏰ Ejecutando tarea programada de horarios...');
  enviarHorarios();
}, {
  timezone: 'America/Mexico_City'
});

// Endpoint para probar manualmente
app.post('/enviar-horarios', async (req, res) => {
  try {
    await enviarHorarios();
    res.json({ 
      success: true, 
      message: 'Horarios enviados exitosamente',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Endpoint de salud (Health check)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'MESÓN IBÉRICO - Horarios Automáticos',
    timestamp: new Date().toISOString(),
    cron: '0 11 * * * (11:00 AM - America/Mexico_City)'
  });
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({
    nombre: 'MESÓN IBÉRICO - Sistema de Horarios Automáticos',
    version: '1.0.0',
    estado: 'Activo',
    descripcion: 'Envía horarios automáticos a cocineros vía WhatsApp cada día a las 11 AM',
    endpoints: {
      salud: 'GET /health',
      enviarManual: 'POST /enviar-horarios'
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   MESÓN IBÉRICO - Sistema Activo 🍳   ║
╚════════════════════════════════════════╝

🌐 Servidor ejecutándose en puerto ${PORT}
📍 URL: http://localhost:${PORT}
⏰ Horario de envío: 11:00 AM (America/Mexico_City)
🤖 Estado: Escuchando cambios en el repositorio...

Endpoints disponibles:
  • GET  /              → Info del sistema
  • GET  /health        → Estado del servicio
  • POST /enviar-horarios → Enviar manualmente

Variables de entorno requeridas:
  ✓ TWILIO_ACCOUNT_SID
  ✓ TWILIO_AUTH_TOKEN
  ✓ TWILIO_WHATSAPP_NUMBER

  `);
  
  // Mostrar horario del día en consola
  const horario = obtenerHorarioDelDia();
  console.log('Horario de hoy:');
  console.log(horario);
});

module.exports = app;
