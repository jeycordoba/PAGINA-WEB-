import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, resource, name, email, phone, service, message, website, lang = 'es' } = req.body;
  const turnstileResponse = req.body['cf-turnstile-response'];

  // Honeypot trap check
  if (website) {
    console.warn('Bot detected by honeypot.');
    return res.status(200).json({ success: true, message: 'Processed successfully.' });
  }

  // Cloudflare Turnstile Verification
  if (!turnstileResponse) {
    return res.status(403).json({ error: 'Security verification missing.' });
  }

  try {
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const verification = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileResponse}`
    });

    const outcome = await verification.json();
    if (!outcome.success) {
      console.error('Turnstile verification failed:', outcome['error-codes']);
      return res.status(403).json({ error: 'Security verification failed.' });
    }
  } catch (err) {
    console.error('Turnstile Error:', err);
    // We proceed if the service itself is down to avoid blocking users, 
    // but in a strict environment you might want to block.
  }

  // Basic validation
  if (!name || !email || (type === 'contact' && !phone)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const isSpanish = lang === 'es';

  try {
    // CASE 1: EBOOK REQUEST
    if (type === 'ebook') {
      if (!resource) return res.status(400).json({ error: 'Resource ID required' });

      const ebooks = {
        'ebook1': { title: isSpanish ? 'Volver a Ti' : 'Return to You', file: 'E-BOOK VOLVER A TI.pdf', subject: isSpanish ? 'Tu Recurso: Volver a Ti' : 'Your Resource: Return to You' },
        'ebook2': { title: isSpanish ? 'Respiración Cuántica' : 'Quantum Breath', file: 'campoUnificadoEbook.pdf', subject: isSpanish ? 'Tu Recurso: Respiración Cuántica' : 'Your Resource: Quantum Breath' },
        'ebook3': { title: isSpanish ? 'Arquitectura de la Paz' : 'Peace Architecture', file: 'campoUnificadoEbook.pdf', subject: isSpanish ? 'Tu Recurso: Arquitectura de la Paz' : 'Your Resource: Peace Architecture' },
        'ebook4': { title: isSpanish ? 'Más allá del Mat' : 'Beyond the Mat', file: 'campoUnificadoEbook.pdf', subject: isSpanish ? 'Tu Recurso: Más allá del Mat' : 'Your Resource: Beyond the Mat' }
      };

      const selectedEbook = ebooks[resource] || ebooks['ebook1'];
      const { data, error } = await resend.emails.send({
        from: 'Jeniffer Córdoba <hola@jeniffercordoba.com>',
        to: [email],
        bcc: ['ivan+jc@voizlab.com'], // Ivan as BCC for monitoring during handover
        subject: selectedEbook.subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ede1c9; color: #322F20; border-radius: 40px;">
            <h1 style="font-style: italic; font-weight: normal; font-size: 32px; color: #955031; text-align: center;">${isSpanish ? 'Hola' : 'Hello'}, ${name}</h1>
            <p style="font-size: 18px; line-height: 1.6; text-align: center; font-style: italic;">
              ${isSpanish ? '"La quietud no es la ausencia de movimiento, sino el equilibrio perfecto en medio de él."' : '"Stillness is not the absence of movement, but the perfect balance in the midst of it."'}
            </p>
            <div style="background-color: white; padding: 30px; border-radius: 30px; margin-top: 30px; text-align: center; border: 1px solid rgba(80, 76, 51, 0.1);">
              <p style="margin-bottom: 20px;">${isSpanish ? 'Gracias por resonar con mi espacio. Aquí tienes el recurso que solicitaste:' : 'Thank you for resonating with my space. Here is the resource you requested:'}</p>
              <h2 style="color: #504c33; margin-bottom: 30px;">${selectedEbook.title}</h2>
              <a href="https://${req.headers.host}/${selectedEbook.file}" 
                 style="background-color: #955031; color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; letter-spacing: 2px; text-transform: uppercase;">
                 ${isSpanish ? 'Descargar eBook' : 'Download eBook'}
              </a>
            </div>
          </div>
        `,
      });
  
      // INTERNAL NOTIFICATION (To Jeniffer/Ivan) for Ebook Success
      await resend.emails.send({
        from: 'Website Portal <hola@jeniffercordoba.com>',
        to: ['jeniffercordoba@yahoo.com'],
        bcc: ['ivan+jc@voizlab.com'],
        subject: `Ebook Download: ${name} - ${selectedEbook.title}`,
        html: `
          <div style="font-family: sans-serif; background-color: #f7f7f7; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
              <div style="background-color: #955031; color: white; padding: 30px; text-align: center;">
                <h2 style="margin: 0; font-weight: 300; letter-spacing: 2px;">RECURSO DESCARGADO</h2>
              </div>
              <div style="padding: 40px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Lead</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 18px; color: #322F20; border-bottom: 1px solid #eee;"><strong>${name}</strong></td></tr>
                  
                  <tr><td style="padding: 20px 0 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Email</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 16px; color: #322F20; border-bottom: 1px solid #eee;">${email}</td></tr>
                  
                  <tr><td style="padding: 20px 0 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Recurso</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 16px; color: #955031; border-bottom: 1px solid #eee;"><strong>${selectedEbook.title}</strong></td></tr>
                </table>
                <div style="margin-top: 30px; font-size: 10px; color: #ccc;">Enviado desde el Lead Magnet (Idioma: ${lang.toUpperCase()})</div>
              </div>
            </div>
          </div>
        `
      });

      if (error) return res.status(400).json(error);
      return res.status(200).json(data);
    }

    // CASE 2: CONTACT FORM
    if (type === 'contact') {
      // 1. Internal Notification (to Jeniffer/Ivan) - Styled Ficha de Cliente
      await resend.emails.send({
        from: 'Website Portal <hola@jeniffercordoba.com>',
        to: ['jeniffercordoba@yahoo.com'], // Sent directly to Jeniffer's Yahoo now
        bcc: ['ivan+jc@voizlab.com'], // Ivan as BCC for monitoring during handover
        subject: `New Lead: ${name} (${service})`,
        html: `
          <div style="font-family: sans-serif; background-color: #f7f7f7; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
              <div style="background-color: #504c33; color: white; padding: 30px; text-align: center;">
                <h2 style="margin: 0; font-weight: 300; letter-spacing: 2px;">NUEVO PROSPECTO</h2>
              </div>
              <div style="padding: 40px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Cliente</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 18px; color: #322F20; border-bottom: 1px solid #eee;"><strong>${name}</strong></td></tr>
                  
                  <tr><td style="padding: 20px 0 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Email</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 16px; color: #322F20; border-bottom: 1px solid #eee;">${email}</td></tr>
                  
                  <tr><td style="padding: 20px 0 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Teléfono</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 16px; color: #322F20; border-bottom: 1px solid #eee;">${phone || 'No proporcionado'}</td></tr>
                  
                  <tr><td style="padding: 20px 0 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Servicio de Interés</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 16px; color: #955031; border-bottom: 1px solid #eee;"><strong>${service}</strong></td></tr>
                  
                  <tr><td style="padding: 20px 0 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Mensaje</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 16px; color: #322F20; line-height: 1.5;">${message || 'Sin mensaje adicional.'}</td></tr>
                </table>
                <div style="margin-top: 30px; font-size: 10px; color: #ccc;">Enviado desde el formulario de contacto (Idioma: ${lang.toUpperCase()})</div>
              </div>
            </div>
          </div>
        `
      });

      // 2. Thank You Email (to Customer) - Relaxing Sanctuary Style
      const { data, error } = await resend.emails.send({
        from: 'Jeniffer Córdoba <hola@jeniffercordoba.com>',
        to: [email],
        subject: isSpanish ? 'Tu mensaje ha sido recibido // Jeniffer Córdoba' : 'Your message has been received // Jeniffer Córdoba',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ede1c9; color: #322F20; border-radius: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
               <img src="https://green-ambiance.vercel.app/images/8-Color.png" width="60" style="opacity: 0.8;">
            </div>
            <h1 style="font-style: italic; font-weight: normal; font-size: 32px; color: #955031; text-align: center;">
              ${isSpanish ? 'Gracias por conectar,' : 'Thank you for connecting,'} ${name}
            </h1>
            <div style="background-color: white; padding: 40px; border-radius: 30px; margin-top: 30px; line-height: 1.8; color: #504c33; border: 1px solid rgba(80, 76, 51, 0.1);">
              <p style="margin: 0;">
                ${isSpanish
            ? 'He recibido tus intenciones con gratitud. Me tomaré un momento de presencia para revisar tu mensaje y te responderé personalmente en breve.'
            : 'I have received your intentions with gratitude. I will take a moment of presence to review your message and will respond to you personally shortly.'}
              </p>
              <p style="margin-top: 20px; font-style: italic; opacity: 0.8;">
                ${isSpanish ? 'Mientras tanto, te invito a seguir respirando con consciencia.' : 'In the meantime, I invite you to keep breathing with awareness.'}
              </p>
            </div>
            <p style="margin-top: 40px; text-align: center; font-size: 14px; opacity: 0.7;">
              ${isSpanish ? 'Con amor y presencia,' : 'With love and presence,'}<br>
              <strong>Jeniffer Córdoba</strong><br>
              Sanación & Movimiento
            </p>
          </div>
        `
      });

      if (error) return res.status(400).json(error);
      return res.status(200).json(data);
    }

    // CASE 3: LEAD CAPTURE (MODAL)
    if (type === 'lead') {
      const isCirculo = service === 'circulo';
      const isTalleres = service === 'talleres';
      const isRetiros = service === 'retiros';

      const serviceLabel = isCirculo ? (isSpanish ? 'Círculo de Mujeres' : 'Women\'s Circle') :
                           isTalleres ? (isSpanish ? 'Taller' : 'Workshop') :
                           (isSpanish ? 'Retiro' : 'Retreat');

      // 1. Internal Notification (to Jeniffer/Ivan)
      await resend.emails.send({
        from: 'Website Portal <hola@jeniffercordoba.com>',
        to: ['jeniffercordoba@yahoo.com'],
        bcc: ['ivan+jc@voizlab.com'],
        subject: `New Lead [Experiencias]: ${name} (${serviceLabel})`,
        html: `
          <div style="font-family: sans-serif; background-color: #f7f7f7; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
              <div style="background-color: #955031; color: white; padding: 30px; text-align: center;">
                <h2 style="margin: 0; font-weight: 300; letter-spacing: 2px;">NUEVO LEAD - EXPERIENCIA</h2>
              </div>
              <div style="padding: 40px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Lead</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 18px; color: #322F20; border-bottom: 1px solid #eee;"><strong>${name}</strong></td></tr>
                  
                  <tr><td style="padding: 20px 0 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Email</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 16px; color: #322F20; border-bottom: 1px solid #eee;">${email}</td></tr>
                  
                  <tr><td style="padding: 20px 0 10px 0; color: #999; font-size: 12px; text-transform: uppercase;">Interés</td></tr>
                  <tr><td style="padding: 0 0 20px 0; font-size: 16px; color: #955031; border-bottom: 1px solid #eee;"><strong>${serviceLabel}</strong></td></tr>
                </table>
                <div style="margin-top: 30px; font-size: 10px; color: #ccc;">Enviado desde el Lead Modal (Idioma: ${lang.toUpperCase()})</div>
              </div>
            </div>
          </div>
        `
      });

      // 2. Thank You Email (to Lead)
      const { data, error } = await resend.emails.send({
        from: 'Jeniffer Córdoba <hola@jeniffercordoba.com>',
        to: [email],
        subject: isSpanish ? 'Tu interés ha sido recibido // Jeniffer Córdoba' : 'Your interest has been received // Jeniffer Córdoba',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ede1c9; color: #322F20; border-radius: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
               <img src="https://green-ambiance.vercel.app/images/8-Color.png" width="60" style="opacity: 0.8;">
            </div>
            <h1 style="font-style: italic; font-weight: normal; font-size: 32px; color: #955031; text-align: center;">
              ${isSpanish ? 'Gracias por conectar,' : 'Thank you for connecting,'} ${name}
            </h1>
            <div style="background-color: white; padding: 40px; border-radius: 30px; margin-top: 30px; line-height: 1.8; color: #504c33; border: 1px solid rgba(80, 76, 51, 0.1);">
              <p style="margin: 0;">
                ${isSpanish
            ? `Tu interés en ${serviceLabel} ha sido recibido con gratitud. Me conectaré contigo pronto para compartirte más detalles.`
            : `Your interest in ${serviceLabel} has been received with gratitude. I will connect with you soon to share more details.`}
              </p>
              <p style="margin-top: 20px; font-style: italic; opacity: 0.8;">
                ${isSpanish ? 'Mantente en sintonía con tu presencia.' : 'Stay tuned with your presence.'}
              </p>
            </div>
            <p style="margin-top: 40px; text-align: center; font-size: 14px; opacity: 0.7;">
              ${isSpanish ? 'Con amor,' : 'With love,'}<br>
              <strong>Jeniffer Córdoba</strong>
            </p>
          </div>
        `
      });

      if (error) return res.status(400).json(error);
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Invalid request type' });

  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
