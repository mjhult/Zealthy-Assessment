import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        const { ticketId } = req.query;

        if (!ticketId)
          return res
            .status(400)
            .json({ success: false, errorMessage: 'No ticket id.' });

        const ticket = await db.ticket.findFirst({
          include: {
            messages: true,
          },
          where: {
            id: parseInt(ticketId as string, 10),
          },
        });

        if (ticket === null)
          return res
            .status(404)
            .json({ success: false, errorMessage: 'Ticket not found.' });

        return res.status(200).json({ success: true, data: ticket });
      }

      case 'PUT': {
        const { ticketId } = req.query;
        const { title, status, message } = req.body;

        if (!ticketId || (!status && !message))
          return res
            .status(400)
            .json({ success: false, errorMessage: 'No ticket id.' });

        // This was done so we wouldn't have to write more than one query depending on what is updated.
        const createMessage = message
          ? { create: { author: 'admin <admin@admin.io>', message } }
          : undefined;

        const ticket = await db.ticket.update({
          where: {
            id: parseInt(ticketId as string, 10),
          },
          data: {
            messages: createMessage,
            title,
            status,
          },
        });

        console.log(
          `This is where we would send the email to the user:
            To: ${ticket.author}
            Subject: An update has been made to your ticket!
            Body: ${
              status === 'resolved'
                ? 'Your ticket has been resolved!'
                : message || `Your ticket\'s status has been set to ${status}.`
            }`
        );

        return res.status(200).json({ success: true });
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
