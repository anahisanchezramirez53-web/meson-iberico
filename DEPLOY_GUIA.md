🚀 GUÍA: DEPLOY EN RAILWAY - MESÓN IBÉRICO

ESTADO ACTUAL ✅

Ya has completado:
✅ Crear package.json
✅ Crear server.js
✅ Crear .env.example
✅ Variables de entorno en Railway
✅ Conectar repositorio a Railway

¡Tu sistema está a punto de hacer DEPLOY automático!

---

¿QUÉ PASARÁ AHORA? 🚀

Cuando hayas subido estos 3 archivos a GitHub:

1. Railway detectará automáticamente que es un proyecto Node.js
2. Instalará las dependencias (twilio, node-cron, express, dotenv)
3. Ejecutará npm start que corre node server.js
4. Tu sistema estará VIVO en internet 24/7
5. A las 11:00 AM (America/Mexico_City) enviará horarios automáticamente

---

URLs IMPORTANTES 🔗

Tu repositorio: https://github.com/anahisanchezramirez53-web/meson-iberico
Railway Dashboard: https://railway.app
Twilio Console: https://console.twilio.com

---

CREDENCIALES CONFIGURADAS ✅

Ya están en Railway (no necesitas hacer nada más):

TWILIO_ACCOUNT_SID = AC54a889949dadb92edf159117b4f2f9a
TWILIO_AUTH_TOKEN = dba135f09c54263b9d6143a323928fb3
TWILIO_WHATSAPP_NUMBER = whatsapp:+14155238886

---

ENDPOINTS DISPONIBLES 📡

Una vez que Railway hace deploy, tu sistema tendrá estos endpoints:

GET /                 → Info del sistema
GET /health          → Estado del servicio
POST /enviar-horarios → Enviar horarios manualmente

Ejemplo:
https://tu-url-de-railway.app/health

---

PRÓXIMOS PASOS 🎯

1. Verificar Deploy en Railway
- Ve a https://railway.app
- Abre tu proyecto "practical-manifestation"
- Ve a "Deployments"
- Deberías ver un deployment "Building" o "Active"

2. Cuando esté LIVE
- Verás una URL como: https://meson-iberico-production.up.railway.app
- Abre esa URL en tu navegador
- Deberías ver el JSON con info del sistema

3. Para probar manualmente
POST https://tu-url/enviar-horarios

---

ACTUALIZAR NÚMEROS REALES 📱

En server.js, busca "equipoCocineros" y actualiza los números:

Reemplaza todos los +52322XXXXXXXX con números reales de WhatsApp de tu equipo.

También busca "numerosParaEnviar" y actualiza con el número del grupo o admin.

---

RESUMEN FINAL

Tarea                          | Status
Crear package.json             | ✅ HECHO
Crear server.js                | ✅ HECHO
Crear .env.example             | ✅ HECHO
Crear DEPLOY_GUIA.md           | ⏳ PRÓXIMO
Variables en Railway           | ✅ HECHO
Conectar GitHub                | ✅ HECHO
Deploy automático              | ⏳ EN PROGRESO (2-3 min)
Sistema VIVO                   | ⏳ PRONTO

---

🔥 ¡¡¡FELICIDADES!!!

Ya hiciste que tu sistema:
- Esté en GitHub (código versionado)
- Esté conectado a Railway (deploy automático)
- Tenga credenciales de Twilio (WhatsApp integrado)
- Se ejecute 24/7 en la nube

A las 11:00 AM tu sistema enviará automáticamente horarios a cocineros vía WhatsApp cada día. 🚀

---

SOPORTE 💬

Si algo falla:
1. Revisa los logs en Railway → Deployments
2. Verifica que las variables estén en Railway → Variables
3. Asegúrate de que package.json, server.js y .env.example estén en GitHub

---

Creado con ❤️ para MESÓN IBÉRICO
Sistema de Horarios Automáticos con Twilio WhatsApp
