import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resource, name, email, phone } = req.body;

  if (!name || !email || !phone || !resource) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // eBook Metadata Mapping
  const ebooks = {
    'ebook1': {
      title: 'El Campo Unificado',
      file: 'campoUnificadoEbook.pdf',
      subject: 'Tu Recurso: El Campo Unificado'
    },
    'ebook2': {
      title: 'Respiración Cuántica',
      file: 'campoUnificadoEbook.pdf', // Fallback to existing file
      subject: 'Tu Recurso: Respiración Cuántica'
    },
    'ebook3': {
      title: 'Arquitectura de la Paz',
      file: 'campoUnificadoEbook.pdf', // Fallback to existing file
      subject: 'Tu Recurso: Arquitectura de la Paz'
    },
    'ebook4': {
      title: 'Más allá del Mat',
      file: 'campoUnificadoEbook.pdf', // Fallback to existing file
      subject: 'Tu Recurso: Más allá del Mat'
    }
  };

  const selectedEbook = ebooks[resource] || ebooks['ebook1'];

  try {
    // 1. Send Email to Customer
    const { data, error } = await resend.emails.send({
      from: 'Jeniffer Córdoba <hola@voizlab.com>',
      to: [email],
      bcc: ['ivan@voizlab.com'],
      // bcc: ['jeniffercordoba@yahoo.com'],
      subject: selectedEbook.subject,
      html: `
        <div style="font-family: 'Newsreader', serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ede1c9; color: #322F20; border-radius: 40px;">
          <h1 style="font-style: italic; font-weight: normal; font-size: 32px; color: #955031; text-align: center;">Hola, ${name}</h1>
          <p style="font-size: 18px; line-height: 1.6; text-align: center; font-style: italic;">
            "La quietud no es la ausencia de movimiento, sino el equilibrio perfecto en medio de él."
          </p>
          <div style="background-color: white; padding: 30px; border-radius: 30px; margin-top: 30px; text-align: center; border: 1px solid rgba(80, 76, 51, 0.1);">
            <p style="margin-bottom: 20px;">Gracias por resonar con mi espacio. Aquí tienes el recurso que solicitaste:</p>
            <h2 style="color: #504c33; margin-bottom: 30px;">${selectedEbook.title}</h2>
            <a href="https://${req.headers.host}/${selectedEbook.file}" 
               style="background-color: #955031; color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; letter-spacing: 2px;">
               DESCARGAR EBOOK
            </a>
          </div>
          <p style="margin-top: 40px; text-align: center; font-size: 14px; opacity: 0.7;">
            Con gratitud,<br>
            <strong>Jeniffer Córdoba</strong><br>
            Sanación & Movimiento
          </p>
          <hr style="border: 0; border-top: 1px solid rgba(149, 80, 49, 0.2); margin: 40px 0;">
          <p style="font-size: 10px; text-align: center; opacity: 0.5; letter-spacing: 1px;">
            Datos de contacto registrados: ${phone}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json(error);
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
