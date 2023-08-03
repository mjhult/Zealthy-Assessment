import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const tickets = await db.ticket.findMany();
        return res.status(200).json({ success: true, data: tickets });
      }

      case 'POST': {
        const { email, name, title, message } = req.body;

        if (!email || !name || !title || !message)
          return res.status(400).json({
            success: false,
            errorMessage: 'Please provide an email, name, and message.',
          });

        const newTicket = await db.ticket.create({
          include: {
            messages: true,
          },
          data: {
            author: `${name} <${email}>`,
            title,
            messages: {
              create: {
                author: `${name} <${email}>`,
                message,
              },
            },
          },
        });

        console.log(
          `This is where we would send the email to the user:
            To: ${newTicket.author}
            Subject: Ticket created!
            Body: Thank you for submitting a ticket! We will get back to you shortly.`
        );

        return res.status(200).json({ success: true, data: newTicket });
      }

      default: {
        return res.status(404).json({
          success: false,
          errorMessage: 'This resource could not be found.',
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, errorMessage: `An error occured: ${error}` });
  }
}
