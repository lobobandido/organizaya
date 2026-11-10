# OrganizaYa (by DreamWolf)
App web para organizar eventos sociales en Veracruz: presupuesto, invitados por WhatsApp, cronograma, proveedores con semáforo antifraude y plan B.
Los datos del usuario se guardan en su navegador (localStorage).

## Probar en tu computadora (Windows)
1. Instala Node.js LTS desde nodejs.org.
2. Descomprime el zip, abre una terminal dentro de la carpeta y ejecuta:
       npm install
       npm run dev
3. Abre la dirección que aparece (normalmente http://localhost:5173).

## Publicar en Vercel
1. Crea un repositorio en GitHub (github.com > New) y sube el contenido de esta carpeta (botón "uploading an existing file", sin la carpeta node_modules).
2. En vercel.com entra con tu cuenta de GitHub > Add New > Project > elige el repo > Deploy. Vercel detecta Vite solo; no cambies nada.
3. Al terminar te da una liga pública (algo.vercel.app). Esa es la que pones en tu bio de TikTok, Instagram y YouTube.

## Medir interés
- **Visitas:** en tu proyecto de Vercel abre la pestaña Analytics y pulsa Enable. Después de redesplegar verás visitantes, países y de dónde llegan.
- **Eventos** (`waitlist`, `tab`, `guest_added`, `whatsapp_invite`): los eventos personalizados pueden requerir plan Pro. Si no lo tienes, las visitas y la lista de espera bastan.
- **Lista de espera:** crea una cuenta en formspree.io > New Form, copia la URL (https://formspree.io/f/xxxx) y en Vercel ve a Settings > Environment Variables, crea `VITE_WAITLIST_URL` con esa URL y haz Redeploy. Los contactos te llegan al correo y se ven en Formspree.
- **Saber qué red trae más gente:** usa una liga distinta por red, por ejemplo `tuapp.vercel.app/?utm_source=tiktok`, `?utm_source=instagram` y `?utm_source=youtube`. Analytics las separa en Referrers.

## Pendiente
Logo y colores oficiales, validar precios marcados E con cotizaciones reales, y guardar en la nube con Supabase.
